import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {App} from "../../../../types/App";
import {Form} from "react-bootstrap";
import {Link45deg} from "react-bootstrap-icons";

const NavigationLinkType: FC<{
    editApp: App,
    setEditApp: Dispatch<SetStateAction<App | undefined>>,
    index: number,
}> = ({editApp, setEditApp, index}) => {

    const [
            input,
            setInput
        ] = useState<"internal" | "external" | undefined>(editApp.navigation[index].type),
        onChange = (event: { target: {
            value: React.SetStateAction<string | undefined>;
        }; }) => {

            if (event.target.value === "internal" || event.target.value === "external") {

                setInput(event.target.value);

            }

        },
        onSubmit = () => {

            if (input) {

                const newEditApp: App = structuredClone(editApp);
                newEditApp.navigation[index].type = input;
                if (input === "internal") {

                    newEditApp.navigation[index].name = newEditApp.views[0].name;
                    newEditApp.navigation[index].destination = newEditApp.views[0].route;

                } else {

                    newEditApp.navigation[index].name = "Google";
                    newEditApp.navigation[index].destination = "https://www.google.com/";

                }
                setEditApp(newEditApp);

            }

        };

    return <>
        <p
            className="mt-4">
            <Link45deg
                className="mx-2"/>
            Type
        </p>
        <Form.Select
            onChange={onChange}
            onBlur={onSubmit}
            defaultValue={input}>
            <option
                value="external">
                External
            </option>
            {
                editApp.views.length > 0 &&
                <option
                    value="internal">
                    Internal
                </option>
            }
        </Form.Select>
    </>;

};

export default NavigationLinkType;
