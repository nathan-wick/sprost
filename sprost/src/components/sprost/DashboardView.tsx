import {BarChart, Grid} from "react-bootstrap-icons";
import {Col, Row} from "react-bootstrap";
import React, {useRef} from "react";

const DashboardView = () => {

    const dashboardRef = useRef<HTMLHeadingElement | null>(null),
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
            <h1
                ref={appsRef}
                className="mt-4">
                <Grid
                    className="mx-2" />
                Apps
            </h1>
        </Col>
    </Row>;

};

export default DashboardView;
