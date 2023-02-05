import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {App} from "../../../../types/App";
import {Image} from "react-bootstrap-icons";
import ImageSelector from "../ImageSelector";

const AppLogo: FC<{
    editApp: App,
    setEditApp: Dispatch<SetStateAction<App>>,
}> = ({editApp, setEditApp}) => {

    const [
            input,
            setInput
        ] = useState<string>(editApp.logo ?? "undefined"),
        onSubmit = () => {

            const newEditApp: App = structuredClone(editApp);
            newEditApp.logo = input;
            setEditApp(newEditApp);

        };

    useEffect(
        () => {

            if (editApp.logo !== input) {

                onSubmit();

            }

        },
        [input]
    );

    return <>
        <p>
            <Image
                className="mx-2"/>
            Logo
        </p>
        <div
            className="text-center">
            <img
                src={editApp.logo}
                alt={`${editApp.name} logo`}
                referrerPolicy="no-referrer"
                className="rounded mb-2"
                height={200}
                width={200} />
        </div>
        <ImageSelector setInput={setInput} />
    </>;

};

export default AppLogo;
