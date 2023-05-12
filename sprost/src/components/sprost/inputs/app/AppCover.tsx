import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {App} from "../../../../types/App";
import {Image} from "react-bootstrap-icons";
import ImageSelector from "../ImageSelector";

const AppCover: FC<{
    editApp: App,
    setEditApp: Dispatch<SetStateAction<App | undefined>>,
}> = ({editApp, setEditApp}) => {

    const [
            input,
            setInput
        ] = useState<string>(editApp.cover ?? "undefined"),
        onSubmit = () => {

            const newEditApp: App = structuredClone(editApp);
            newEditApp.cover = input;
            setEditApp(newEditApp);

        };

    useEffect(
        () => {

            if (editApp.cover !== input) {

                onSubmit();

            }

        },
        [input]
    );

    return <div
        className="m-4 p-2 shadow rounded">
        <p>
            <Image
                className="mx-2"/>
            Cover
        </p>
        <div
            className="text-center">
            <img
                src={editApp.cover}
                alt={`${editApp.name} cover`}
                referrerPolicy="no-referrer"
                className="rounded mb-2"
                height={200}
                width="100%" />
        </div>
        <ImageSelector setInput={setInput} />
    </div>;

};

export default AppCover;
