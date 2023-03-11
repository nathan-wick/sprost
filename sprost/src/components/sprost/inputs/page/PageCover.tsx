import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {Image} from "react-bootstrap-icons";
import ImageSelector from "../ImageSelector";
import {View} from "../../../../types/View";

const PageCover: FC<{
    view: View,
    setView: Dispatch<SetStateAction<View | undefined>>,
}> = ({view, setView}) => {

    const [
            input,
            setInput
        // eslint-disable-next-line no-extra-parens
        ] = useState<string>(view.cover),
        onSubmit = () => {

            const newView: View = structuredClone(view);
            if (newView) {

                newView.cover = input;
                newView.isSaved = false;
                setView(newView);

            }

        };

    useEffect(
        () => {

            // eslint-disable-next-line no-extra-parens
            if (view.cover !== input) {

                onSubmit();

            }

        },
        [input]
    );

    return <>
        <p>
            <Image
                className="mx-2"/>
            Cover
        </p>
        <div
            className="text-center">
            <img
                src={input}
                alt={`${view.name} cover`}
                referrerPolicy="no-referrer"
                className="rounded mb-2"
                height={200}
                width="100%" />
        </div>
        <ImageSelector setInput={setInput}/>
    </>;

};

export default PageCover;
