import "./custom.scss";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import App from "./components/public/App";
import Authentication from "./contexts/Authentication";
import Database from "./contexts/Database";
import Firebase from "./contexts/Firebase";
import Navigation from "./components/sprost/Navigation";
import React from "react";
import ReactDOM from "react-dom/client";
import Storage from "./contexts/Storage";
import User from "./contexts/User";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(<React.StrictMode>
    <Firebase>
        <Database>
            <Storage>
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
            </Storage>
        </Database>
    </Firebase>
</React.StrictMode>);
