import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {Image} from "react-bootstrap-icons";
import ImageSelector from "../ImageSelector";
import {View} from "../../../../types/View";

const PageIcon: FC<{
    view: View,
    setView: Dispatch<SetStateAction<View | undefined>>,
}> = ({view, setView}) => {

    const [
            input,
            setInput
        // eslint-disable-next-line no-extra-parens
        ] = useState<string>(view.icon),
        onSubmit = () => {

            const newView: View = structuredClone(view);
            if (newView) {

                newView.icon = input;
                newView.isSaved = false;
                setView(newView);

            }

        };

    useEffect(
        () => {

            // eslint-disable-next-line no-extra-parens
            if (view.icon !== input) {

                onSubmit();

            }

        },
        [input]
    );

    return <>
        <p>
            <Image
                className="mx-2"/>
            Icon
        </p>
        <div
            className="text-center">
            <img
                src={input}
                alt={`${view.name} icon`}
                referrerPolicy="no-referrer"
                className="rounded mb-2"
                height={200}
                width={200} />
        </div>
        <ImageSelector setInput={setInput}/>
    </>;

};

export default PageIcon;
