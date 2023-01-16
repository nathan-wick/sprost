import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {Chat} from "react-bootstrap-icons";
import {Component} from "../../../../../types/Component";
import {Form} from "react-bootstrap";
import {Header} from "../../../../../types/components/Header";
import {View} from "../../../../../types/View";

const HeaderMessage: FC<{
    componentId: string,
    editView: View,
    setEditView: Dispatch<SetStateAction<View | "undefined">>,
}> = ({componentId, editView, setEditView}) => {

    const editComponent = editView?.components.find((component) => component.id === componentId),
        [
            input,
            setInput
        ] = useState<string | undefined>(editComponent?.type.message),
        onChange = (event: { target: {
            value: React.SetStateAction<string | undefined>;
        }; }) => {

            setInput(event.target.value);

        },
        onSubmit = () => {

            const newMessage: Pick<Header, "message"> = {
                "message": String(input)
            },
                newView: View = structuredClone(editView);
            if (newView) {

                const newComponent: Component | undefined = newView.components.find((component: {
                        id: string; }) => component.id === componentId);
                if (newComponent) {

                    newComponent.type = {
                        ...newComponent.type as Header,
                        ...newMessage
                    };
                    newView.isSaved = false;
                    setEditView(newView);

                }

            }

        };

    return <>
        <p
            className="mt-2">
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

export default HeaderMessage;
