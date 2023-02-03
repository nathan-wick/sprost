import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {Component} from "../../../../../types/Component";
import {Form} from "react-bootstrap";
import {Header} from "../../../../../types/components/Header";
import {Tree} from "react-bootstrap-icons";

const HeaderBackground: FC<{
    editComponent: Component,
    setEditComponent: Dispatch<SetStateAction<Component | undefined>>,
}> = ({editComponent, setEditComponent}) => {

    const [
            input,
            setInput
        // eslint-disable-next-line no-extra-parens
        ] = useState<"color" | "image">((editComponent?.type as Header).background),
        onChange = (event: { target: { value: string } }) => {

            let newInput: "color" | "image" = "color";
            switch (event.target.value) {

            case "image":
                newInput = "image";
                break;
            case "color":
            default:
                newInput = "color";
                break;

            }
            setInput(newInput);

        },
        onSubmit = () => {

            const newEditComponent: Component = structuredClone(editComponent);
            // eslint-disable-next-line no-extra-parens
            (newEditComponent.type as Header).background = input;
            setEditComponent(newEditComponent);

        },
        backgroundOptions = [
            {
                "text": "Color",
                "value": "color"
            },
            {
                "text": "Image",
                "value": "image"
            }
        ];

    return <>
        <p
            className="mt-4">
            <Tree
                className="mx-2" />
            Background
        </p>
        <Form.Select
            onChange={onChange}
            onBlur={onSubmit}
            defaultValue={input}>
            {
                backgroundOptions.map((backgroundOption) => <option
                    key={`${editComponent.id}-header-background-option-${backgroundOption.value}`}
                    value={backgroundOption.value}>
                    {backgroundOption.text}
                </option>)
            }
        </Form.Select>
    </>;

};

export default HeaderBackground;
