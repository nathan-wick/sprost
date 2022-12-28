import {Bookmarks, Envelope, Eye, Gear, Signpost} from "react-bootstrap-icons";
import {Col, Form, Row} from "react-bootstrap";
import {Firestore, deleteDoc, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import React, {useContext, useEffect, useState} from "react";
import {Color} from "../../../types/Color";
import {DatabaseContext} from "../../Database";
import {User} from "../../../types/User";
import {UserContext} from "../../User";

const Settings = () => {

    const database = useContext(DatabaseContext),
        user = useContext(UserContext),
        userReference = user
            ? doc(
                database as Firestore,
                "users",
                user.id
            )
            : "undefined",
        [
            nameInput,
            setNameInput
        ] = useState<string>(),
        [
            routeInput,
            setRouteInput
        ] = useState<string>(),
        [
            nameError,
            setNameError
        ] = useState<string>(),
        [
            emailInput,
            setEmailInput
        ] = useState<string>(),
        [
            emailError,
            setEmailError
        ] = useState<string>(),
        [
            themeInput,
            setThemeInput
        ] = useState<Color>(),
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
            if (route !== user?.route) {

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

            if (user && userReference !== "undefined" && !nameError && nameInput) {

                const newRoute = await createUserRoute(nameInput),
                    publicUserReference = doc(
                        database as Firestore,
                        "public",
                        user.route
                    ),
                    publicUserSnapshot = await getDoc(publicUserReference),
                    publicUserData: Partial<User> = {
                        "name": nameInput,
                        "portrait": publicUserSnapshot.data()?.portrait
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

            if (userReference !== "undefined" && !emailError) {

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

            setThemeInput({"name": event.target.value});

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

            setNameInput(user?.name);
            setRouteInput(user?.route);
            setEmailInput(user?.email);
            setThemeInput(user?.theme);

        },
        [user]
    );

    return <div
        className={`m-5 shadow rounded bg-${user?.theme.name === "dark"
            ? "black"
            : "white"}`}>
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
                    src={user?.portrait}
                    alt={`${user?.name}'s portrait`}
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
                            className={user?.theme.name === "dark"
                                ? "bg-black text-light"
                                : "bg-white text-dark"}
                            type="text"
                            placeholder="Enter name"
                            onChange={onNameChange}
                            onBlur={saveName}
                            defaultValue={user?.name}
                            maxLength={50} />
                        {
                            nameError
                                ? <p
                                    className="text-danger">
                                    {nameError}
                                </p>
                                : <p
                                    className="text-muted">
                                    <Signpost
                                        className="mx-2" />
                                    sprost.com/<b>{routeInput}</b>
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
                            className={user?.theme.name === "dark"
                                ? "bg-black text-light"
                                : "bg-white text-dark"}
                            type="email"
                            placeholder="Enter email"
                            onChange={onEmailChange}
                            onBlur={saveEmail}
                            defaultValue={user?.email}
                            maxLength={50} />
                        {
                            emailError &&
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
                            className={user?.theme.name === "dark"
                                ? "bg-black text-light"
                                : "bg-white text-dark"}
                            onChange={onThemeChange}
                            onBlur={saveTheme}
                            value={themeInput?.name}>
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
