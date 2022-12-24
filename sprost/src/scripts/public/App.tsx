import { doc, Firestore, getDoc } from "firebase/firestore";
import React, { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { App as AppType } from "../../types/App";
import { DatabaseContext } from "../Database";
import { UserContext } from "../User";
import Navigation from "./components/Navigation";
import View from "./View";

const App: FC<{ propsAppRoute?: string, propsViewRoute?: string }> = ({ propsAppRoute, propsViewRoute }) => {
	const params = useParams();
	const database = useContext(DatabaseContext);
	const user = useContext(UserContext);
	const [ app, setApp ] = useState<AppType | undefined>();
	const view = propsViewRoute ? app?.views[app.views.findIndex(view => view.route === propsViewRoute)] : app?.views[0];
	const getAppFromUser = () => {
		setApp(user?.apps.find(userApp => userApp.route === propsAppRoute));
	};
	const getAppFromDatabase = async () => {
		const paramsUserRoute = params.userRoute;
		const paramsAppRoute = params.appRoute;
		if (paramsUserRoute && paramsAppRoute) {
			const appOwnerReference = paramsUserRoute ? doc(database as Firestore, "public", paramsUserRoute) : undefined;
			const appOwnerSnapshot = appOwnerReference ? await getDoc(appOwnerReference) : undefined;
			setApp(appOwnerSnapshot?.data()?.apps.find((app: { route: string | undefined; }) => app.route === paramsAppRoute));
		}
	};

	useEffect(() => {
		if (propsAppRoute) {
			getAppFromUser();
		} else {
			getAppFromDatabase();
		}
	}, []);

	return <>{
		app && view ?
			<>
				<Navigation app={app} />
				<View view={view} />
			</> : <>Loading...</>
	}</>;
};

export default App;