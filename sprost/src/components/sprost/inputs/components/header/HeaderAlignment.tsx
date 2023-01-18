import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {Component} from "../../../../../types/Component";
import {Form} from "react-bootstrap";
import {Header} from "../../../../../types/components/Header";
import {ListNested} from "react-bootstrap-icons";
import {View} from "../../../../../types/View";

const HeaderAlignment: FC<{
    componentId: string,
    editView: View,
    setEditView: Dispatch<SetStateAction<View | "undefined">>,
}> = ({componentId, editView, setEditView}) => {

    const editComponent = editView?.components.find((component) => component.id === componentId),
        [
            input,
            setInput
        // eslint-disable-next-line no-extra-parens
        ] = useState<"left" | "center" | "right">((editComponent?.type as Header).alignment),
        onChange = (event: { target: { value: string } }) => {

            let newInput: "left" | "center" | "right" = "left";
            switch (event.target.value) {

            case "right":
                newInput = "right";
                break;
            case "center":
                newInput = "center";
                break;
            case "left":
            default:
                newInput = "left";
                break;

            }
            setInput(newInput);

        },
        onSubmit = () => {

            const newHeader: Pick<Header, "alignment"> = {
                "alignment": input
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
        alignmentOptions = [
            {
                "text": "Left",
                "value": "left"
            },
            {
                "text": "Center",
                "value": "center"
            },
            {
                "text": "Right",
                "value": "right"
            }
        ];

    return <>
        <p
            className="mt-4">
            <ListNested
                className="mx-2" />
            Alignment
        </p>
        <Form.Select
            onChange={onChange}
            onBlur={onSubmit}
            defaultValue={input}>
            {
                alignmentOptions.map((alignmentOption) => <option
                    key={`${componentId}-header-alignment-option-${alignmentOption.value}`}
                    value={alignmentOption.value}>
                    {alignmentOption.text}
                </option>)
            }
        </Form.Select>
    </>;

};

export default HeaderAlignment;
