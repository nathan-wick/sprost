import {Auth, signOut} from "firebase/auth";
import {
    BoxArrowRight, BoxArrowUpRight, PersonCircle
} from "react-bootstrap-icons";
import {Container, Nav, NavDropdown, Navbar} from "react-bootstrap";
import React, {FC, useContext} from "react";
import {App} from "../../types/App";
import {AuthenticationContext} from "../../contexts/Authentication";
import SignIn from "../sprost/modals/SignIn";
import {UserContext} from "../../contexts/User";
import {View} from "../../types/View";

const Navigation: FC<{
    app: App,
    setCurrentView: React.Dispatch<React.SetStateAction<View | undefined>>,
}> = ({app, setCurrentView}) => {

    const authentication = useContext(AuthenticationContext),
        user = useContext(UserContext);

    return <Navbar
        sticky="top"
        expand="lg"
        className="bg-gradient bg-white shadow rounded">
        <Container>
            <Navbar.Brand>
                <img
                    src={app.logo}
                    height={20}
                    width={20}
                    className="mx-2 rounded"
                    referrerPolicy="no-referrer"
                    alt={`${app.name} logo`} />
                {app.name}
            </Navbar.Brand>
            <Navbar.Toggle
                aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
                id="basic-navbar-nav">
                <Nav
                    className="me-auto">
                    {
                        app.navigation.map((link, index) => <Nav.Link
                            key={index}
                            onClick={() => {

                                if (link.type === "internal") {

                                    setCurrentView(app.views.find((view) => view.route ===
                                            link.destination));

                                } else {

                                    window.open(link.destination);

                                }

                            }}>
                            {
                                link.type === "internal"
                                    ? <img
                                        src={app.views.find((view) => view.route ===
                                            link.destination)?.icon}
                                        height={20}
                                        width={20}
                                        className="mx-2 rounded"
                                        referrerPolicy="no-referrer"
                                        alt={`${link.name} icon`} />
                                    : <BoxArrowUpRight
                                        className="mx-2"/>
                            }
                            {link.name}
                        </Nav.Link>)
                    }
                </Nav>
                <Nav>
                    {
                        user === "undefined"
                            ? <SignIn
                                variant="Sign In"/>
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
    </Navbar>;

};

export default Navigation;
