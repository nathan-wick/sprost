import {Bookmarks, Envelope, Eye, Gear, Signpost} from "react-bootstrap-icons";
import {Col, Form, Row} from "react-bootstrap";
import {Firestore, deleteDoc, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import React, {useContext, useEffect, useState} from "react";
import {DatabaseContext} from "../../Database";
import {User} from "../../../types/User";
import {UserContext} from "../../User";

const Settings = () => {

    const database = useContext(DatabaseContext),
        user = useContext(UserContext),
        userReference = user === "undefined"
            ? "undefined"
            : doc(
                database as Firestore,
                "users",
                user.id
            ),
        [
            nameInput,
            setNameInput
        ] = useState<string>("undefined"),
        [
            routeInput,
            setRouteInput
        ] = useState<string>("undefined"),
        [
            nameError,
            setNameError
        ] = useState<string>("undefined"),
        [
            emailInput,
            setEmailInput
        ] = useState<string>("undefined"),
        [
            emailError,
            setEmailError
        ] = useState<string>("undefined"),
        [
            themeInput,
            setThemeInput
        ] = useState<"light" | "dark">("light"),
        findRoute = async (route: string, iteration: number) => {

            let newRoute = route;
            if (iteration > 1) {

                newRoute = route + String(iteration);

            }
            const publicUserReference = doc(
                    database as Firestore,
                    "public",
                    newRoute
                ),
                publicUserSnapshot = await getDoc(publicUserReference);
            return {
                newRoute,
                publicUserSnapshot
            };

        },
        createUserRoute = async (name: string) => {

            let route = name.toLowerCase().replaceAll(
                " ",
                "-"
            );
            if (user !== "undefined" && route !== user.route) {

                let routeIsUnique = false,
                    iteration = 1;
                while (!routeIsUnique) {

                    // eslint-disable-next-line no-await-in-loop
                    const {newRoute, publicUserSnapshot} = await findRoute(
                        route,
                        iteration
                    );
                    if (publicUserSnapshot.exists()) {

                        iteration += 1;

                    } else {

                        route = newRoute;
                        routeIsUnique = true;

                    }

                }

            }
            return route;

        },
        themeOptions = [
            {
                "text": "Light",
                "value": "light"
            },
            {
                "text": "Dark",
                "value": "dark"
            }
        ],
        onNameChange = (event: { target: { value: string; }; }) => {

            if (event.target.value) {

                if (event.target.value.match(/^[a-zA-Z\s]*$/gu)) {

                    setNameInput(event.target.value);
                    setNameError("undefined");

                } else {

                    setNameError("Please use only letters and spaces");

                }

            } else {

                setNameError("Please enter a name");

            }

        },
        saveName = async () => {

            if (user !== "undefined" && userReference !== "undefined" &&
                nameError === "undefined" && nameInput !== "undefined") {

                const newRoute = await createUserRoute(nameInput),
                    publicUserReference = doc(
                        database as Firestore,
                        "public",
                        user.route
                    ),
                    publicUserSnapshot = await getDoc(publicUserReference),
                    publicUserData: Partial<User> = {
                        "apps": publicUserSnapshot.data()?.apps ?? [],
                        "name": nameInput,
                        "portrait": publicUserSnapshot.data()?.portrait ?? "undefined"
                    },
                    newPublicUserReference = doc(
                        database as Firestore,
                        "public",
                        newRoute
                    ),
                    userInputData: Partial<User> = {
                        "name": nameInput,
                        "route": newRoute
                    };
                setRouteInput(newRoute);
                await deleteDoc(publicUserReference);
                await updateDoc(
                    userReference,
                    userInputData
                );
                await setDoc(
                    newPublicUserReference,
                    publicUserData
                );

            }

        },
        onEmailChange = (event: { target: { value: string; }; }) => {

            if (event.target.value) {

                if (event.target.value.match(/^\S+@\S+\.\S+$/u)) {

                    setEmailInput(event.target.value);
                    setEmailError("undefined");

                } else {

                    setEmailError("Please enter a valid email");

                }

            } else {

                setEmailError("Please enter an email");

            }

        },
        saveEmail = async () => {

            if (userReference !== "undefined" && emailError === "undefined") {

                const userInputData: Partial<User> = {
                    "email": emailInput
                };
                await updateDoc(
                    userReference,
                    userInputData
                );

            }

        },
        onThemeChange = (event: { target: { value: string; }; }) => {

            switch (event.target.value) {

            case "dark":
                setThemeInput("dark");
                break;
            case "light":
            default:
                setThemeInput("light");
                break;

            }

        },
        saveTheme = async () => {

            if (userReference !== "undefined") {

                const userInputData: Partial<User> = {
                    "theme": themeInput
                };
                await updateDoc(
                    userReference,
                    userInputData
                );

            }

        };

    useEffect(
        () => {

            if (user !== "undefined") {

                setNameInput(user.name ?? "undefined");
                setRouteInput(user.route);
                setEmailInput(user.email ?? "undefined");
                setThemeInput(user.theme);

            }

        },
        [user]
    );

    return <div
        className={"m-5 shadow rounded"}>
        <Row
            className="gx-0">
            <Col>
                <h1
                    className="m-3">
                    <Gear
                        className="mx-2" />
                    Settings
                </h1>
            </Col>
        </Row>
        <Row
            className="gx-0">
            <Col
                lg={3}
                md={12}
                className="text-center">
                <img
                    src={user === "undefined"
                        ? "undefined"
                        : user.portrait}
                    alt={`${user === "undefined"
                        ? "undefined"
                        : user.name}'s portrait`}
                    referrerPolicy="no-referrer"
                    className="w-50 my-3 border border-2 rounded-circle" />
            </Col>
            <Col
                lg={9}
                md={12}>
                <Form
                    className="m-3">
                    <Form.Group
                        className="m-3">
                        <Form.Label>
                            <Bookmarks
                                className="mx-2" />
                            Name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            onChange={onNameChange}
                            onBlur={saveName}
                            defaultValue={user === "undefined"
                                ? "undefined"
                                : user.name}
                            maxLength={50} />
                        {
                            nameError === "undefined"
                                ? <p
                                    className="text-muted">
                                    <Signpost
                                        className="mx-2" />
                                    sprost.com/<b>{routeInput}</b>
                                </p>
                                : <p
                                    className="text-danger">
                                    {nameError}
                                </p>
                        }
                    </Form.Group>
                    <Form.Group
                        className="m-3">
                        <Form.Label>
                            <Envelope
                                className="mx-2" />
                            Email
                        </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={onEmailChange}
                            onBlur={saveEmail}
                            defaultValue={user === "undefined"
                                ? "undefined"
                                : user.email}
                            maxLength={50} />
                        {
                            emailError !== "undefined" &&
                                <p
                                    className="text-danger">
                                    {emailError}
                                </p>
                        }
                    </Form.Group>
                    <Form.Group
                        className="m-3">
                        <Form.Label>
                            <Eye
                                className="mx-2" />
                            Theme
                        </Form.Label>
                        <Form.Select
                            onChange={onThemeChange}
                            onBlur={saveTheme}
                            value={user === "undefined"
                                ? "light"
                                : user.theme}>
                            {
                                themeOptions.map((themeOption) => <option
                                    key={themeOption.value}
                                    value={themeOption.value}>
                                    {themeOption.text}
                                </option>)
                            }
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </div>;

};

export default Settings;
