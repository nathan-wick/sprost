import {BarChart, Grid, Pencil, Signpost, Tag} from "react-bootstrap-icons";
import {Button, Col, Row} from "react-bootstrap";
import React, {useContext, useRef} from "react";
import EditorView from "./editor/EditorView";
import {NavigationContext} from "./Navigation";
import NewApp from "./modals/NewApp";
import {UserContext} from "../../contexts/User";

const DashboardView = () => {

    const user = useContext(UserContext),
        {setCurrentView} = useContext(NavigationContext),
        dashboardRef = useRef<HTMLHeadingElement | null>(null),
        appsRef = useRef<HTMLHeadingElement | null>(null);

    return <Row
        className="gx-0 justify-content-md-center">
        <Col
            lg={8}
            md={10}
            sm={12}>
            <h1
                ref={dashboardRef}
                className="mt-4">
                <BarChart
                    className="mx-2" />
                Dashboard
            </h1>
            <Row
                className="gx-0 m-4">
                <Col>
                    <p>
                        Dashboard Coming Soon
                    </p>
                </Col>
            </Row>
            <h1
                ref={appsRef}
                className="mt-4">
                <Grid
                    className="mx-2" />
                Apps
            </h1>
            <Row
                className="gx-0 m-4">
                <Col>
                    <NewApp />
                </Col>
            </Row>
            <Row
                className="gx-0">
                {
                    user !== "undefined" && user.apps.map((app, index) => <Col
                        key={index}
                        lg={4}
                        md={6}
                        sm={12}>
                        <div
                            className="m-4 p-2 shadow rounded">
                            <h3
                                className="mb-4">
                                <img
                                    src={app.logo}
                                    height={40}
                                    width={40}
                                    className="mx-2 rounded"
                                    referrerPolicy="no-referrer"
                                    alt={`${app.name} logo`} />
                                {app.name}
                            </h3>
                            <small>
                                <Tag
                                    className="mx-2" />
                                Name: <b>{app.name}</b>
                            </small>
                            <br />
                            <small>
                                <Signpost
                                    className="mx-2" />
                                Route: sprost.com/{user.route}/<b>{app.route}</b>
                            </small>
                            <Row
                                className="mt-4 gx-0">
                                <Col
                                    sm={12}
                                    className="p-1">
                                    <Button
                                        className="w-100"
                                        variant="primary"
                                        onClick={() => setCurrentView(<EditorView
                                            appRoute={app.route} />)}>
                                        <Pencil
                                            className="mx-2" />
                                        Edit
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>)
                }
            </Row>
        </Col>
    </Row>;

};

export default DashboardView;
