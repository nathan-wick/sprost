import {Button, Form, FormGroup, Modal} from "react-bootstrap";
import {Firestore, doc, setDoc} from "firebase/firestore";
import {PlusCircle, Signpost, Tag} from "react-bootstrap-icons";
import React, {useContext, useState} from "react";
import App from "../editor/EditorView";
import {App as AppType} from "../../../types/App";
import {DatabaseContext} from "../../../contexts/Database";
import DefaultCover from "../../../assets/images/defaults/cover.jpeg";
import DefaultLogo from "../../../assets/images/defaults/logo.svg";
import {NavigationContext} from "../../../contexts/Navigation";
import {ToasterContext} from "../../../contexts/Toaster";
import {UserContext} from "../../../contexts/User";

const NewApp = () => {

    const database = useContext(DatabaseContext),
        user = useContext(UserContext),
        toaster = useContext(ToasterContext),
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
        ] = useState<string>("undefined"),
        [
            nameRoute,
            setNameRoute
        ] = useState<string>("undefined"),
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
                    "cover": DefaultCover,
                    "domains": [],
                    "logo": DefaultLogo,
                    "name": String(nameInput),
                    "navigation": [],
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
                if (toaster !== "undefined") {

                    toaster.createToast(
                        "success",
                        "New App",
                        `Successfully created the ${nameInput} app.`
                    );

                }

            }
            hideModal();
            setCurrentView(<App appRoute={String(nameRoute)} />);

        };

    return <>
        <Button
            variant="primary"
            className="mx-4 bg-gradient text-white shadow"
            onClick={showModal}>
            <PlusCircle
                className="mx-2" />
            New App
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
                            defaultValue={nameInput === "undefined"
                                ? ""
                                : nameInput}
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
                    nameRoute !== "undefined" && user !== "undefined" &&
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
                    variant="secondary bg-gradient text-white shadow"
                    className="m-2"
                    onClick={hideModal}>
                    Cancel
                </Button>
                <Button
                    variant="primary bg-gradient text-white shadow"
                    className="m-2"
                    disabled={nameInput === "undefined" || nameError !== "undefined" || isLoading}
                    onClick={onSubmit}>
                    {
                        isLoading
                            ? <>Loading...</>
                            : <>Create {nameInput === "undefined"
                                ? ""
                                : nameInput}</>
                    }
                </Button>
            </Modal.Footer>
        </Modal>
    </>;

};

export default NewApp;
