import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {Chat} from "react-bootstrap-icons";
import {Component} from "../../../../../types/Component";
import {Form} from "react-bootstrap";
import {Paragraph} from "../../../../../types/components/Paragraph";

const ParagraphMessage: FC<{
    editComponent: Component,
    setEditComponent: Dispatch<SetStateAction<Component | undefined>>,
}> = ({editComponent, setEditComponent}) => {

    const [
            input,
            setInput
        ] = useState<string | undefined>(editComponent?.type.message),
        onChange = (event: { target: {
            value: React.SetStateAction<string | undefined>;
        }; }) => {

            setInput(event.target.value);

        },
        onSubmit = () => {

            const newEditComponent: Component = structuredClone(editComponent);
            // eslint-disable-next-line no-extra-parens
            (newEditComponent.type as Paragraph).message = String(input);
            setEditComponent(newEditComponent);

        };

    return <>
        <p
            className="mt-4">
            <Chat
                className="mx-2"/>
            Message
        </p>
        <Form.Control
            type="text"
            onChange={onChange}
            onBlur={onSubmit}
            defaultValue={input}
            maxLength={50} />
    </>;

};

export default ParagraphMessage;
