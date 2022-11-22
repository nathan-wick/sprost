import { FirebaseApp, initializeApp } from "firebase/app";
import React, { createContext } from "react";

export const FirebaseContext = createContext<FirebaseApp | undefined>(undefined);

const FirebaseContextProvider = (props: any) => {
	const firebaseConfig = {
		apiKey: "AIzaSyDeL2Od5-EifO2pyz4BqNwfHVyyiZV0ULU",
		authDomain: "nathan-wick-sprost.firebaseapp.com",
		projectId: "nathan-wick-sprost",
		storageBucket: "nathan-wick-sprost.appspot.com",
		messagingSenderId: "896198305700",
		appId: "1:896198305700:web:ffba7ba3c9c04fcae3c331"
	};
	const firebaseApp = initializeApp(firebaseConfig);

	return <FirebaseContext.Provider value={firebaseApp}>
		{props.children}
	</FirebaseContext.Provider>;
};

export default FirebaseContextProvider;