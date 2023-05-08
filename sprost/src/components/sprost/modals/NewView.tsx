import {Button, Form, FormGroup, Modal} from "react-bootstrap";
import {ColumnsGap, PlusCircle, Signpost, Tag} from "react-bootstrap-icons";
import {Firestore, doc, setDoc} from "firebase/firestore";
import React, {FC, useContext, useState} from "react";
import {DatabaseContext} from "../../../contexts/Database";
import DefaultCover from "../../../assets/images/defaults/cover.jpeg";
import DefaultLogo from "../../../assets/images/defaults/logo.svg";
import {ToasterContext} from "../../../contexts/Toaster";
import {UserContext} from "../../../contexts/User";
import {View} from "../../../types/View";

const NewView: FC<{appRoute: string}> = ({appRoute}) => {

    const database = useContext(DatabaseContext),
        user = useContext(UserContext),
        toaster = useContext(ToasterContext),
        app = user === "undefined"
            ? "undefined"
            : user.apps.find((userApp) => userApp.route === appRoute) ?? "undefined",
        views = app === "undefined"
            ? "undefined"
            : app.views,
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
        ] = useState<string>("Please enter a view name"),
        [
            typeInput,
            setTypeInput
        ] = useState<string>("page"),
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
                    if (views !== "undefined" &&
                        views.find((view: { route: string; }) => view.route === newNameRoute)) {

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
        onTypeChange = (event: { target: { value: string; }; }) => {

            setTypeInput(event.target.value);

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
            if (user !== "undefined" && app !== "undefined") {

                let viewType: "page" | "article" = "page";
                switch (typeInput) {

                case "article":
                    viewType = "article";
                    break;
                case "page":
                default:
                    viewType = "page";
                    break;

                }
                const newView: View = {
                    "components": [],
                    "cover": DefaultCover,
                    "description": `${app.name}'s new view, ${String(nameInput)}.`,
                    "icon": DefaultLogo,
                    "name": String(nameInput),
                    "route": String(nameRoute),
                    "type": viewType
                },
                    userReference = doc(
                        database as Firestore,
                        "users",
                        user.id
                    );
                user.apps.find((userApp) => userApp.route === appRoute)?.views.push(newView);
                await setDoc(
                    userReference,
                    user,
                    {"merge": true}
                );
                if (toaster !== "undefined") {

                    toaster.createToast(
                        "success",
                        "New View",
                        `Successfully created the ${nameInput} view.`
                    );

                }

            }
            hideModal();

        },
        typeOptions = [
            {
                "text": "Page",
                "value": "page"
            },
            {
                "text": "Article",
                "value": "article"
            }
        ];

    return <>
        <Button
            variant="primary"
            className="mx-4 bg-gradient text-white shadow"
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
                                    {nameInput} is a valid view name
                                </p>
                                : <p
                                    className="text-danger">
                                    {nameError}
                                </p>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>
                            <ColumnsGap
                                className="mx-2" />
                            View Type
                        </Form.Label>
                        <Form.Select
                            onChange={onTypeChange}
                            value={typeInput}>
                            {
                                typeOptions.map((typeOption) => <option
                                    key={`component-type-option-${typeOption.value}`}
                                    value={typeOption.value}>
                                    {typeOption.text}
                                </option>)
                            }
                        </Form.Select>
                    </FormGroup>
                </Form>
                {
                    nameRoute !== "undefined" && user !== "undefined" && app !== "undefined" &&
                    <>
                        <p
                            className="text-muted mt-4">
                            <Signpost
                                className="mx-2" />
                            sprost.com/{user.route}/{app.route}/<b>{nameRoute}</b>
                        </p>
                    </>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    className="m-2 bg-gradient text-white shadow"
                    onClick={hideModal}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    className="m-2 bg-gradient text-white shadow"
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

export default NewView;
