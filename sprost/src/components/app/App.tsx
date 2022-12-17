import React, { FC, useContext, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { App as AppIcon, BoxArrowRight, Gear, PersonCircle, Window } from "react-bootstrap-icons";
import { App as AppType } from "../../types/App";
import SignIn from "../sprost/modals/SignIn";
import { UserContext } from "../User";

const App: FC<{ app: AppType, viewRoute: string }> = ({ app, viewRoute }) => {
	// TODO Break this component down

	const user = useContext(UserContext);
	const [ currentViewRoute, setCurrentViewRoute ] = useState<string>(viewRoute);
	const currentView = app.views.find(view => view.route === currentViewRoute);
	
	return <>
		<Navbar
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
							app.views.map(view => <Nav.Link
								key={view.route}
								onClick={() => setCurrentViewRoute(view.route)}>
								<Window
									className="mx-2" />
								{view.name}
							</Nav.Link>)
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
								</NavDropdown> :
								<SignIn />
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
		<p>
			{currentView?.name}
		</p>
	</>;
};

export default App;