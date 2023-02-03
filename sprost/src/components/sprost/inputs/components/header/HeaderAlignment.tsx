import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {Component} from "../../../../../types/Component";
import {Form} from "react-bootstrap";
import {Header} from "../../../../../types/components/Header";
import {ListNested} from "react-bootstrap-icons";

const HeaderAlignment: FC<{
    editComponent: Component,
    setEditComponent: Dispatch<SetStateAction<Component | undefined>>,
}> = ({editComponent, setEditComponent}) => {

    const [
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

            const newEditComponent: Component = structuredClone(editComponent);
            // eslint-disable-next-line no-extra-parens
            (newEditComponent.type as Header).alignment = input;
            setEditComponent(newEditComponent);

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
                    key={`${editComponent.id}-header-alignment-option-${alignmentOption.value}`}
                    value={alignmentOption.value}>
                    {alignmentOption.text}
                </option>)
            }
        </Form.Select>
    </>;

};

export default HeaderAlignment;
