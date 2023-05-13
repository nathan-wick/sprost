import {Button, Col, Form, FormGroup, Modal, Row} from "react-bootstrap";
import {CheckCircle, Clock, PlusCircle, Signpost, Tag} from "react-bootstrap-icons";
import React, {FC, useContext, useState} from "react";
import {getFunctions, httpsCallable} from "firebase/functions";
import {App} from "../../../types/App";
import {UserContext} from "../../../contexts/User";

const NewAppDomain: FC<{app: App}> = ({app}) => {

    const user = useContext(UserContext),
        functions = getFunctions(),
        logMessage = httpsCallable(
            functions,
            "logMessage"
        ),
        [
            modal,
            setModal
        ] = useState<boolean>(false),
        [
            nameInput,
            setNameInput
        ] = useState<string>(),
        [
            nameError,
            setNameError
        ] = useState<string | undefined>("Please enter a domain name"),
        [
            isLoading,
            setIsLoading
        ] = useState<boolean>(false),
        manageNameError = (error: string) => {

            if (error) {

                setNameInput(undefined);
                setNameError(error);

            }

        },
        onNameChange = (event: { target: { value: string; }; }) => {

            if (event.target.value) {

                const newName = event.target.value.toLowerCase();

                // eslint-disable-next-line max-len
                if (newName.match(/^(?!-)[A-Za-z0-9-]+(?<domain>[-.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/gu)) {

                    if (app.domains && app.domains.find((domain) => domain === newName)) {

                        manageNameError(`${newName} is already connected to ${app.name}`);

                    } else {

                        setNameInput(newName);
                        setNameError(undefined);

                    }

                } else {

                    manageNameError("Please enter a valid domain name");

                }

            } else {

                manageNameError("Please enter a domain name");

            }

        },
        reset = () => {

            setNameInput(undefined);
            setNameError("Please enter an app name");
            setIsLoading(false);
            setModal(false);

        },
        showModal = () => setModal(true),
        hideModal = () => reset(),
        onSubmit = () => {

            setIsLoading(true);
            logMessage({"message": nameInput}).
                then(() => {

                    console.log(nameInput);
                    hideModal();

                }).
                catch((error) => {

                    console.log(error);

                });

        };

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
                            maxLength={50}
                            onChange={onNameChange} />
                    </FormGroup>
                    {
                        nameError
                            ? <p
                                className="text-danger">
                                {nameError}
                            </p>
                            : <p
                                className="text-success">
                                {nameInput} is a valid domain name
                            </p>
                    }
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
                    className="m-2"
                    disabled={!nameInput || Boolean(nameError) || isLoading}
                    onClick={onSubmit}>
                    Connect {nameInput}
                </Button>
            </Modal.Footer>
        </Modal>
    </div>;

};

export default NewAppDomain;
