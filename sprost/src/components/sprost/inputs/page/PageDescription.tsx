import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {Chat} from "react-bootstrap-icons";
import {Form} from "react-bootstrap";
import {View} from "../../../../types/View";

const PageDescription: FC<{
    view: View,
    setView: Dispatch<SetStateAction<View | undefined>>,
}> = ({view, setView}) => {

    const [
            input,
            setInput
        ] = useState<string | undefined>(view.description),
        onChange = (event: { target: {
            value: React.SetStateAction<string | undefined>;
        }; }) => {

            setInput(event.target.value);

        },
        onSubmit = () => {

            const newView: View = structuredClone(view);
            if (newView) {

                newView.description = String(input);
                newView.isSaved = false;
                setView(newView);

            }

        };

    return <>
        <p>
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
