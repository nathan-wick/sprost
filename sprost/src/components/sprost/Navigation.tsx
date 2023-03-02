import {Auth, signOut} from "firebase/auth";
import {BarChart, BoxArrowRight, Gear, Grid, PersonCircle,
    RocketTakeoffFill} from "react-bootstrap-icons";
import {Container, Nav, NavDropdown, Navbar} from "react-bootstrap";
import React, {createContext, useContext, useEffect, useState} from "react";
import {AuthenticationContext} from "../../contexts/Authentication";
import Dashboard from "./DashboardView";
import Landing from "./LandingView";
import Settings from "./SettingsView";
import SignIn from "./modals/SignIn";
import {UserContext} from "../../contexts/User";

export const NavigationContext = createContext<{
        currentView: JSX.Element,
        setCurrentView: React.Dispatch<React.SetStateAction<JSX.Element>>,
    }>({
        "currentView": <Landing />,
        "setCurrentView": () => {
            // Current View Setter
        }
    }),
    NavigationContextProvider = () => {

        const authentication = useContext(AuthenticationContext),
            user = useContext(UserContext),
            [
                currentView,
                setCurrentView
            ] = useState<JSX.Element>(<Landing />),
            navigation = {currentView,
                setCurrentView};

        useEffect(
            () => {

                if (user === "undefined") {

                    setCurrentView(<Landing />);

                } else if (currentView.type.name === "Landing") {

                    setCurrentView(<Dashboard />);

                }

            },
            [user]
        );

        return <NavigationContext.Provider value={navigation}>
            {
                currentView.type.name !== "EditorView" && <Navbar
                    sticky="top"
                    expand="lg"
                    className="bg-gradient bg-white shadow rounded">
                    <Container>
                        <Navbar.Brand>
                            <RocketTakeoffFill
                                className="mx-2" />
                            Sprost
                        </Navbar.Brand>
                        <Navbar.Toggle
                            aria-controls="sprost-navbar-nav" />
                        <Navbar.Collapse
                            id="sprost-navbar-nav">
                            <Nav
                                className="me-auto">
                                {
                                    user !== "undefined" &&
                                        <>
                                            <Nav.Link
                                                onClick={() => {

                                                    setCurrentView(<Dashboard />);

                                                }}>
                                                <BarChart
                                                    className="mx-2" />
                                                Dashboard
                                            </Nav.Link>
                                            <Nav.Link
                                                onClick={() => {

                                                    setCurrentView(<Dashboard />);

                                                }}>
                                                <Grid
                                                    className="mx-2" />
                                                Apps
                                            </Nav.Link>
                                        </>
                                }
                            </Nav>
                            <Nav>
                                {
                                    user === "undefined"
                                        ? <SignIn />
                                        : <NavDropdown
                                            title={[
                                                user?.portrait
                                                    ? <img
                                                        key="user-portrait-image"
                                                        src={user.portrait}
                                                        height={20}
                                                        width={20}
                                                        className="mx-2 rounded"
                                                        referrerPolicy="no-referrer"
                                                        alt="Account Portrait" />
                                                    : <PersonCircle
                                                        key="user-portrait-icon"
                                                        className="mx-2" />,
                                                user.name
                                            ]}
                                            id="basic-nav-dropdown">
                                            <NavDropdown.Item
                                                onClick={() => {

                                                    setCurrentView(<Settings />);

                                                }}>
                                                <Gear
                                                    className="mx-2" />
                                            Settings
                                            </NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item
                                                onClick={() => {

                                                    signOut(authentication as Auth);

                                                }}>
                                                <BoxArrowRight
                                                    className="mx-2" />
                                            Sign Out
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

            }
            {currentView}
        </NavigationContext.Provider>;

    };

export default NavigationContextProvider;
