import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {Image} from "react-bootstrap-icons";
import ImageSelector from "../ImageSelector";
import {View} from "../../../../types/View";

const PageIcon: FC<{
    editView: View,
    setEditView: Dispatch<SetStateAction<View | "undefined">>,
}> = ({editView, setEditView}) => {

    const [
            input,
            setInput
        // eslint-disable-next-line no-extra-parens
        ] = useState<string>(editView.icon),
        onSubmit = () => {

            const newView: View = structuredClone(editView);
            if (newView) {

                newView.icon = input;
                newView.isSaved = false;
                setEditView(newView);

            }

        };

    useEffect(
        () => {

            // eslint-disable-next-line no-extra-parens
            if (editView.icon !== input) {

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
            Icon
        </p>
        <ImageSelector setInput={setInput}/>
    </>;

};

export default PageIcon;
