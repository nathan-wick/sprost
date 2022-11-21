import { useContext, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { List, PersonCircle, Speedometer, WindowStack, X } from "react-bootstrap-icons";
import { UserContext } from "../User";
import Account from "./views/Account";
import Apps from "./views/Apps";
import Dashboard from "./views/Dashboard";

const Navigation = () => {
  const user = useContext(UserContext);
  const [ currentView, setCurrentView ] = useState<JSX.Element>(<Dashboard />);
  const [ openNavigation, setOpenNavigation ] = useState<boolean>(false);

  // TODO: Fix background color when user scrolls all the way to the bottom
  
  const newNav = <>
    <Row
      className="gx-0 sticky-top">
      <Col
        className="bg-primary rounded">
        <h1
          className="my-2 text-white">
          <Button
            variant="light"
            size="lg"
            className="mx-4"
            onClick={() => setOpenNavigation(openNavigation ? false : true)}>
            {openNavigation ? <X className="mx-2" /> : <List className="mx-2" />}
            Menu
          </Button>
          Sprost
        </h1>
      </Col>
    </Row>
    <Row
      className="gx-0 h-100">
      {
        openNavigation &&
          <Col
            lg={3}
            md={4}
            sm={12}
            className={`sticky-top rounded ${user?.theme.name === `dark` ? `bg-black` : `bg-white`}`}>
            <div className="m-2">
              <Button
                variant={user?.theme.name === `dark` ? `dark` : `light`}
                size="lg"
                className="w-100 my-2"
                style={{ textAlign: `left` }}
                onClick={() => {
                  setCurrentView(<Dashboard />);
                  setOpenNavigation(false);
                }}>
                <Speedometer
                  className="mx-2" />
                Dashboard
              </Button>
              <Button
                variant={user?.theme.name === `dark` ? `dark` : `light`}
                size="lg"
                className="w-100 my-2"
                style={{ textAlign: `left` }}
                onClick={() => {
                  setCurrentView(<Account />);
                  setOpenNavigation(false);
                }}>
                <PersonCircle
                  className="mx-2" />
                Account
              </Button>
              <Button
                variant={user?.theme.name === `dark` ? `dark` : `light`}
                size="lg"
                className="w-100 my-2"
                style={{ textAlign: `left` }}
                onClick={() => {
                  setCurrentView(<Apps />);
                  setOpenNavigation(false);
                }}>
                <WindowStack
                  className="mx-2" />
                Apps
              </Button>
            </div>
          </Col>
      }
      <Col>
        {currentView}
      </Col>
    </Row>
  </>

  return newNav;
}

export default Navigation;