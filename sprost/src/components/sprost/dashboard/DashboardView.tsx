import {Col, Row} from "react-bootstrap";
import React, {useRef} from "react";
import Apps from "./Apps";
import Dashboard from "./Dashboard";
import Navigation from "./Navigation";
import Settings from "./Settings";

const DashboardView = () => {

    const dashboardRef = useRef<HTMLHeadingElement | null>(null),
        appsRef = useRef<HTMLHeadingElement | null>(null),
        settingsRef = useRef<HTMLHeadingElement | null>(null);

    return <>
        <Navigation
            dashboardRef={dashboardRef}
            appsRef={appsRef}
            settingsRef={settingsRef} />
        <Row
            className="gx-0 justify-content-md-center">
            <Col
                lg={6}
                md={10}
                sm={12}>
                <Dashboard
                    dashboardRef={dashboardRef} />
            </Col>
            <Col
                lg={6}
                md={10}
                sm={12}>
                <Apps
                    appsRef={appsRef} />
                <Settings
                    settingsRef={settingsRef} />
            </Col>
        </Row>
    </>;

};

export default DashboardView;
