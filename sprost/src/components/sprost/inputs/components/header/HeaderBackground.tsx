import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {Component} from "../../../../../types/Component";
import {Form} from "react-bootstrap";
import {Header} from "../../../../../types/components/Header";
import {Tree} from "react-bootstrap-icons";
import {View} from "../../../../../types/View";

const HeaderBackground: FC<{
    componentId: string,
    editView: View,
    setEditView: Dispatch<SetStateAction<View | "undefined">>,
}> = ({componentId, editView, setEditView}) => {

    const editComponent = editView?.components.find((component) => component.id === componentId),
        [
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

            const newHeader: Pick<Header, "background"> = {
                "background": input
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
                    key={backgroundOption.value}
                    value={backgroundOption.value}>
                    {backgroundOption.text}
                </option>)
            }
        </Form.Select>
    </>;

};

export default HeaderBackground;
