import { FirebaseApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import React, { createContext, FC, useContext } from "react";
import { FirebaseContext } from "./Firebase";

export const DatabaseContext = createContext<Firestore | undefined>(undefined);

const DatabaseContextProvider: FC<{ children: JSX.Element }> = ({ children }) => {
	const firebaseApp = useContext(FirebaseContext);
	const database = getFirestore(firebaseApp as FirebaseApp);

	return <DatabaseContext.Provider value={database}>
		{children}
	</DatabaseContext.Provider>;
};

export default DatabaseContextProvider;