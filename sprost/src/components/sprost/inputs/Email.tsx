import {Firestore, doc, updateDoc} from "firebase/firestore";
import React, {useContext, useEffect, useState} from "react";
import {DatabaseContext} from "../../../contexts/Database";
import {Envelope} from "react-bootstrap-icons";
import {Form} from "react-bootstrap";
import {User} from "../../../types/User";
import {UserContext} from "../../../contexts/User";

const Email = () => {

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
            emailInput,
            setEmailInput
        ] = useState<string>("undefined"),
        [
            emailError,
            setEmailError
        ] = useState<string>("undefined"),
        changeEmail = (event: { target: { value: string; }; }) => {

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

        };

    useEffect(
        () => {

            if (user !== "undefined") {

                setEmailInput(user.email ?? "undefined");

            }

        },
        [user]
    );

    return <Form.Group
        className="m-3">
        <Form.Label>
            <Envelope
                className="mx-2" />
            Email
        </Form.Label>
        <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={changeEmail}
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
    </Form.Group>;

};

export default Email;
