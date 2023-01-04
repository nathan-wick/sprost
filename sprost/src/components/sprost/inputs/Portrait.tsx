import React, {useContext} from "react";
import {UserContext} from "../../../contexts/User";

const Portrait = () => {

    const user = useContext(UserContext);

    return <img
        src={user === "undefined"
            ? "undefined"
            : user.portrait}
        alt={`${user === "undefined"
            ? "undefined"
            : user.name}'s portrait`}
        referrerPolicy="no-referrer"
        className="w-50 my-3 border border-2 rounded-circle" />;

};

export default Portrait;
