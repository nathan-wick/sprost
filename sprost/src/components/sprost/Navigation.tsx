import React, { useContext, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { BoxArrowRight, Gear, PersonCircle, PlusCircle, Robot, Speedometer, WindowStack } from "react-bootstrap-icons";
import Settings from "./views/Settings";
import Dashboard from "./views/Dashboard";
import { UserContext } from "../User";
import { AuthenticationContext } from "../Authentication";
import { Auth, signOut } from "firebase/auth";

const Navigation = () => {
	const authentication = useContext(AuthenticationContext);
	const user = useContext(UserContext);
	const [ currentView, setCurrentView ] = useState<JSX.Element>(<Dashboard />);

	return <>
		<Navbar
			bg={user?.theme.name === "dark" ? "black" : "white"}
			variant={user?.theme.name === "dark" ? "dark" : "light"}
			expand="lg"
			className="border-bottom rounded">
			<Container>
				<Navbar.Brand>
					Sprost
				</Navbar.Brand>
				<Navbar.Toggle 
					aria-controls="basic-navbar-nav" />
				<Navbar.Collapse
					id="basic-navbar-nav">
					<Nav
						className="me-auto">
						<Nav.Link
							onClick={() => {
								setCurrentView(<Dashboard />);
							}}>
							<Speedometer
								className="mx-2" />
							Dashboard
						</Nav.Link>
						<NavDropdown
							title={[
								<WindowStack
									key={1}
									className="mx-2" />,
								"Apps",
							]}
							id="basic-nav-dropdown">
							<NavDropdown.Item>
								<Robot
									className="mx-2" />
								Example App
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item>
								<PlusCircle
									className="mx-2" />
								New App
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Nav>
						<NavDropdown
							title={[
								user?.portrait ?
									<img
										src={user.portrait}
										height={20}
										width={20}
										className="mx-2 border rounded-circle"
										referrerPolicy="no-referrer"
										alt="Account Portrait" /> :
									<PersonCircle
										key={1}
										className="mx-2" />,
								"Account",
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
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
		{currentView}
	</>; 
};

export default Navigation;