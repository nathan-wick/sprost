import { Auth, onAuthStateChanged, User as AuthenticatedUser } from "firebase/auth";
import { doc, Firestore, onSnapshot, setDoc } from "firebase/firestore";
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
    const [ user, setUser ] = useState<User | undefined>(undefined);

    onAuthStateChanged(authentication as Auth, (newAuthenticatedUser) => {
        newAuthenticatedUser ?
            setAuthenticatedUser(newAuthenticatedUser) :
            setUser(undefined);
    });

    useEffect(() => {
        if (authenticatedUser) {
            const userReference = doc(database as Firestore, "users", authenticatedUser.uid);
            onSnapshot(userReference, async (userSnapshot) => {
                if (userSnapshot.data()) {
                    const userFromDatabase: User = {
                        id: userSnapshot.data()?.id,
                        name: userSnapshot.data()?.name,
                        email: userSnapshot.data()?.email,
                        portrait: userSnapshot.data()?.portrait,
                    };
                    setUser(userFromDatabase);
                    console.log(`Got User `, user);
                } else {
                    const initialUserData: Partial<User> = {
                        id: authenticatedUser.uid,
                        name: authenticatedUser.displayName ? authenticatedUser.displayName : undefined,
                        email: authenticatedUser.email ? authenticatedUser.email : undefined,
                        portrait: authenticatedUser.photoURL ? authenticatedUser.photoURL : undefined,
                    };
                    await setDoc(userReference, initialUserData, { merge: true });
                    console.log(`Initialized User `, initialUserData);
                }
            });
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