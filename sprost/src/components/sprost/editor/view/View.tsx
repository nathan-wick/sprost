import React, {FC} from "react";
import Components from "./Components";
import PageSettings from "./Settings";
import {View as ViewType} from "../../../../types/View";

const View: FC<{
    view: ViewType | undefined,
    setView: React.Dispatch<React.SetStateAction<ViewType | undefined>>,
    displayPreview: boolean,
    settingsRef: React.MutableRefObject<HTMLHeadingElement | null>,
    componentsRef: React.MutableRefObject<HTMLHeadingElement | null>
}> = ({view, setView, displayPreview, settingsRef, componentsRef}) => <>
    {
        view && !displayPreview && <>
            <PageSettings
                view={view}
                setView={setView}
                settingsRef={settingsRef} />
            <Components
                view={view}
                setView={setView}
                componentsRef={componentsRef} />
        </>
    }
</>;

export default View;
