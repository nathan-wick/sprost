import {FirebaseStorage, getStorage} from "firebase/storage";
import React, {FC, createContext, useContext} from "react";
import {FirebaseApp} from "firebase/app";
import {FirebaseContext} from "./Firebase";

export const StorageContext = createContext<FirebaseStorage | "undefined">("undefined"),
    StorageContextProvider: FC<{ children: JSX.Element }> = ({children}) => {

        const firebaseApp = useContext(FirebaseContext),
            storage = getStorage(firebaseApp as FirebaseApp);

        return <StorageContext.Provider value={storage}>
            {children}
        </StorageContext.Provider>;

    };

export default StorageContextProvider;
