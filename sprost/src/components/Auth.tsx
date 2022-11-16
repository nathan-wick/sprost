import { Auth, getAuth, onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import Landing from "./sprost/views/Landing";
import { FirebaseContext } from "./Firebase";
import Navigation from "./sprost/Navigation";

export const AuthContext = createContext<Auth | undefined>(undefined);

const AuthContextProvider = () => {
    const firebaseApp = useContext(FirebaseContext);
    const auth = getAuth(firebaseApp);
    const [ user, setUser ] = useState<User | null>(null);

    onAuthStateChanged(auth, (user) => {
        setUser(user);
    });

    return <AuthContext.Provider value={auth}>
        {
            user ?
                <Navigation /> :
                <Landing />
        }
    </AuthContext.Provider>
};

export default AuthContextProvider;