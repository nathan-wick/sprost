import { Auth, onAuthStateChanged, User as AuthenticatedUser } from "firebase/auth";
import { collection, doc, Firestore, getDocs, limit, onSnapshot, query, setDoc, where } from "firebase/firestore";
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
			if (iteration > 1) {
				route = route + String(iteration);
			}
			const usersWithRoute = await getDocs(query(collection(database as Firestore, "users"), where("route", "==", route), limit(1)));
			if (usersWithRoute.empty) {
				routeIsUnique = true;
			} else {
				iteration += 1;
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
			const userReference = doc(database as Firestore, "users", authenticatedUser.uid);
			onSnapshot(userReference, async (userDocument) => {
				const userData = userDocument.data();
				if (userData) {
					// Get User
					const userFromDatabase: User = {
						id: userData.id,
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
					const initialUserData: Partial<User> = {
						id: authenticatedUser.uid,
						route: await createUserRoute(authenticatedUser.displayName ?? authenticatedUser.uid),
						name: authenticatedUser.displayName ?? undefined,
						email: authenticatedUser.email ?? undefined,
						portrait: authenticatedUser.photoURL ?? undefined,
						theme: { name: "light" },
						apps: [],
					};
					await setDoc(userReference, initialUserData);
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