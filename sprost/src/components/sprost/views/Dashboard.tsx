import React, {useContext} from "react";
import {Button} from "react-bootstrap";
import {ToasterContext} from "../../../contexts/Toaster";

const Dashboard = () => {

    const toaster = useContext(ToasterContext);

    return <>
        <h1
            className="my-3 mx-5">
                Dashboard
        </h1>
        <hr
            className="my-3 mx-5" />
        {
            toaster !== "undefined" &&
                <Button
                    onClick={() => toaster.createToast(
                        "success",
                        "Test Toast",
                        "This is a test toast."
                    )}>
                    Test Toast
                </Button>
        }
    </>;

};

export default Dashboard;
