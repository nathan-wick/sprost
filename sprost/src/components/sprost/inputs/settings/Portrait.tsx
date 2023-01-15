import {Col, Form, Row} from "react-bootstrap";
import {Firestore, doc, updateDoc} from "firebase/firestore";
import React, {useContext, useEffect, useState} from "react";
import {Camera} from "react-bootstrap-icons";
import {DatabaseContext} from "../../../../contexts/Database";
import ImageSelector from "../ImageSelector";
import {User} from "../../../../types/User";
import {UserContext} from "../../../../contexts/User";

const Portrait = () => {

    const database = useContext(DatabaseContext),
        user = useContext(UserContext),
        [
            input,
            setInput
        ] = useState<string>("undefined"),
        saveInput = async () => {

            if (user !== "undefined") {

                const userReference = doc(
                    database as Firestore,
                    "users",
                    user.id
                    ),
                    userInputData: Partial<User> = {
                        "portrait": input
                    };
                await updateDoc(
                    userReference,
                    userInputData
                );

            }

        };

    useEffect(
        () => {

            if (input !== "undefined") {

                saveInput();

            }

        },
        [input]
    );

    return <Form.Group
        className="my-4">
        <Row
            className="gx-0">
            <Col
                md="auto"
                className="text-center px-3">
                <img
                    src={user === "undefined"
                        ? "undefined"
                        : user.portrait}
                    alt={`${user === "undefined"
                        ? "undefined"
                        : user.name}'s portrait`}
                    referrerPolicy="no-referrer"
                    className="border border-2 rounded-circle"
                    height={80}
                    width={80} />
            </Col>
            <Col>
                <p>
                    <Camera
                        className="mx-2" />
                    Portrait
                </p>
                <ImageSelector setInput={setInput} />
            </Col>
        </Row>
    </Form.Group>;

};

export default Portrait;
