import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {App} from "../../../../types/App";
import {Form} from "react-bootstrap";
import {Tag} from "react-bootstrap-icons";

const NavigationLinkName: FC<{
    editApp: App,
    setEditApp: Dispatch<SetStateAction<App | undefined>>,
    index: number,
}> = ({editApp, setEditApp, index}) => {

    const [
            input,
            setInput
        ] = useState<string | undefined>(editApp.navigation[index].name),
        onChange = (event: { target: {
            value: React.SetStateAction<string | undefined>;
        }; }) => {

            setInput(event.target.value);

        },
        onSubmit = () => {

            if (input) {

                const newEditApp: App = structuredClone(editApp);
                newEditApp.navigation[index].name = input;
                setEditApp(newEditApp);

            }

        };

    return <>
        <p
            className="mt-4">
            <Tag
                className="mx-2"/>
            Name
        </p>
        <Form.Control
            type="text"
            onChange={onChange}
            onBlur={onSubmit}
            defaultValue={input}
            maxLength={50} />
    </>;

};

export default NavigationLinkName;
