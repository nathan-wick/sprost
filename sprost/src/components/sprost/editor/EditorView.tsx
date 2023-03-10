import {Col, Row} from "react-bootstrap";
import {Firestore, doc, updateDoc} from "firebase/firestore";
import React, {FC, useContext, useEffect, useRef, useState} from "react";
import AppEditor from "./AppEditor";
import {App as AppType} from "../../../types/App";
import {DatabaseContext} from "../../../contexts/Database";
import {Link} from "../../../types/Link";
import Navigation from "./Navigation";
import Preview from "./Preview";
import {UserContext} from "../../../contexts/User";
import ViewEditor from "./ViewEditor";
import {View as ViewType} from "../../../types/View";

const EditorView: FC<{ appRoute: string }> = ({appRoute}) => {

    const database = useContext(DatabaseContext),
        user = useContext(UserContext),
        [
            app,
            setApp
        ] = useState<AppType>(),
        [
            view,
            setView
        ] = useState<ViewType>(),
        [
            displayPreview,
            setDisplayPreview
        ] = useState<boolean>(false),
        appearanceRef = useRef<HTMLHeadingElement | null>(null),
        viewsRef = useRef<HTMLHeadingElement | null>(null),
        navigationRef = useRef<HTMLHeadingElement | null>(null),
        settingsRef = useRef<HTMLHeadingElement | null>(null),
        componentsRef = useRef<HTMLHeadingElement | null>(null),
        previewRef = useRef<HTMLHeadingElement | null>(null),
        scrollTo = (destination: "appearance" | "views" | "navigation" | "settings" |
            "components" | "preview") => {

            setDisplayPreview(false);
            switch (destination) {

            case "appearance":
                appearanceRef.current?.scrollIntoView({
                    "behavior": "smooth",
                    "block": "start"
                });
                break;
            case "views":
                viewsRef.current?.scrollIntoView({
                    "behavior": "smooth",
                    "block": "start"
                });
                break;
            case "navigation":
                navigationRef.current?.scrollIntoView({
                    "behavior": "smooth",
                    "block": "start"
                });
                break;
            case "settings":
                settingsRef.current?.scrollIntoView({
                    "behavior": "smooth",
                    "block": "start"
                });
                break;
            case "components":
                componentsRef.current?.scrollIntoView({
                    "behavior": "smooth",
                    "block": "start"
                });
                break;
            case "preview":
            default:
                previewRef.current?.scrollIntoView({
                    "behavior": "smooth",
                    "block": "start"
                });
                break;

            }

        },
        openApp = () => {

            if (user !== "undefined" && app) {

                window.open(
                    `https://sprost.com/${user.route}/${app.route}`,
                    "_blank"
                );

            }

        },
        newNavigationLink = () => {

            const newApp: AppType = structuredClone(app),
                defaultLink: Link = app?.views[0]
                    ? {
                        "destination": app.views[0].route,
                        "name": app.views[0].name,
                        "type": "internal"
                    }
                    : {
                        "destination": "https://example.com/",
                        "name": "Example",
                        "type": "external"
                    };
            newApp.navigation.push(defaultLink);
            setApp(newApp);

        },
        saveAppChanges = async () => {

            if (user !== "undefined" && app &&
                user.apps.find((userApp) => userApp.route === appRoute) !== app) {

                const userReference = doc(
                        database as Firestore,
                        "users",
                        user.id
                    ),
                    newApps: AppType[] = structuredClone(user.apps),
                    newAppIndex = newApps.findIndex((newApp) => newApp.route === app.route);
                if (newAppIndex >= 0) {

                    newApps[newAppIndex] = app;
                    await updateDoc(
                        userReference,
                        {
                            "apps": newApps
                        }
                    );

                }

            }

        },
        saveViewChanges = () => {

            if (user !== "undefined" && view &&
                app?.views.find((userView) => userView.route === view.route) !== view) {

                const newApp: AppType = structuredClone(app),
                    newViewIndex = newApp.views.findIndex((newView) => newView.route ===
                        view.route);
                if (newViewIndex >= 0) {

                    newApp.views[newViewIndex] = view;
                    setApp(newApp);

                }

            }

        };

    useEffect(
        () => {

            if (user !== "undefined") {

                setApp(user.apps.find((userApp) => userApp.route === appRoute));

            }

        },
        [user]
    );

    useEffect(
        () => {

            saveAppChanges();

        },
        [app]
    );

    useEffect(
        () => {

            saveViewChanges();

        },
        [view]
    );

    return <>
        <Navigation
            app={app}
            view={view}
            setView={setView}
            scrollTo={scrollTo}
            displayPreview={displayPreview}
            setDisplayPreview={setDisplayPreview}
            openApp={openApp} />
        <Row
            className="gx-0 justify-content-md-center">
            <Col
                lg={8}
                md={10}
                sm={12}>
                <Preview
                    app={app}
                    view={view}
                    displayPreview={displayPreview}
                    previewRef={previewRef} />
                <ViewEditor
                    view={view}
                    setView={setView}
                    displayPreview={displayPreview}
                    settingsRef={settingsRef}
                    componentsRef={componentsRef} />
                <AppEditor
                    user={user}
                    app={app}
                    setApp={setApp}
                    displayPreview={displayPreview}
                    view={view}
                    setView={setView}
                    appearanceRef={appearanceRef}
                    viewsRef={viewsRef}
                    navigationRef={navigationRef}
                    newNavigationLink={newNavigationLink} />
            </Col>
        </Row>
    </>;

};

export default EditorView;
