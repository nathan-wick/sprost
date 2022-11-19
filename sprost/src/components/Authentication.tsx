import { Auth, getAuth } from "firebase/auth";
import { createContext, useContext } from "react";
import { FirebaseContext } from "./Firebase";

export const AuthenticationContext = createContext<Auth | undefined>(undefined);

const AuthenticationContextProvider = (props: any) => {
    const firebaseApp = useContext(FirebaseContext);
    const authentication = getAuth(firebaseApp);

    return <AuthenticationContext.Provider value={authentication}>
        {props.children}
    </AuthenticationContext.Provider>
};

export default AuthenticationContextProvider;