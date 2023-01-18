import {
    App as AppIcon, BoxArrowRight, Gear, PersonCircle, Window
} from "react-bootstrap-icons";
import {Container, Nav, NavDropdown, Navbar} from "react-bootstrap";
import React, {FC, useContext} from "react";
import {App as AppType} from "../../../types/App";
import SignIn from "../../sprost/modals/SignIn";
import {UserContext} from "../../../contexts/User";

const Navigation: FC<{app: AppType}> = ({app}) => {

    const user = useContext(UserContext);
    return <Navbar
        bg="white"
        variant="light"
        expand="lg"
        className="bg-gradient shadow rounded">
        <Container>
            <Navbar.Brand
                className="text-primary">
                <AppIcon
                    className="mx-2" />
                {app.name}
            </Navbar.Brand>
            <Navbar.Toggle
                aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
                id="basic-navbar-nav">
                <Nav
                    className="me-auto">
                    {
                        app.views.map((view) => <Nav.Link
                            key={`${view.route}-view-navigation-link`}>
                            <Window
                                className="mx-2" />
                            {view.name}
                        </Nav.Link>)
                    }
                </Nav>
                <Nav>
                    {user === "undefined"
                        ? <SignIn />
                        : <NavDropdown
                            title={[
                                user?.portrait
                                    ? <img
                                        key="user-portrait-image"
                                        src={user.portrait}
                                        height={20} width={20}
                                        className="mx-2 border rounded-circle"
                                        referrerPolicy="no-referrer"
                                        alt="Account Portrait" />
                                    : <PersonCircle
                                        key="user-portrait-icon"
                                        className="mx-2" />,
                                "Account"
                            ]}
                            id="basic-nav-dropdown">
                            <NavDropdown.Item>
                                <Gear
                                    className="mx-2" />
                            Settings
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <BoxArrowRight
                                    className="mx-2" />
                            Sign Out
                            </NavDropdown.Item>
                        </NavDropdown>}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>;

};

export default Navigation;
