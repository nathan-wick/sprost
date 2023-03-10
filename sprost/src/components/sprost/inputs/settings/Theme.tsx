import {Firestore, doc, updateDoc} from "firebase/firestore";
import React, {useContext, useEffect, useState} from "react";
import {DatabaseContext} from "../../../../contexts/Database";
import {Form} from "react-bootstrap";
import {PaintBucket} from "react-bootstrap-icons";
import {User} from "../../../../types/User";
import {UserContext} from "../../../../contexts/User";

const Theme = () => {

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
        ] = useState<"light" | "dark">("light"),
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
        changeTheme = (event: { target: { value: string; }; }) => {

            switch (event.target.value) {

            case "dark":
                setInput("dark");
                break;
            case "light":
            default:
                setInput("light");
                break;

            }

        },
        saveTheme = async () => {

            if (userReference !== "undefined") {

                const userInputData: Partial<User> = {
                    "theme": input
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

                setInput(user.theme);

            }

        },
        [user]
    );

    return <div
        className="mt-4">
        <p>
            <PaintBucket
                className="mx-2" />
            Theme
        </p>
        <Form.Select
            onChange={changeTheme}
            onBlur={saveTheme}
            value={user === "undefined"
                ? "light"
                : user.theme}>
            {
                themeOptions.map((themeOption) => <option
                    key={`user-theme-option-${themeOption.value}`}
                    value={themeOption.value}>
                    {themeOption.text}
                </option>)
            }
        </Form.Select>
    </div>;

};

export default Theme;
