import {App as AppIcon, BoxArrowUpRight, WindowStack} from "react-bootstrap-icons";
import {Container, Nav, Navbar} from "react-bootstrap";
import React, {FC, useContext, useState} from "react";
import AppSettings from "./AppSettings";
import AppViews from "./AppViews";
import Header from "../shared/Header";
import NewRelease from "./modals/NewRelease";
import {UserContext} from "../../contexts/User";

const App: FC<{ appRoute: string }> = ({appRoute}) => {

    const user = useContext(UserContext),
        app = user === "undefined"
            ? "undefined"
            : user.apps.find((userApp) => userApp.route === appRoute) ?? "undefined",
        [
            currentView,
            setCurrentView
        ] = useState<JSX.Element>(app === "undefined"
            ? <></>
            : <AppSettings app={app} />),
        openApp = () => {

            if (user !== "undefined" && app !== "undefined") {

                window.open(
                    `http://localhost:3000/${user.route}/${app.route}`,
                    "_blank"
                );

            }

        };

    return <>
        <Header component={{
            "alignment": "left",
            "background": "image",
            "id": "header",
            "image": app === "undefined"
                ? app
                : app.cover,
            "message": app === "undefined"
                ? app
                : app.name,
            "size": "medium"
        }} />
        <Navbar
            expand="lg">
            <Container>
                <Navbar.Brand>
                    {
                        app !== "undefined" &&
                            <img
                                src={app.logo}
                                height={20}
                                width={20}
                                className="mx-2 rounded"
                                referrerPolicy="no-referrer"
                                alt={`${app.name} logo`} />
                    }
                    {
                        app === "undefined"
                            ? app
                            : app.name
                    }
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="app-navbar-nav" />
                <Navbar.Collapse
                    id="app-navbar-nav">
                    <Nav
                        className="me-auto">
                        <Nav.Link
                            onClick={() => setCurrentView(app === "undefined"
                                ? <></>
                                : <AppSettings app={app} />)}>
                            <AppIcon
                                className="mx-2" />
                            App
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => setCurrentView(app === "undefined"
                                ? <></>
                                : <AppViews app={app} />)}>
                            <WindowStack
                                className="mx-2" />
                            Views
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        {
                            app !== "undefined" &&
                                app.version.major + app.version.minor + app.version.patch > 0
                                ? <Nav.Link
                                    onClick={openApp}>
                                    <BoxArrowUpRight
                                        className="mx-2" />
                                    Open
                                </Nav.Link>
                                : <></>
                        }
                        {
                            app !== "undefined" && app.views.length
                                ? <NewRelease app={app} />
                                : <></>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        {currentView}
    </>;

};

export default App;
