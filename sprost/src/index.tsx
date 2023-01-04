import "./custom.scss";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import App from "./components/public/App";
import Authentication from "./components/Authentication";
import Database from "./components/Database";
import Firebase from "./components/Firebase";
import Navigation from "./components/sprost/Navigation";
import React from "react";
import ReactDOM from "react-dom/client";
import User from "./components/User";

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
