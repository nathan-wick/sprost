
import {Firestore, doc, getDoc} from "firebase/firestore";
import React, {FC, useContext, useEffect, useState} from "react";
import {App as AppType} from "../../types/App";
import {DatabaseContext} from "../../contexts/Database";
import Navigation from "./Navigation";
import {UserContext} from "../../contexts/User";
import View from "./View";
import {View as ViewType} from "../../types/View";
import {useParams} from "react-router-dom";

const App: FC<{
    propsAppRoute?: string,
    propsViewRoute?: string
}> = ({propsAppRoute, propsViewRoute}) => {

    const [
            currentApp,
            setCurrentApp
        ] = useState<AppType | undefined>(),
        [
            currentView,
            setCurrentView
        ] = useState<ViewType | undefined>(),
        database = useContext(DatabaseContext),
        params = useParams(),
        user = useContext(UserContext),
        getCurrentApp = async () => {

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

        },
        getCurrentView = () => {

            if (currentApp) {

                if (propsViewRoute) {

                    setCurrentView(currentApp.views[
                        currentApp.views.findIndex((view) => view.route === propsViewRoute)
                    ]);

                } else {

                    setCurrentView(currentApp.views[0]);

                }

            }

        };

    useEffect(
        () => {

            getCurrentApp();

        },
        []
    );

    useEffect(
        () => {

            getCurrentView();

        },
        [currentApp]
    );

    return <>{
        currentApp && currentView
            ? <>
                <Navigation
                    app={currentApp}
                    setCurrentView={setCurrentView} />
                <View
                    view={currentView} />
            </>
            : <>Loading...</>
    }</>;

};

export default App;
