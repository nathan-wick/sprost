import {Auth, User as AuthenticatedUser, onAuthStateChanged} from "firebase/auth";
import {Firestore, doc, getDoc, onSnapshot, setDoc} from "firebase/firestore";
import React, {FC, createContext, useContext, useEffect, useState} from "react";
import {App} from "../types/App";
import {AuthenticationContext} from "./Authentication";
import {DatabaseContext} from "./Database";
import {User} from "../types/User";

export const UserContext = createContext<User | "undefined">("undefined"),
    UserContextProvider: FC<{ children: JSX.Element }> = ({children}) => {

        const authentication = useContext(AuthenticationContext),
            database = useContext(DatabaseContext),
            [
                authenticatedUser,
                setAuthenticatedUser
            ] = useState<AuthenticatedUser | null>(null),
            [
                user,
                setUser
            ] = useState<User | "undefined">("undefined"),
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
                    ),
                    routeIsUnique = false,
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
                return route;

            };

        onAuthStateChanged(
            authentication as Auth,
            (newAuthenticatedUser) => {

                // eslint-disable-next-line no-unused-expressions
                newAuthenticatedUser
                    ? setAuthenticatedUser(newAuthenticatedUser)
                    : setUser("undefined");

            }
        );

        useEffect(
            () => {

                if (authenticatedUser) {

                    const id = authenticatedUser.uid,
                        userReference = doc(
                            database as Firestore,
                            "users",
                            id
                        );
                    onSnapshot(
                        userReference,
                        async (userDocument) => {

                            const userData = userDocument.data();
                            if (userData) {

                                // Get User
                                const userFromDatabase: User = {
                                    "apps": userData.apps,
                                    "email": userData.email,
                                    id,
                                    "name": userData.name,
                                    "portrait": userData.portrait,
                                    "route": userData.route,
                                    "theme": userData.theme
                                };
                                setUser(userFromDatabase);

                            } else {

                                // Initialize User
                                const name = authenticatedUser.displayName ?? "undefined",
                                    route = await createUserRoute(name ?? id),
                                    portrait = authenticatedUser.photoURL ?? "undefined",
                                    apps: App[] = [],
                                    initialUserData: Partial<User> = {
                                        apps,
                                        "email": authenticatedUser.email ?? "undefined",
                                        name,
                                        portrait,
                                        route,
                                        "theme": {"name": "light"}
                                    },
                                    publicUserReference = doc(
                                        database as Firestore,
                                        "public",
                                        route
                                    ),
                                    initialPublicUserData: Partial<User> = {
                                        apps,
                                        name,
                                        portrait
                                    };
                                await setDoc(
                                    userReference,
                                    initialUserData
                                );
                                await setDoc(
                                    publicUserReference,
                                    initialPublicUserData
                                );

                            }

                        }
                    );

                }

            },
            [authenticatedUser]
        );

        useEffect(
            // eslint-disable-next-line no-console
            () => console.log(
                "Got User ",
                user
            ),
            [user]
        );

        return <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>;

    };

export default UserContextProvider;
