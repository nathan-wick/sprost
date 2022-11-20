import { useContext, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { PersonCircle, Speedometer, WindowStack } from "react-bootstrap-icons";
import { UserContext } from "../User";
import Account from "./views/Account";
import Apps from "./views/Apps";
import Dashboard from "./views/Dashboard";

const Navigation = () => {
  const user = useContext(UserContext);
  const [currentView, setCurrentView] = useState<JSX.Element>(<Dashboard />);

  // TODO: Replace Navbar with Sidebar

  const oldNav = <>
    <Navbar
      bg={user?.theme.name === `dark` ? `black` : `white`}
      expand="lg">
      <Container>
        <Navbar.Brand
          className={user?.theme.name === `dark` ? `text-light` : `text-dark`}
          onClick={() => setCurrentView(<Dashboard />)}>
          Sprost
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav">
          <Nav
            className="me-auto">
            <Button
              variant="secondary"
              className="m-2"
              disabled={currentView === <Account />}
              onClick={() => setCurrentView(<Account />)}>
              <PersonCircle
                className="mx-2" />
              Account
            </Button>
            <Button
              variant="secondary"
              className="m-2"
              disabled={currentView === <Dashboard />}
              onClick={() => setCurrentView(<Dashboard />)}>
              <Speedometer
                className="mx-2" />
              Dashboard
            </Button>
            <Button
              variant="secondary"
              className="m-2"
              onClick={() => setCurrentView(<Apps />)}>
              <WindowStack
                className="mx-2" />
              Apps
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {currentView}
  </>;

  return oldNav;
}

export default Navigation;