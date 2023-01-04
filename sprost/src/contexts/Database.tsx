import {Firestore, getFirestore} from "firebase/firestore";
import React, {FC, createContext, useContext} from "react";
import {FirebaseApp} from "firebase/app";
import {FirebaseContext} from "./Firebase";

export const DatabaseContext = createContext<Firestore | "undefined">("undefined"),
    DatabaseContextProvider: FC<{ children: JSX.Element }> = ({children}) => {

        const firebaseApp = useContext(FirebaseContext),
            database = getFirestore(firebaseApp as FirebaseApp);

        return <DatabaseContext.Provider value={database}>
            {children}
        </DatabaseContext.Provider>;

    };

export default DatabaseContextProvider;
