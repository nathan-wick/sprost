import { Auth, onAuthStateChanged, User as AuthenticatedUser } from "firebase/auth";
import { doc, Firestore, onSnapshot, setDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/User";
import { AuthenticationContext } from "./Authentication";
import { DatabaseContext } from "./Database";

export const UserContext = createContext<User | undefined>(undefined);

const UserContextProvider = (props: any) => {
	const authentication = useContext(AuthenticationContext);
	const database = useContext(DatabaseContext);
	const [ authenticatedUser, setAuthenticatedUser ] = useState<AuthenticatedUser | null>(null);
	const [ user, setUser ] = useState<User>();

	onAuthStateChanged(authentication as Auth, (newAuthenticatedUser) => {
		newAuthenticatedUser ?
			setAuthenticatedUser(newAuthenticatedUser) :
			setUser(undefined);
	});

	useEffect(() => {
		if (authenticatedUser) {
			const userReference = doc(database as Firestore, "users", authenticatedUser.uid);
			onSnapshot(userReference, async (userDocument) => {
				const userData = userDocument.data();
				if (userData) {
					// Get User
					const userFromDatabase: User = {
						id: userData.id,
						name: userData.name,
						email: userData.email,
						portrait: userData.portrait,
						theme: userData.theme,
					};
					setUser(userFromDatabase);
				} else {
					// Initialize User
					const initialUserData: Partial<User> = {
						id: authenticatedUser.uid,
						name: authenticatedUser.displayName ? authenticatedUser.displayName : undefined,
						email: authenticatedUser.email ? authenticatedUser.email : undefined,
						portrait: authenticatedUser.photoURL ? authenticatedUser.photoURL : undefined,
						theme: { name: "light" },
					};
					await setDoc(userReference, initialUserData);
				}
			});
		}
	}, [ authenticatedUser ]);

	useEffect(() => console.log("Got User ", user), [ user ]);

	return <UserContext.Provider value={user}>
		{props.children}
	</UserContext.Provider>;
};

export default UserContextProvider;