import {BoxArrowLeft, BoxArrowUpRight, Brush, ColumnsGap, Compass, Eye, EyeSlash, Gear,
    WindowStack} from "react-bootstrap-icons";
import {Container, Nav, Navbar} from "react-bootstrap";
import React, {FC, useContext} from "react";
import {App} from "../../../types/App";
import Dashboard from "../dashboard/DashboardView";
import {NavigationContext} from "../../../contexts/Navigation";
import NewRelease from "../modals/NewRelease";
import {View} from "../../../types/View";

const Navigation: FC<{
    app: App | undefined,
    view: View | undefined,
    setView: React.Dispatch<React.SetStateAction<View | undefined>>,
    scrollTo: (destination: "appearance" | "views" | "navigation" | "settings" | "components" |
        "preview") => void,
    displayPreview: boolean,
    setDisplayPreview: React.Dispatch<React.SetStateAction<boolean>>,
    openApp: () => void
}> = ({app, view, setView, scrollTo, displayPreview, setDisplayPreview, openApp}) => {

    const {setCurrentView} = useContext(NavigationContext);

    return <Navbar
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
                                    Save and Exit
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
                                {
                                    view.components.length > 0 && <Nav.Link
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
                                }
                            </Nav>
                        </>
                        : <>
                            <Nav
                                className="me-auto">
                                <Nav.Link
                                    onClick={() => setCurrentView(<Dashboard />)}>
                                    <BoxArrowLeft
                                        className="mx-2" />
                                    Save and Exit
                                </Nav.Link>
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
                                {
                                    app && app.views.length > 0 && <Nav.Link
                                        onClick={() => scrollTo("navigation")}>
                                        <Compass
                                            className="mx-2" />
                                        Navigation
                                    </Nav.Link>
                                }
                            </Nav>
                            <Nav>
                                {
                                    app && app.views.length > 0 && <Nav.Link
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
                                }
                                {
                                    app && app.views.length > 0 && <NewRelease app={app} />
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
    </Navbar>;

};

export default Navigation;
