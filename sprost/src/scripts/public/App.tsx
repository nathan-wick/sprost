import React from "react";
import { useParams } from "react-router-dom";

const App = () => {
	const { userRoute, appRoute } = useParams();

	return <>
		<h1>App Placeholder</h1>
		<p>User: {userRoute}</p>
		<p>App: {appRoute}</p>
	</>;
};

export default App;