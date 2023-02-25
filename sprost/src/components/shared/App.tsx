
import {Firestore, doc, getDoc} from "firebase/firestore";
import React, {FC, useContext, useEffect, useState} from "react";
import {App as AppType} from "../../types/App";
import {DatabaseContext} from "../../contexts/Database";
import Navigation from "./Navigation";
import View from "./View";
import {View as ViewType} from "../../types/View";
import {useParams} from "react-router-dom";

const App: FC<{
    propsApp?: AppType,
    propsView?: ViewType
}> = ({propsApp, propsView}) => {

    const [
            app,
            setApp
        ] = useState<AppType | undefined>(),
        [
            view,
            setView
        ] = useState<ViewType | undefined>(),
        database = useContext(DatabaseContext),
        params = useParams(),
        getApp = async () => {

            if (propsApp) {

                setApp(propsApp);

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
                    setApp(paramsUserApps.find((userApp: {
                        route: string | undefined;
                    }) => userApp.route === paramsAppRoute));

                }

            }

        },
        getView = () => {

            if (app) {

                if (propsView) {

                    setView(propsView);

                } else {

                    setView(app.views[0]);

                }

            }

        };

    useEffect(
        () => {

            getApp();

        },
        []
    );

    useEffect(
        () => {

            getView();

        },
        [app]
    );

    return <>
        {
            app && view
                ? <>
                    <Navigation
                        app={app}
                        setCurrentView={setView} />
                    <View
                        view={view} />
                </>
                : <>Loading...</>
        }
    </>;

};

export default App;
