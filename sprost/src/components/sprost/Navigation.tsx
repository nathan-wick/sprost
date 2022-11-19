import { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { PersonCircle, Speedometer, WindowStack } from "react-bootstrap-icons";
import Account from "./views/Account";
import Apps from "./views/Apps";
import Dashboard from "./views/Dashboard";

const Navigation = () => {
  const [currentView, setCurrentView] = useState<JSX.Element>(<Dashboard />);

  return <>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => setCurrentView(<Dashboard />)}>
          Sprost
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Button
              variant="primary"
              className="m-2"
              onClick={() => setCurrentView(<Account />)}>
              <PersonCircle
                className="mx-2" />
              Account
            </Button>
            <Button
              variant="primary"
              className="m-2"
              onClick={() => setCurrentView(<Dashboard />)}>
              <Speedometer
                className="mx-2" />
              Dashboard
            </Button>
            <Button
              variant="primary"
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
}

export default Navigation;