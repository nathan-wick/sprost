import "./custom.scss";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import App from "./scripts/public/App";
import Authentication from "./scripts/Authentication";
import Database from "./scripts/Database";
import Firebase from "./scripts/Firebase";
import Navigation from "./scripts/sprost/Navigation";
import React from "react";
import ReactDOM from "react-dom/client";
import User from "./scripts/User";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(<React.StrictMode>
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
</React.StrictMode>);
