import {Bookmarks, Signpost} from "react-bootstrap-icons";
import {Firestore, deleteDoc, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import React, {useContext, useEffect, useState} from "react";
import {DatabaseContext} from "../../../../contexts/Database";
import {Form} from "react-bootstrap";
import {User} from "../../../../types/User";
import {UserContext} from "../../../../contexts/User";

const Name = () => {

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
            error,
            setError
        ] = useState<string>("undefined"),
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
        createRoute = async (name: string) => {

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
        changeName = (event: { target: { value: string; }; }) => {

            if (event.target.value) {

                if (event.target.value.match(/^[a-zA-Z\s]*$/gu)) {

                    setNameInput(event.target.value);
                    setError("undefined");

                } else {

                    setError("Please use only letters and spaces");

                }

            } else {

                setError("Please enter a name");

            }

        },
        saveName = async () => {

            if (user !== "undefined" && userReference !== "undefined" &&
                error === "undefined" && nameInput !== "undefined") {

                const newRoute = await createRoute(nameInput),
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

        };

    useEffect(
        () => {

            if (user !== "undefined") {

                setNameInput(user.name ?? "undefined");
                setRouteInput(user.route);

            }

        },
        [user]
    );

    return <div
        className="my-4">
        <p>
            <Bookmarks
                className="mx-2" />
            Name
        </p>
        <Form.Control
            type="text"
            placeholder="Enter name"
            onChange={changeName}
            onBlur={saveName}
            defaultValue={user === "undefined"
                ? "undefined"
                : user.name}
            maxLength={50} />
        {
            error === "undefined"
                ? <p
                    className="text-success">
                    <Signpost
                        className="mx-2" />
                sprost.com/{routeInput}
                </p>
                : <p
                    className="text-danger">
                    {error}
                </p>
        }
    </div>;

};

export default Name;
