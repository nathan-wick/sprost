import {Firestore, doc, updateDoc} from "firebase/firestore";
import React, {FC, useContext, useEffect, useState} from "react";
import {App} from "../../../../types/App";
import {DatabaseContext} from "../../../../contexts/Database";
import {Image} from "react-bootstrap-icons";
import ImageSelector from "../ImageSelector";
import {User} from "../../../../types/User";
import {UserContext} from "../../../../contexts/User";

const Logo: FC<{ app: App | "undefined" }> = ({app}) => {

    const database = useContext(DatabaseContext),
        user = useContext(UserContext),
        [
            input,
            setInput
        ] = useState<string>("undefined"),
        saveInput = async () => {

            if (user !== "undefined" && app !== "undefined") {

                const userReference = doc(
                        database as Firestore,
                        "users",
                        user.id
                    ),
                    newApps: App[] = structuredClone(user.apps),
                    newApp = newApps.find((currentApp) => currentApp.route === app.route);
                if (newApp) {

                    newApp.logo = input;
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

            if (input !== "undefined") {

                saveInput();

            }

        },
        [input]
    );

    return <>
        <p>
            <Image
                className="mx-2"/>
            Logo
        </p>
        <div
            className="text-center">
            <img
                src={app === "undefined"
                    ? "undefined"
                    : app.logo}
                alt={`${app === "undefined"
                    ? "undefined"
                    : app.name} logo`}
                referrerPolicy="no-referrer"
                className="rounded mb-2"
                height={200}
                width={200} />
        </div>
        <ImageSelector setInput={setInput} />
    </>;

};

export default Logo;
