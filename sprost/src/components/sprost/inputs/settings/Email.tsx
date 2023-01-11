import {Firestore, doc, updateDoc} from "firebase/firestore";
import React, {useContext, useEffect, useState} from "react";
import {DatabaseContext} from "../../../../contexts/Database";
import {Envelope} from "react-bootstrap-icons";
import {Form} from "react-bootstrap";
import {User} from "../../../../types/User";
import {UserContext} from "../../../../contexts/User";

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
            input,
            setInput
        ] = useState<string>("undefined"),
        [
            error,
            setError
        ] = useState<string>("undefined"),
        changeEmail = (event: { target: { value: string; }; }) => {

            if (event.target.value) {

                if (event.target.value.match(/^\S+@\S+\.\S+$/u)) {

                    setInput(event.target.value);
                    setError("undefined");

                } else {

                    setError("Please enter a valid email");

                }

            } else {

                setError("Please enter an email");

            }

        },
        saveEmail = async () => {

            if (userReference !== "undefined" && error === "undefined") {

                const userInputData: Partial<User> = {
                    "email": input
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

                setInput(user.email ?? "undefined");

            }

        },
        [user]
    );

    return <Form.Group
        className="my-4">
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
            error !== "undefined" &&
            <p
                className="text-danger">
                {error}
            </p>
        }
    </Form.Group>;

};

export default Email;
