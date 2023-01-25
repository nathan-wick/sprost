import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {Chat} from "react-bootstrap-icons";
import {Form} from "react-bootstrap";
import {View} from "../../../../types/View";

const PageDescription: FC<{
    editView: View,
    setEditView: Dispatch<SetStateAction<View | "undefined">>,
}> = ({editView, setEditView}) => {

    const [
            input,
            setInput
        ] = useState<string | undefined>(editView.description),
        onChange = (event: { target: {
            value: React.SetStateAction<string | undefined>;
        }; }) => {

            setInput(event.target.value);

        },
        onSubmit = () => {

            const newView: View = structuredClone(editView);
            if (newView) {

                newView.description = String(input);
                newView.isSaved = false;
                setEditView(newView);

            }

        };

    return <>
        <p
            className="mt-4">
            <Chat
                className="mx-2"/>
            Description
        </p>
        <Form.Control
            as="textarea"
            rows={3}
            onChange={onChange}
            onBlur={onSubmit}
            defaultValue={input}
            maxLength={500} />
    </>;

};

export default PageDescription;
