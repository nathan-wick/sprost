import React, {createContext, useContext, useEffect, useState} from "react";
import Dashboard from "../components/sprost/dashboard/DashboardView";
import Landing from "../components/sprost/LandingView";
import {UserContext} from "./User";

export const NavigationContext = createContext<{
        currentView: JSX.Element,
        setCurrentView: React.Dispatch<React.SetStateAction<JSX.Element>>,
    }>({
        "currentView": <Landing />,
        "setCurrentView": () => {
            // Current View Setter
        }
    }),
    NavigationContextProvider = () => {

        const user = useContext(UserContext),
            [
                currentView,
                setCurrentView
            ] = useState<JSX.Element>(<Landing />),
            navigation = {
                currentView,
                setCurrentView
            },
            [
                signedIn,
                setSignedIn
            ] = useState<boolean>(false);

        useEffect(
            () => {

                if (user && user !== "undefined") {

                    if (!signedIn) {

                        setSignedIn(true);
                        setCurrentView(<Dashboard />);

                    }

                } else {

                    setSignedIn(false);
                    setCurrentView(<Landing />);

                }

            },
            [user]
        );

        return <NavigationContext.Provider value={navigation}>
            {currentView}
        </NavigationContext.Provider>;

    };

export default NavigationContextProvider;
