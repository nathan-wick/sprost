import {Button, Col, Form, FormGroup, Modal, Row} from "react-bootstrap";
import {CheckCircle, Clock, PlusCircle, Signpost, Tag} from "react-bootstrap-icons";
import React, {FC, useContext, useState} from "react";
import {App} from "../../../types/App";
import {UserContext} from "../../../contexts/User";

const NewAppDomain: FC<{app: App}> = ({app}) => {

    const user = useContext(UserContext),
        [
            modal,
            setModal
        ] = useState<boolean>(false),
        showModal = () => setModal(true),
        hideModal = () => setModal(false);

    return <div
        className="m-4 p-2 shadow rounded">
        <p>
            <Signpost
                className="mx-2"/>
            Domains
        </p>
        <Row
            className="gx-0 my-2 p-2 shadow rounded">
            <Col>
                <small>
                    sprost.com/{user !== "undefined" && user.route}/{app.route}
                </small>
            </Col>
            <Col
                className="text-end">
                {
                    app.version.major > 0 || app.version.minor > 0 || app.version.patch > 0
                        ? <small
                            className="p-1 bg-success bg-gradient text-white rounded">
                            <CheckCircle
                                className="mx-1" />
                            Connected
                        </small>
                        : <small
                            className="p-1 bg-danger bg-gradient text-white rounded">
                            <Clock
                                className="mx-1" />
                            Awaiting Release
                        </small>
                }
            </Col>
        </Row>
        <Button
            variant="primary"
            className="w-100 bg-gradient text-white shadow"
            onClick={showModal}>
            <PlusCircle
                className="mx-2" />
            New Domain
        </Button>

        <Modal
            show={modal}
            onHide={hideModal}
            className="text-dark">
            <Modal.Header
                className="bg-primary bg-gradient text-white">
                <Modal.Title>
                    <PlusCircle
                        className="mx-2" />
                    New Domain
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup>
                        <Form.Label>
                            <Tag
                                className="mx-2" />
                            Domain Name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="example.com"
                            maxLength={50} />
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary bg-gradient text-white shadow"
                    className="m-2"
                    onClick={hideModal}>
                    Cancel
                </Button>
                <Button
                    variant="primary bg-gradient text-white shadow"
                    className="m-2">
                    Connect
                </Button>
            </Modal.Footer>
        </Modal>
    </div>;

};

export default NewAppDomain;
