import {Auth, signOut} from "firebase/auth";
import {BarChart, BoxArrowRight, Gear, Grid} from "react-bootstrap-icons";
import {Container, Nav, NavDropdown, Navbar} from "react-bootstrap";
import React, {FC, useContext} from "react";
import {AuthenticationContext} from "../../../contexts/Authentication";
import {UserContext} from "../../../contexts/User";

const Navigation: FC<{
    dashboardRef: React.MutableRefObject<HTMLHeadingElement | null>,
    appsRef: React.MutableRefObject<HTMLHeadingElement | null>,
    settingsRef: React.MutableRefObject<HTMLHeadingElement | null>
}> = ({dashboardRef, appsRef, settingsRef}) => {

    const authentication = useContext(AuthenticationContext),
        user = useContext(UserContext);

    return <Navbar
        sticky="top"
        expand="lg"
        className="bg-gradient bg-white shadow rounded">
        <Container>
            <Navbar.Brand>
                Sprost
            </Navbar.Brand>
            <Navbar.Toggle
                aria-controls="sprost-navbar-nav" />
            <Navbar.Collapse
                id="sprost-navbar-nav">
                <Nav
                    className="me-auto">
                    <Nav.Link
                        onClick={() => dashboardRef.current?.scrollIntoView({
                            "behavior": "smooth",
                            "block": "start"
                        })}>
                        <BarChart
                            className="mx-2" />
                        Dashboard
                    </Nav.Link>
                    <Nav.Link
                        onClick={() => appsRef.current?.scrollIntoView({
                            "behavior": "smooth",
                            "block": "start"
                        })}>
                        <Grid
                            className="mx-2" />
                        Apps
                    </Nav.Link>
                    <Nav.Link
                        onClick={() => settingsRef.current?.scrollIntoView({
                            "behavior": "smooth",
                            "block": "start"
                        })}>
                        <Gear
                            className="mx-2" />
                        Settings
                    </Nav.Link>
                </Nav>
                {
                    user !== "undefined" && <Nav>
                        <NavDropdown
                            title={[
                                <img
                                    key="user-portrait-image"
                                    src={user.portrait}
                                    height={20}
                                    width={20}
                                    className="mx-2 rounded"
                                    referrerPolicy="no-referrer"
                                    alt="Account Portrait" />,
                                user.name
                            ]}
                            id="basic-nav-dropdown">
                            <NavDropdown.Item
                                onClick={() => {

                                    signOut(authentication as Auth);

                                }}>
                                <BoxArrowRight
                                    className="mx-2" />
                                Sign Out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                }
            </Navbar.Collapse>
        </Container>
    </Navbar>;

};

export default Navigation;
