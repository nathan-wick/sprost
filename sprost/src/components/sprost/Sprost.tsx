import { useState } from "react";
import Dashboard from "./views/Dashboard";
import Apps from "./views/Apps";
import Account from "./views/Account";

const Sprost = () => {
    const [ currentView, setCurrentView ] = useState<JSX.Element>(<Dashboard />);

    return <>
        {currentView}
    </>;
}

export default Sprost;