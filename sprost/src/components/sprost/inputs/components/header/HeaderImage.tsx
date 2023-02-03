import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {Component} from "../../../../../types/Component";
import {Header} from "../../../../../types/components/Header";
import {Image} from "react-bootstrap-icons";
import ImageSelector from "../../ImageSelector";

const HeaderImage: FC<{
    editComponent: Component,
    setEditComponent: Dispatch<SetStateAction<Component | undefined>>,
}> = ({editComponent, setEditComponent}) => {

    const [
            input,
            setInput
        // eslint-disable-next-line no-extra-parens
        ] = useState<string>((editComponent?.type as Header).image ?? "undefined"),
        onSubmit = () => {

            const newEditComponent: Component = structuredClone(editComponent);
            // eslint-disable-next-line no-extra-parens
            (newEditComponent.type as Header).image = input;
            setEditComponent(newEditComponent);

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
