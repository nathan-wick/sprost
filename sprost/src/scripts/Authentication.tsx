import {Auth, getAuth} from "firebase/auth";
import React, {FC, createContext, useContext} from "react";
import {FirebaseContext} from "./Firebase";

export const AuthenticationContext = createContext<Auth | "undefined">("undefined"),
    AuthenticationContextProvider: FC<{ children: JSX.Element }> = ({children}) => {

        const firebaseApp = useContext(FirebaseContext),
            authentication = firebaseApp === "undefined"
                ? "undefined"
                : getAuth(firebaseApp);

        return <AuthenticationContext.Provider value={authentication}>
            {children}
        </AuthenticationContext.Provider>;

    };

export default AuthenticationContextProvider;
