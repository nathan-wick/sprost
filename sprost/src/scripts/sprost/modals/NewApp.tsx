import {Button, Form, FormGroup, Modal, NavDropdown} from "react-bootstrap";
import {Firestore, doc, setDoc} from "firebase/firestore";
import {PlusCircle, Signpost, Tag} from "react-bootstrap-icons";
import React, {useContext, useState} from "react";
import {App as AppType} from "../../../types/App";
import {DatabaseContext} from "../../Database";
import EditApp from "../views/EditApp";
import {NavigationContext} from "../Navigation";
import {UserContext} from "../../User";

const NewApp = () => {

    const database = useContext(DatabaseContext),
        user = useContext(UserContext),
        {setCurrentView} = useContext(NavigationContext),
        apps = user === "undefined"
            ? "undefined"
            : user.apps,
        [
            modal,
            setModal
        ] = useState<boolean>(false),
        [
            nameInput,
            setNameInput
        ] = useState<string>(),
        [
            nameRoute,
            setNameRoute
        ] = useState<string>(),
        [
            nameError,
            setNameError
        ] = useState<string>("Please enter an app name"),
        [
            isLoading,
            setIsLoading
        ] = useState<boolean>(false),
        manageNameError = (error: string) => {

            if (error) {

                setNameInput("undefined");
                setNameRoute("undefined");
                setNameError(error);

            }

        },
        onNameChange = (event: { target: { value: string; }; }) => {

            if (event.target.value) {

                if (event.target.value.match(/^[a-zA-Z\s]*$/gu)) {

                    const newNameRoute = event.target.value.toLowerCase().replaceAll(
                        " ",
                        "-"
                    );
                    if (apps !== "undefined" && apps.find((app) => app.route === newNameRoute)) {

                        manageNameError("Please enter a unique app name");

                    } else {

                        setNameInput(event.target.value);
                        setNameRoute(newNameRoute);
                        setNameError("undefined");

                    }

                } else {

                    manageNameError("Please enter only letters (a-z) and spaces");

                }

            } else {

                manageNameError("Please enter an app name");

            }

        },
        reset = () => {

            setNameInput("undefined");
            setNameRoute("undefined");
            setNameError("Please enter an app name");
            setIsLoading(false);
            setModal(false);

        },
        showModal = () => setModal(true),
        hideModal = () => reset(),
        onSubmit = async (event: { preventDefault: () => void; }) => {

            setIsLoading(true);
            event.preventDefault();
            if (user !== "undefined") {

                const newApp: AppType = {
                    "name": String(nameInput),
                    "route": String(nameRoute),
                    "version": {
                        "major": 0,
                        "minor": 0,
                        "patch": 0
                    },
                    "views": []
                },
                    userReference = doc(
                        database as Firestore,
                        "users",
                        user.id
                    );
                user.apps.push(newApp);
                await setDoc(
                    userReference,
                    user,
                    {"merge": true}
                );

            }
            hideModal();
            setCurrentView(<EditApp appRoute={String(nameRoute)} />);

        };

    return <>
        <NavDropdown.Item
            onClick={showModal}>
            <PlusCircle
                className="mx-2" />
            New App
        </NavDropdown.Item>

        <Modal
            show={modal}
            onHide={hideModal}
            className="text-dark">
            <Modal.Header
                className="bg-primary bg-gradient text-white">
                <Modal.Title>
                    <PlusCircle
                        className="mx-2" />
                    New App
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup>
                        <Form.Label>
                            <Tag
                                className="mx-2" />
                            App Name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={nameInput}
                            onChange={onNameChange}
                            maxLength={50} />
                        {
                            nameError === "undefined"
                                ? <p
                                    className="text-success">
                                    {nameInput} is a valid app name
                                </p>
                                : <p
                                    className="text-danger">
                                    {nameError}
                                </p>
                        }
                    </FormGroup>
                </Form>
                {
                    nameRoute && user !== "undefined" &&
                    <>
                        <p
                            className="text-muted">
                            <Signpost
                                className="mx-2" />
                            sprost.com/{user.route}/<b>{nameRoute}</b>
                        </p>
                    </>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="outline-secondary"
                    className="m-2"
                    onClick={hideModal}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    className="m-2"
                    disabled={!nameInput || nameError === "undefined" || isLoading}
                    onClick={onSubmit}>
                    {
                        isLoading
                            ? <>Loading...</>
                            : <>Create {nameInput}</>
                    }
                </Button>
            </Modal.Footer>
        </Modal>
    </>;

};

export default NewApp;
