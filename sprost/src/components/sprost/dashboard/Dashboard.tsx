import {Col, Row} from "react-bootstrap";
import React, {FC} from "react";
import {BarChart} from "react-bootstrap-icons";

const Dashboard: FC<{
    dashboardRef: React.MutableRefObject<HTMLHeadingElement | null>
}> = ({dashboardRef}) => <>
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
</>;

export default Dashboard;
