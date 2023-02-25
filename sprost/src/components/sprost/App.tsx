/* eslint-disable complexity */
import {ArrowDown, ArrowUp, BoxArrowLeft, BoxArrowUpRight, Brush, ColumnsGap, Compass, Eye,
    EyeSlash, Gear, Link45deg, Pencil, PlusCircle, Signpost, Tag, Trash, Window,
    WindowStack} from "react-bootstrap-icons";
import {Button, ButtonGroup, Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import {Firestore, doc, updateDoc} from "firebase/firestore";
import React, {FC, useContext, useEffect, useRef, useState} from "react";
import AppCover from "./inputs/app/AppCover";
import AppLogo from "./inputs/app/AppLogo";
import {App as AppType} from "./../../types/App";
import {DatabaseContext} from "../../contexts/Database";
import Header from "../shared/Header";
import {Link} from "../../types/Link";
import NavigationLinkDestination from "./inputs/navigation/NavigationLinkDestination";
import NavigationLinkName from "./inputs/navigation/NavigationLinkName";
import NavigationLinkType from "./inputs/navigation/NavigationLinkType";
import NewRelease from "./modals/NewRelease";
import NewView from "./modals/NewView";
import PageSettings from "./PageSettings";
import SharedApp from "../shared/App";
import {UserContext} from "../../contexts/User";
import ViewComponents from "./ViewComponents";
import {View as ViewType} from "../../types/View";
import deleteElement from "../../utilities/deleteElement";
import moveElement from "../../utilities/moveElement";

const App: FC<{ appRoute: string }> = ({appRoute}) => {

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
                    `http://localhost:3000/${user.route}/${app.route}`,
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
        <Header component={{
            "alignment": "left",
            "background": "image",
            "id": "header",
            "image": view
                ? view.cover
                : app?.cover ?? "",
            "message": view
                ? view.name
                : app?.name ?? "",
            "size": "large"
        }} />
        <Navbar
            sticky="top"
            expand="lg"
            className="bg-gradient bg-white shadow rounded">
            <Container>
                <Navbar.Brand>
                    {
                        app && <>
                            <img
                                src={app.logo}
                                height={20}
                                width={20}
                                className="mx-2 rounded"
                                referrerPolicy="no-referrer"
                                alt={`${app.name} logo`} />
                            {
                                view
                                    ? <>{view.name}</>
                                    : <>{app.name}</>
                            }
                        </>
                    }
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="app-navbar-nav" />
                <Navbar.Collapse
                    id="app-navbar-nav">
                    {
                        view
                            ? <>
                                <Nav
                                    className="me-auto">
                                    <Nav.Link
                                        onClick={() => setView(undefined)}>
                                        <BoxArrowLeft
                                            className="mx-2" />
                                        Save and Return to {app?.name ?? ""}
                                    </Nav.Link>
                                    <Nav.Link
                                        onClick={() => scrollTo("settings")}>
                                        <Gear
                                            className="mx-2" />
                                        Settings
                                    </Nav.Link>
                                    <Nav.Link
                                        onClick={() => scrollTo("components")}>
                                        <ColumnsGap
                                            className="mx-2" />
                                        Components
                                    </Nav.Link>
                                </Nav>
                                <Nav>
                                    <Nav.Link
                                        onClick={() => {

                                            setDisplayPreview(!displayPreview);

                                        }}>
                                        {
                                            displayPreview
                                                ? <EyeSlash
                                                    className="mx-2" />
                                                : <Eye
                                                    className="mx-2" />
                                        }
                                        Preview
                                    </Nav.Link>
                                </Nav>
                            </>
                            : <>
                                <Nav
                                    className="me-auto">
                                    <Nav.Link
                                        onClick={() => scrollTo("appearance")}>
                                        <Brush
                                            className="mx-2" />
                                        Appearance
                                    </Nav.Link>
                                    <Nav.Link
                                        onClick={() => scrollTo("views")}>
                                        <WindowStack
                                            className="mx-2" />
                                        Views
                                    </Nav.Link>
                                    <Nav.Link
                                        onClick={() => scrollTo("navigation")}>
                                        <Compass
                                            className="mx-2" />
                                        Navigation
                                    </Nav.Link>
                                </Nav>
                                <Nav>
                                    <Nav.Link
                                        onClick={() => {

                                            setDisplayPreview(!displayPreview);

                                        }}>
                                        {
                                            displayPreview
                                                ? <EyeSlash
                                                    className="mx-2" />
                                                : <Eye
                                                    className="mx-2" />
                                        }
                                        Preview
                                    </Nav.Link>
                                    {
                                        app && app.views.length
                                            ? <NewRelease app={app} />
                                            : <></>
                                    }
                                    {
                                        app &&
                                            app.version.major + app.version.minor +
                                            app.version.patch > 0
                                            ? <Nav.Link
                                                onClick={openApp}>
                                                <BoxArrowUpRight
                                                    className="mx-2" />
                                                Open
                                            </Nav.Link>
                                            : <></>
                                    }
                                </Nav>
                            </>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Row
            className="gx-0 justify-content-md-center">
            <Col
                lg={8}
                md={10}
                sm={12}>
                {
                    displayPreview && <>
                        <h1
                            ref={previewRef}
                            className="mt-4">
                            <Eye
                                className="mx-2" />
                            Preview
                        </h1>
                        <div
                            className="m-2 mb-4 rounded shadow">
                            <SharedApp
                                propsApp={app}
                                propsView={view}/>
                        </div>
                    </>
                }
                {
                    view
                        ? <>
                            <h1
                                ref={settingsRef}
                                className="mt-4">
                                <Gear
                                    className="mx-2" />
                                Settings
                            </h1>
                            <div
                                className="m-2 p-2 rounded shadow">
                                {
                                    view.type === "page" && <>
                                        <PageSettings
                                            view={view}
                                            setView={setView} />
                                    </>
                                }
                            </div>
                            <h1
                                ref={componentsRef}
                                className="mt-4">
                                <ColumnsGap
                                    className="mx-2" />
                                Components
                            </h1>
                            <ViewComponents
                                view={view}
                                setView={setView} />
                        </>
                        : <>
                            <h1
                                ref={appearanceRef}
                                className="mt-4">
                                <Brush
                                    className="mx-2" />
                                Appearance
                            </h1>
                            <Row
                                className="gx-0">
                                <Col
                                    md={6}
                                    sm={12}
                                    className="">
                                    <div
                                        className="m-4 p-2 shadow rounded">
                                        {
                                            app &&
                                                <AppLogo editApp={app} setEditApp={setApp} />
                                        }
                                    </div>
                                </Col>
                                <Col
                                    md={6}
                                    sm={12}
                                    className="">
                                    <div
                                        className="m-4 p-2 shadow rounded">
                                        {
                                            app &&
                                                <AppCover editApp={app} setEditApp={setApp} />
                                        }
                                    </div>
                                </Col>
                            </Row>
                            <h1
                                ref={viewsRef}
                                className="mt-4">
                                <WindowStack
                                    className="mx-2" />
                                Views
                            </h1>
                            <Row
                                className="gx-0 m-4">
                                <Col>
                                    <NewView appRoute={app?.route ?? ""} />
                                </Col>
                            </Row>
                            <Row
                                className="gx-0 p-3">
                                {
                                    app?.views.map((appView) => <Col
                                        key={`${app.route}-app-view-${appView.route}`}
                                        lg={4}
                                        md={6}
                                        sm={12}>
                                        <div
                                            className="m-3 p-2 shadow rounded">
                                            <h3
                                                className="mb-3">
                                                <Window
                                                    className="mx-2" />
                                                {appView.name}
                                            </h3>
                                            <small>
                                                <Tag
                                                    className="mx-2" />
                                                Name: <b>{appView.name}</b>
                                            </small>
                                            <br />
                                            <small>
                                                <Signpost
                                                    className="mx-2" />
                                                Route: sprost.com/{user === "undefined"
                                                    ? "undefined"
                                                    : user.route}/{app?.route}/<b>
                                                    {appView.route}</b>
                                            </small>
                                            <br />
                                            <small>
                                                <ColumnsGap
                                                    className="mx-2" />
                                                Type: <b>{appView.type}</b>
                                            </small>
                                            <Row
                                                className="mt-4 gx-0">
                                                <Col
                                                    sm={12}
                                                    className="p-1">
                                                    <Button
                                                        className="w-100"
                                                        variant="primary"
                                                        onClick={() => setView(appView)}>
                                                        <Pencil
                                                            className="mx-2" />
                                                        Edit
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>)
                                }
                            </Row>
                            <h1
                                ref={navigationRef}
                                className="mt-4">
                                <Compass
                                    className="mx-2" />
                                Navigation
                            </h1>
                            <Row
                                className="gx-0 m-4 shadow rounded">
                                <Col>
                                    <Button
                                        className="w-100"
                                        onClick={newNavigationLink}>
                                        <PlusCircle
                                            className="mx-2"/>
                                        New Link
                                    </Button>
                                </Col>
                            </Row>
                            <Row
                                className="gx-0">
                                <Col>
                                    <>
                                        {
                                            app?.navigation.map((currentNavigation, index) => <div
                                                key={index}
                                                className="m-4 p-2 shadow rounded">
                                                <Row
                                                    className="gx-0">
                                                    <Col>
                                                        <h3>
                                                            <Link45deg
                                                                className="mx-2" />
                                                            {currentNavigation.name}
                                                        </h3>
                                                    </Col>
                                                    <Col
                                                        className="text-end">
                                                        <ButtonGroup
                                                            className="mx-1">
                                                            {
                                                                index !== 0 &&
                                                                    <Button
                                                                        variant="outline-primary"
                                                                        onClick={() => {

                                                                            const newApp =
                                                                            structuredClone(app);
                                                                            newApp.navigation =
                                                                                moveElement(
                                                                                    newApp.
                                                                                        navigation,
                                                                                    index,
                                                                                    "up"
                                                                                );
                                                                            setApp(newApp);

                                                                        }}>
                                                                        <ArrowUp
                                                                            className="mx-2"/>
                                                                    </Button>
                                                            }
                                                            {
                                                                index !==
                                                                    (app.navigation.length ??=
                                                                        1) - 1 &&
                                                                    <Button
                                                                        variant="outline-primary"
                                                                        onClick={() => {

                                                                            const newApp =
                                                                            structuredClone(app);
                                                                            newApp.navigation =
                                                                                moveElement(
                                                                                    newApp.
                                                                                        navigation,
                                                                                    index,
                                                                                    "down"
                                                                                );
                                                                            setApp(newApp);

                                                                        }}>
                                                                        <ArrowDown
                                                                            className="mx-2"/>
                                                                    </Button>
                                                            }
                                                        </ButtonGroup>
                                                        <Button
                                                            variant="outline-danger"
                                                            className="mx-1"
                                                            onClick={() => {

                                                                const newApp = structuredClone(app);
                                                                newApp.navigation = deleteElement(
                                                                    newApp.navigation,
                                                                    index
                                                                );
                                                                setApp(newApp);

                                                            }}>
                                                            <Trash
                                                                className="mx-2"/>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <NavigationLinkType
                                                    editApp={app}
                                                    setEditApp={setApp}
                                                    index={index}/>
                                                {
                                                    currentNavigation.type === "external" &&
                                                        <NavigationLinkName
                                                            editApp={app}
                                                            setEditApp={setApp}
                                                            index={index}/>
                                                }
                                                <NavigationLinkDestination
                                                    editApp={app}
                                                    setEditApp={setApp}
                                                    index={index}/>
                                            </div>)
                                        }
                                    </>
                                </Col>
                            </Row>
                        </>
                }
            </Col>
        </Row>
    </>;

};

export default App;
