import { Auth, getAuth, onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import Dashboard from "../components/sprost/views/Dashboard";
import Landing from "../components/sprost/views/Landing";
import { FirebaseContext } from "./Firebase";

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
                <Dashboard /> :
                <Landing />
        }
    </AuthContext.Provider>
};

export default AuthContextProvider;