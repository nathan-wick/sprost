import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {AspectRatio} from "react-bootstrap-icons";
import {Component} from "../../../../../types/Component";
import {Form} from "react-bootstrap";
import {Header} from "../../../../../types/components/Header";

const HeaderSize: FC<{
    editComponent: Component,
    setEditComponent: Dispatch<SetStateAction<Component | undefined>>,
}> = ({editComponent, setEditComponent}) => {

    const [
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

            const newEditComponent: Component = structuredClone(editComponent);
            // eslint-disable-next-line no-extra-parens
            (newEditComponent.type as Header).size = input;
            setEditComponent(newEditComponent);

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
                    key={`${editComponent.id}-header-size-option-${sizeOption.value}`}
                    value={sizeOption.value}>
                    {sizeOption.text}
                </option>)
            }
        </Form.Select>
    </>;

};

export default HeaderSize;
