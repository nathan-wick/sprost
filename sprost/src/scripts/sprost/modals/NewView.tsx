import {Button, Form, FormGroup, Modal} from "react-bootstrap";
import {Firestore, doc, setDoc} from "firebase/firestore";
import {PlusCircle, Signpost, Tag} from "react-bootstrap-icons";
import React, {FC, useContext, useState} from "react";
import {DatabaseContext} from "../../Database";
import {UserContext} from "../../User";
import {View} from "../../../types/View";

const NewView: FC<{appRoute: string}> = ({appRoute}) => {

    const database = useContext(DatabaseContext),
        user = useContext(UserContext),
        app = user?.apps.find((userApp) => userApp.route === appRoute),
        views = app?.views,
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
        ] = useState<string>("Please enter a view name"),
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
                    if (views?.find((view: { route: string; }) => view.route === newNameRoute)) {

                        manageNameError("Please enter a unique view name");

                    } else {

                        setNameInput(event.target.value);
                        setNameRoute(newNameRoute);
                        setNameError("undefined");

                    }

                } else {

                    manageNameError("Please enter only letters (a-z) and spaces");

                }

            } else {

                manageNameError("Please enter a view name");

            }

        },
        reset = () => {

            setNameInput("undefined");
            setNameRoute("undefined");
            setNameError("Please enter a view name");
            setIsLoading(false);
            setModal(false);

        },
        showModal = () => setModal(true),
        hideModal = () => reset(),
        onSubmit = async (event: { preventDefault: () => void; }) => {

            setIsLoading(true);
            event.preventDefault();
            if (user) {

                const newView: View = {
                    "components": [],
                    "isSaved": true,
                    "name": String(nameInput),
                    "route": String(nameRoute),
                    "type": "information"
                },
                    userReference = doc(
                        database as Firestore,
                        "users",
                        user.id
                    );
                user?.apps.find((userApp) => userApp.route === appRoute)?.views.push(newView);
                await setDoc(
                    userReference,
                    user,
                    {"merge": true}
                );

            }
            hideModal();

        };

    return <>
        <Button
            variant="primary"
            className="w-50 shadow"
            onClick={showModal}>
            <PlusCircle
                className="mx-2" />
            New View
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
                    New View
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup>
                        <Form.Label>
                            <Tag
                                className="mx-2" />
                            View Name
                        </Form.Label>
                        <Form.Control
                            className={user?.theme.name === "dark"
                                ? "bg-black text-light"
                                : "bg-white text-dark"}
                            type="text"
                            defaultValue={nameInput}
                            onChange={onNameChange}
                            maxLength={50} />
                        {
                            nameError === "undefined"
                                ? <p
                                    className="text-success">
                                    {nameInput} is a valid view name
                                </p>
                                : <p
                                    className="text-danger">
                                    {nameError}
                                </p>
                        }
                    </FormGroup>
                </Form>
                {
                    nameRoute &&
                    <>
                        <p
                            className="text-muted">
                            <Signpost
                                className="mx-2" />
                            sprost.com/{user?.route}/{app?.route}/<b>{nameRoute}</b>
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

export default NewView;
