import { collection, Firestore, onSnapshot } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { App } from "../types/App";
import { DatabaseContext } from "./Database";
import { UserContext } from "./User";

export const AppsContext = createContext<App[] | undefined>(undefined);

const AppsContextProvider = (props: any) => {
	const database = useContext(DatabaseContext);
	const user = useContext(UserContext);
	const [ apps, setApps ] = useState<App[]>();

	useEffect(() => {
		if (user) {
			// Get User's Apps
			const appsReference = collection(database as Firestore, "users", user.id, "apps");
			onSnapshot(appsReference, (appsSnapshot) => {
				const appsFromDatabase: App[] = [];
				appsSnapshot.forEach((appDocument) => {
					const appData = appDocument.data();
					const appFromDatabase: App = {
						route: appData.route,
						name: appData.name,
						version: appData.version,
					};
					appsFromDatabase.push(appFromDatabase);
				});
				setApps(appsFromDatabase);
			});
		}
	}, [ user ]);

	useEffect(() => console.log("Got Apps ", apps), [ apps ]);

	return <AppsContext.Provider value={apps}>
		{props.children}
	</AppsContext.Provider>;
};

export default AppsContextProvider;