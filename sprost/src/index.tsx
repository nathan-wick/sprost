import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import Firebase from "./components/Firebase";
import Authentication from "./components/Authentication";
import Database from "./components/Database";
import User, { UserContext } from "./components/User";
import Navigation from "./components/sprost/Navigation";
import Landing from "./components/sprost/views/Landing";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const Initial = () => {
	const user = useContext(UserContext);
	const initialView = user ? <Navigation /> : <Landing />;

	useEffect(() => {
		document.body.style.backgroundColor = `var(--bs-${user?.theme.name})`;
		document.body.style.color = `var(--bs-${user?.theme.name === "dark" ? "light" : "dark"})`;
	}, [ user ]);
  
	return initialView;
};


root.render(
	<React.StrictMode>
		<div className="App">
			<Firebase>
				<Database>
					<Authentication>
						<User>
							<Initial />
						</User>
					</Authentication>
				</Database>
			</Firebase>
		</div>
	</React.StrictMode>
);