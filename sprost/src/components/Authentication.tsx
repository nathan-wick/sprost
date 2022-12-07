import { Auth, getAuth } from "firebase/auth";
import React, { createContext, FC, useContext } from "react";
import { FirebaseContext } from "./Firebase";

export const AuthenticationContext = createContext<Auth | undefined>(undefined);

const AuthenticationContextProvider: FC<{ children: JSX.Element }> = ({ children }) => {
	const firebaseApp = useContext(FirebaseContext);
	const authentication = getAuth(firebaseApp);

	return <AuthenticationContext.Provider value={authentication}>
		{children}
	</AuthenticationContext.Provider>;
};

export default AuthenticationContextProvider;