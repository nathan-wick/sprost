import React, { createContext, useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { BarChart, BoxArrowRight, Gear, PersonCircle, RocketTakeoffFill, WindowStack } from "react-bootstrap-icons";
import Settings from "./views/Settings";
import Dashboard from "./views/Dashboard";
import { UserContext } from "../User";
import { AuthenticationContext } from "../Authentication";
import { Auth, signOut } from "firebase/auth";
import NewApp from "./modals/NewApp";
import Landing from "./views/Landing";
import SignIn from "./modals/SignIn";
import App from "./views/App";

export const NavigationContext = createContext<{
	currentView: JSX.Element,
	setCurrentView: React.Dispatch<React.SetStateAction<JSX.Element>>,
}>({
	currentView: <Landing />,
	setCurrentView: () => {
		// Current View Setter
	},
});

const NavigationContextProvider = () => {
	const authentication = useContext(AuthenticationContext);
	const user = useContext(UserContext);
	const apps = user?.apps;
	const [ currentView, setCurrentView ] = useState<JSX.Element>(<Landing />);
	const navigation = { currentView, setCurrentView };

	useEffect(() => {
		if (user) {
			if (currentView.type.name === "Landing") {
				setCurrentView(<Dashboard />);
			}
		} else {
			setCurrentView(<Landing />);
		}

		document.body.style.backgroundColor = `var(--bs-${user?.theme.name})`;
		document.body.style.color = `var(--bs-${user?.theme.name === "dark" ? "light" : "dark"})`;
	}, [ user ]);

	return <>
		<Navbar
			bg={user?.theme.name === "dark" ? "black" : "white"}
			variant={user?.theme.name === "dark" ? "dark" : "light"}
			sticky="top"
			expand="lg"
			className="bg-gradient shadow rounded">
			<Container>
				<Navbar.Brand
					className="text-primary">
					<RocketTakeoffFill
						className="mx-2" />
					Sprost
				</Navbar.Brand>
				<Navbar.Toggle 
					aria-controls="basic-navbar-nav" />
				<Navbar.Collapse
					id="basic-navbar-nav">
					<Nav
						className="me-auto">
						{
							user &&
								<>
									<Nav.Link
										onClick={() => {
											setCurrentView(<Dashboard />);
										}}>
										<BarChart
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
										{
											apps?.map(app =>
												<NavDropdown.Item
													key={app.route}
													onClick={() => {
														setCurrentView(<App appRoute={app.route} />);
													}}>
													{app.name}
												</NavDropdown.Item>)
										}
										<NavigationContext.Provider value={navigation}>
											<NewApp />
										</NavigationContext.Provider>
									</NavDropdown>
								</>
						}
					</Nav>
					<Nav>
						{
							user ?
								<NavDropdown
									title={[
										user?.portrait ?
											<img
												key={1}
												src={user.portrait}
												height={20}
												width={20}
												className="mx-2 border rounded-circle"
												referrerPolicy="no-referrer"
												alt="Account Portrait" /> :
											<PersonCircle
												key={2}
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
								</NavDropdown> :
								<SignIn />
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
		<NavigationContext.Provider value={navigation}>
			{currentView}
		</NavigationContext.Provider>
	</>; 
};

export default NavigationContextProvider;