import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {AspectRatio} from "react-bootstrap-icons";
import {Component} from "../../../../../types/Component";
import {Form} from "react-bootstrap";
import {Header} from "../../../../../types/components/Header";
import {View} from "../../../../../types/View";

const HeaderSize: FC<{
    componentId: string,
    editView: View,
    setEditView: Dispatch<SetStateAction<View | "undefined">>,
}> = ({componentId, editView, setEditView}) => {

    const editComponent = editView?.components.find((component) => component.id === componentId),
        [
            input,
            setInput
        // eslint-disable-next-line no-extra-parens
        ] = useState<"small" | "medium" | "large">((editComponent?.type as Header).size),
        onChange = (event: { target: { value: string } }) => {

            let newInput: "small" | "medium" | "large" = "medium";
            switch (event.target.value) {

            case "large":
                newInput = "large";
                break;
            case "small":
                newInput = "small";
                break;
            case "medium":
            default:
                newInput = "medium";
                break;

            }
            setInput(newInput);

        },
        onSubmit = () => {

            const newHeader: Pick<Header, "size"> = {
                "size": input
            },
                newView: View = structuredClone(editView);
            if (newView) {

                const newComponent: Component | undefined = newView.components.find((component: {
                        id: string; }) => component.id === componentId);
                if (newComponent) {

                    newComponent.type = {
                        ...newComponent.type as Header,
                        ...newHeader
                    };
                    newView.isSaved = false;
                    setEditView(newView);

                }

            }

        },
        sizeOptions = [
            {
                "text": "Large",
                "value": "large"
            },
            {
                "text": "Medium",
                "value": "medium"
            },
            {
                "text": "Small",
                "value": "small"
            }
        ];

    return <>
        <p
            className="mt-4">
            <AspectRatio
                className="mx-2" />
            Size
        </p>
        <Form.Select
            onChange={onChange}
            onBlur={onSubmit}
            defaultValue={input}>
            {
                sizeOptions.map((sizeOption) => <option
                    key={sizeOption.value}
                    value={sizeOption.value}>
                    {sizeOption.text}
                </option>)
            }
        </Form.Select>
    </>;

};

export default HeaderSize;
