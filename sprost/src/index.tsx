import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import Firebase from "./scripts/Firebase";
import Authentication from "./scripts/Authentication";
import Database from "./scripts/Database";
import User from "./scripts/User";
import Navigation from "./scripts/sprost/Navigation";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
	<React.StrictMode>
		<div className="App">
			<Firebase>
				<Database>
					<Authentication>
						<User>
							<Navigation />
						</User>
					</Authentication>
				</Database>
			</Firebase>
		</div>
	</React.StrictMode>
);