import {Firestore, doc, updateDoc} from "firebase/firestore";
import React, {useContext, useEffect, useState} from "react";
import {DatabaseContext} from "../../../../contexts/Database";
import {Image} from "react-bootstrap-icons";
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

    return <div
        className="mb-4">
        <p>
            <Image
                className="mx-2" />
            Portrait
        </p>
        <div
            className="w-100 text-center">
            <img
                src={user === "undefined"
                    ? "undefined"
                    : user.portrait}
                alt={`${user === "undefined"
                    ? "undefined"
                    : user.name}'s portrait`}
                referrerPolicy="no-referrer"
                className="rounded my-2"
                height={100}
                width={100} />
            <br />
            <ImageSelector setInput={setInput} />
        </div>
    </div>;

};

export default Portrait;
