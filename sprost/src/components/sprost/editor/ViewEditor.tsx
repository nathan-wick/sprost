import {ColumnsGap, Gear} from "react-bootstrap-icons";
import React, {FC} from "react";
import PageSettings from "./PageSettings";
import {View} from "../../../types/View";
import ViewComponents from "./ViewComponents";

const ViewEditor: FC<{
    view: View | undefined,
    setView: React.Dispatch<React.SetStateAction<View | undefined>>,
    displayPreview: boolean,
    settingsRef: React.MutableRefObject<HTMLHeadingElement | null>,
    componentsRef: React.MutableRefObject<HTMLHeadingElement | null>
}> = ({view, setView, displayPreview, settingsRef, componentsRef}) => <>
    {
        view && !displayPreview && <>
            <h1
                ref={settingsRef}
                className="mt-4">
                <Gear
                    className="mx-2" />
                Settings
            </h1>
            <div
                className="m-2 p-2 rounded shadow">
                {
                    view.type === "page" && <>
                        <PageSettings
                            view={view}
                            setView={setView} />
                    </>
                }
            </div>
            <h1
                ref={componentsRef}
                className="mt-4">
                <ColumnsGap
                    className="mx-2" />
                Components
            </h1>
            <ViewComponents
                view={view}
                setView={setView} />
        </>
    }
</>;

export default ViewEditor;
