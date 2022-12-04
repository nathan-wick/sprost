import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import Firebase from "./components/Firebase";
import Authentication from "./components/Authentication";
import Database from "./components/Database";
import User from "./components/User";
import Navigation from "./components/sprost/Navigation";
import Apps from "./components/Apps";

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
							<Apps>
								<Navigation />
							</Apps>
						</User>
					</Authentication>
				</Database>
			</Firebase>
		</div>
	</React.StrictMode>
);