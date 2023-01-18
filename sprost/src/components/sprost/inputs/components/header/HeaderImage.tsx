import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {Component} from "../../../../../types/Component";
import {Header} from "../../../../../types/components/Header";
import {Image} from "react-bootstrap-icons";
import ImageSelector from "../../ImageSelector";
import {View} from "../../../../../types/View";

const HeaderImage: FC<{
    componentId: string,
    editView: View,
    setEditView: Dispatch<SetStateAction<View | "undefined">>,
}> = ({componentId, editView, setEditView}) => {

    const editComponent = editView?.components.find((component) => component.id === componentId),
        [
            input,
            setInput
        // eslint-disable-next-line no-extra-parens
        ] = useState<string>((editComponent?.type as Header).image ?? "undefined"),
        onSubmit = () => {

            const newImage: Pick<Header, "image"> = {
                "image": input
            },
                newView: View = structuredClone(editView);
            if (newView) {

                const newComponent: Component | undefined = newView.components.find((component: {
                        id: string; }) => component.id === componentId);
                if (newComponent) {

                    newComponent.type = {
                        ...newComponent.type as Header,
                        ...newImage
                    };
                    newView.isSaved = false;
                    setEditView(newView);

                }

            }

        };

    useEffect(
        () => {

            // eslint-disable-next-line no-extra-parens
            if ((editComponent?.type as Header).image !== input) {

                onSubmit();

            }

        },
        [input]
    );

    return <>
        <p
            className="mt-4">
            <Image
                className="mx-2"/>
            Image
        </p>
        <ImageSelector setInput={setInput}/>
    </>;

};

export default HeaderImage;
