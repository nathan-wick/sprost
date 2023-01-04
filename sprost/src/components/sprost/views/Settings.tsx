import {Col, Form, Row} from "react-bootstrap";
import Email from "../inputs/Email";
import {Gear} from "react-bootstrap-icons";
import Name from "../inputs/Name";
import Portrait from "../inputs/Portrait";
import React from "react";
import Theme from "../inputs/Theme";

const Settings = () => <>
    <h1
        className="mx-5 mt-5">
        <Gear
            className="mx-2" />
            Settings
    </h1>
    <Form
        className="m-5 shadow rounded">
        <Row
            className="gx-0">
            <Col
                lg={6}
                md={12}
                className="text-center">
                <Portrait />
            </Col>
            <Col
                lg={6}
                md={12}>
                <Name />
                <Email />
                <Theme />
            </Col>
        </Row>
    </Form>
</>;

export default Settings;
