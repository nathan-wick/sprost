import {Col, Form, Row} from "react-bootstrap";
import Email from "./inputs/settings/Email";
import {Gear} from "react-bootstrap-icons";
import Name from "./inputs/settings/Name";
import Portrait from "./inputs/settings/Portrait";
import React from "react";
import Theme from "./inputs/settings/Theme";

const Settings = () => <>
    <h1
        className="mx-5 mt-5">
        <Gear
            className="mx-2" />
            Settings
    </h1>
    <Row
        className="gx-0 justify-content-md-center">
        <Col
            lg={6}
            md={9}
            sm={12}>
            <Form
                className="m-5 p-3 shadow rounded">
                <Portrait />
                <Name />
                <Email />
                <Theme />
            </Form>
        </Col>
    </Row>
</>;

export default Settings;
