import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {App} from "../../../../types/App";
import {Form} from "react-bootstrap";
import {PinMap} from "react-bootstrap-icons";

const NavigationLinkDestination: FC<{
    editApp: App,
    setEditApp: Dispatch<SetStateAction<App>>,
    index: number,
}> = ({editApp, setEditApp, index}) => {

    const [
            input,
            setInput
        ] = useState<string | undefined>(editApp.navigation[index].destination),
        onChange = (event: { target: {
            value: React.SetStateAction<string | undefined>;
        }; }) => {

            setInput(event.target.value);

        },
        onSubmit = () => {

            if (input) {

                const newEditApp: App = structuredClone(editApp);
                newEditApp.navigation[index].destination = input;
                if (newEditApp.navigation[index].type === "internal") {

                    newEditApp.navigation[index].name =
                        newEditApp.views.find((view) => view.route === input)?.name ?? input;

                }
                setEditApp(newEditApp);

            }

        };

    return <>
        <p
            className="mt-4">
            <PinMap
                className="mx-2"/>
            Destination
        </p>
        {
            editApp.navigation[index].type === "internal"
                ? <Form.Select
                    onChange={onChange}
                    onBlur={onSubmit}
                    defaultValue={input}>
                    {
                        editApp.views.map((view) => <option
                            key={view.route}
                            value={view.route}>
                            {view.name}
                        </option>)
                    }
                </Form.Select>
                : <Form.Control
                    type="text"
                    onChange={onChange}
                    onBlur={onSubmit}
                    defaultValue={input}
                    maxLength={50} />
        }
    </>;

};

export default NavigationLinkDestination;
