import { Auth, onAuthStateChanged, User as AuthenticatedUser } from "firebase/auth";
import { doc, Firestore, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/User";
import { AuthenticationContext } from "./Authentication";
import { DatabaseContext } from "./Database";
import Navigation from "./sprost/Navigation";
import Landing from "./sprost/views/Landing";

export const UserContext = createContext<User | undefined>(undefined);

const UserContextProvider = (props: any) => {
    const authentication = useContext(AuthenticationContext);
    const database = useContext(DatabaseContext);
    const [ authenticatedUser, setAuthenticatedUser ] = useState<AuthenticatedUser | null>(null);
    const [ user, setUser ] = useState<User>();

    onAuthStateChanged(authentication as Auth, (newUser) => {
        setAuthenticatedUser(newUser);
    });

    // TODO: Update User only when they're new

    const UpdateUser = async (userToUpdate: AuthenticatedUser) => {
        const initialUserData: Partial<User> = {
            id: userToUpdate.uid,
            name: userToUpdate.displayName,
            email: userToUpdate.email,
            portrait: userToUpdate.photoURL,
        };
        const userReference = doc(database as Firestore, "users", userToUpdate.uid);
        await setDoc(userReference, initialUserData, { merge: true });
        console.log(`Updated User`, initialUserData);
    }

    // TODO: Get User only when there's a database change

    const GetUser = async (userToGet: AuthenticatedUser) => {
        const userReference = doc(database as Firestore, "users", userToGet.uid);
        const userSnapshot = await getDoc(userReference);
        if (userSnapshot.exists()) {
            const userFromDatabase: User = {
                id: userSnapshot.data().id,
                name: userSnapshot.data().name,
                email: userSnapshot.data().email,
                portrait: userSnapshot.data().portrait,
            };
            setUser(userFromDatabase);
            console.log(`Got User`, userFromDatabase);
        }
    }

    useEffect(() => {
        if (authenticatedUser) {
            UpdateUser(authenticatedUser);
            GetUser(authenticatedUser);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ authenticatedUser ]);

    return <UserContext.Provider value={user}>
        {
            user ?
            <Navigation /> :
            <Landing />
        }
    </UserContext.Provider>
};

export default UserContextProvider;