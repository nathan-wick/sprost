import {Col, Row} from "react-bootstrap";
import React, {FC} from "react";
import {App} from "../../types/App";
import AppCover from "./inputs/app/AppCover";
import AppLogo from "./inputs/app/AppLogo";

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
                    md={6}
                    sm={12}
                    className="p-2">
                    <AppLogo app={app} />
                </Col>
                <Col
                    md={6}
                    sm={12}
                    className="p-2">
                    <AppCover app={app} />
                </Col>
            </Row>
        </div>
    </Col>
</Row>;

export default AppSettings;
