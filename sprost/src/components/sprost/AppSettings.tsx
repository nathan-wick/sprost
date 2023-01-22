import {Col, Row} from "react-bootstrap";
import React, {FC} from "react";
import {App} from "../../types/App";
import Cover from "./inputs/app/Cover";
import Description from "./inputs/app/Description";
import Logo from "./inputs/app/Logo";

const AppSettings: FC<{ app: App }> = ({app}) => <Row
    className="gx-0 justify-content-md-center">
    <Col
        lg={8}
        md={10}
        sm={12}>
        <div
            className="m-2 p-2 shadow rounded">
            <Row
                className="gx-0">
                <Col
                    className="p-2">
                    <Description app={app} />
                </Col>
            </Row>
            <Row
                className="gx-0">
                <Col
                    md={6}
                    sm={12}
                    className="p-2">
                    <Logo app={app} />
                </Col>
                <Col
                    md={6}
                    sm={12}
                    className="p-2">
                    <Cover app={app} />
                </Col>
            </Row>
        </div>
    </Col>
</Row>;

export default AppSettings;
