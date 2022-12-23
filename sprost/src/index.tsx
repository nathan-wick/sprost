import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import Firebase from "./scripts/Firebase";
import Authentication from "./scripts/Authentication";
import Database from "./scripts/Database";
import User from "./scripts/User";
import Navigation from "./scripts/sprost/Navigation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./scripts/public/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// TODO: Create a 404 and Loading view. Tutorial: https://reactrouter.com/en/main/start/tutorial
root.render(
	<React.StrictMode>
		<Firebase>
			<Database>
				<Authentication>
					<User>
						<Router>
							<Routes>
								<Route
									path="/"
									element={<Navigation />}/>
								<Route
									path=":userRoute/:appRoute"
									element={<App />}/>
							</Routes>
						</Router>
					</User>
				</Authentication>
			</Database>
		</Firebase>
	</React.StrictMode>
);