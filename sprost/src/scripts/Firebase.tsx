import {FirebaseApp, initializeApp} from "firebase/app";
import React, {FC, createContext} from "react";

export const FirebaseContext = createContext<FirebaseApp | "undefined">("undefined"),
    FirebaseContextProvider: FC<{ children: JSX.Element }> = ({children}) => {

        const firebaseConfig = {
                "apiKey": "AIzaSyDeL2Od5-EifO2pyz4BqNwfHVyyiZV0ULU",
                "appId": "1:896198305700:web:ffba7ba3c9c04fcae3c331",
                "authDomain": "nathan-wick-sprost.firebaseapp.com",
                "messagingSenderId": "896198305700",
                "projectId": "nathan-wick-sprost",
                "storageBucket": "nathan-wick-sprost.appspot.com"
            },
            firebaseApp = initializeApp(firebaseConfig);

        return <FirebaseContext.Provider value={firebaseApp}>
            {children}
        </FirebaseContext.Provider>;

    };

export default FirebaseContextProvider;
