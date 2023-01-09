import {Firestore, doc, updateDoc} from "firebase/firestore";
import React, {FC, useContext, useEffect, useState} from "react";
import {App} from "../../../types/App";
import {Chat} from "react-bootstrap-icons";
import {DatabaseContext} from "../../../contexts/Database";
import {Form} from "react-bootstrap";
import {User} from "../../../types/User";
import {UserContext} from "../../../contexts/User";

const AppDescription: FC<{ app: App | "undefined" }> = ({app}) => {

    const database = useContext(DatabaseContext),
        user = useContext(UserContext),
        [
            input,
            setInput
        ] = useState<string>("undefined"),
        [
            error,
            setError
        ] = useState<string>("undefined"),
        changeDescription = (event: { target: { value: string; }; }) => {

            if (event.target.value) {

                setInput(event.target.value);
                setError("undefined");

            } else {

                setError("Please enter an email");

            }

        },
        saveDescription = async () => {

            if (user !== "undefined" && app !== "undefined") {

                const userReference = doc(
                        database as Firestore,
                        "users",
                        user.id
                    ),
                    newApps: App[] = structuredClone(user.apps),
                    newApp = newApps.find((currentApp) => currentApp.route === app.route);
                if (newApp) {

                    newApp.description = input;
                    const userInputData: Partial<User> = {
                        "apps": newApps
                    };
                    await updateDoc(
                        userReference,
                        userInputData
                    );

                }

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
            <Chat
                className="mx-2" />
            Description
        </Form.Label>
        <Form.Control
            as="textarea"
            rows={3}
            onChange={changeDescription}
            onBlur={saveDescription}
            defaultValue={app === "undefined"
                ? "undefined"
                : app.description}
            maxLength={500} />
        {
            error !== "undefined" &&
            <p
                className="text-danger">
                {error}
            </p>
        }
    </Form.Group>;

};

export default AppDescription;
