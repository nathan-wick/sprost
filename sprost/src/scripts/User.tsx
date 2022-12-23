import { Auth, onAuthStateChanged, User as AuthenticatedUser } from "firebase/auth";
import { doc, Firestore, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import React, { createContext, FC, useContext, useEffect, useState } from "react";
import { User } from "../types/User";
import { AuthenticationContext } from "./Authentication";
import { DatabaseContext } from "./Database";

export const UserContext = createContext<User | undefined>(undefined);

const UserContextProvider: FC<{ children: JSX.Element }> = ({ children }) => {
	const authentication = useContext(AuthenticationContext);
	const database = useContext(DatabaseContext);
	const [ authenticatedUser, setAuthenticatedUser ] = useState<AuthenticatedUser | null>(null);
	const [ user, setUser ] = useState<User>();
	const createUserRoute = async (name: string) => {
		let route = name.toLowerCase().replaceAll(" ", "-");
		let routeIsUnique = false;
		let iteration = 1;
		while (!routeIsUnique) {
			console.log(route, iteration);
			let newRoute = route;
			if (iteration > 1) {
				newRoute = route + String(iteration);
			}
			const publicUserReference = doc(database as Firestore, "public", newRoute);
			const publicUserSnapshot = await getDoc(publicUserReference);
			if (publicUserSnapshot.exists()) {
				iteration += 1;
			} else {
				route = newRoute;
				routeIsUnique = true;
			}
		}
		return route;
	};

	onAuthStateChanged(authentication as Auth, (newAuthenticatedUser) => {
		newAuthenticatedUser ?
			setAuthenticatedUser(newAuthenticatedUser) :
			setUser(undefined);
	});

	useEffect(() => {
		if (authenticatedUser) {
			const id = authenticatedUser.uid;
			const userReference = doc(database as Firestore, "users", id);
			onSnapshot(userReference, async (userDocument) => {
				const userData = userDocument.data();
				if (userData) {
					// Get User
					const userFromDatabase: User = {
						id,
						route: userData.route,
						name: userData.name,
						email: userData.email,
						portrait: userData.portrait,
						theme: userData.theme,
						apps: userData.apps,
					};
					setUser(userFromDatabase);
				} else {
					// Initialize User
					const name = authenticatedUser.displayName ?? undefined;
					const route = await createUserRoute(name ?? id);
					const portrait = authenticatedUser.photoURL ?? undefined;
					const initialUserData: Partial<User> = {
						name, route, portrait,
						email: authenticatedUser.email ?? undefined,
						theme: { name: "light" },
						apps: [],
					};
					await setDoc(userReference, initialUserData);
					const publicUserReference = doc(database as Firestore, "public", route);
					const initialPublicUserData: Partial<User> = {
						name, portrait,
					};
					await setDoc(publicUserReference, initialPublicUserData);
				}
			});
		}
	}, [ authenticatedUser ]);

	useEffect(() => console.log("Got User ", user), [ user ]);

	return <UserContext.Provider value={user}>
		{children}
	</UserContext.Provider>;
};

export default UserContextProvider;