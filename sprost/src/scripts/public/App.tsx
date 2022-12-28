
import {Firestore, doc, getDoc} from "firebase/firestore";
import React, {FC, useContext, useEffect, useState} from "react";
import {App as AppType} from "../../types/App";
import {DatabaseContext} from "../Database";
import Navigation from "./components/Navigation";
import {UserContext} from "../User";
import View from "./View";
import {useParams} from "react-router-dom";

const App: FC<{
    propsAppRoute?: string,
    propsViewRoute?: string
}> = ({propsAppRoute, propsViewRoute}) => {

    const [
            currentApp,
            setCurrentApp
        ] = useState<AppType | undefined>(),
        currentView = propsViewRoute
            ? currentApp?.views[
                currentApp.views.findIndex((view) => view.route === propsViewRoute)
            ]
            : currentApp?.views[0],
        database = useContext(DatabaseContext),
        params = useParams(),
        user = useContext(UserContext);

    useEffect(
        () => {

            const getCurrentApp = async () => {

                if (propsAppRoute && user !== "undefined") {

                    setCurrentApp(user.apps.find((userApp) => userApp.route === propsAppRoute));

                } else {

                    const paramsAppRoute = params.appRoute,
                        paramsUserRoute = params.userRoute;

                    if (paramsUserRoute && paramsAppRoute) {

                        const appOwnerReference = doc(
                                    database as Firestore,
                                    "public",
                                    paramsUserRoute
                            ),
                            appOwnerSnapshot = await getDoc(appOwnerReference),
                            paramsUserApps = appOwnerSnapshot.data()?.apps;
                        setCurrentApp(paramsUserApps.find((userApp: {
                            route: string | undefined;
                        }) => userApp.route === paramsAppRoute));

                    }

                }

            };
            getCurrentApp();

        },
        []
    );

    return <>{
        currentApp && currentView
            ? <>
                <Navigation
                    app={currentApp} />
                <View
                    view={currentView} />
            </>
            : <>Loading...</>
    }</>;

};

export default App;
