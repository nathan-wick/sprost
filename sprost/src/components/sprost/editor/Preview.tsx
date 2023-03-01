import React, {FC} from "react";
import {App} from "../../../types/App";
import {Eye} from "react-bootstrap-icons";
import SharedApp from "../../shared/App";
import {View} from "../../../types/View";

const Preview: FC<{
    app: App | undefined,
    view: View | undefined,
    displayPreview: boolean,
    previewRef: React.MutableRefObject<HTMLHeadingElement | null>
}> = ({app, view, displayPreview, previewRef}) => <>
    {
        displayPreview && <>
            <h1
                ref={previewRef}
                className="mt-4">
                <Eye
                    className="mx-2" />
                Preview
            </h1>
            <div
                className="m-2 rounded shadow h-50 overflow-scroll">
                <SharedApp
                    propsApp={app}
                    propsView={view}/>
            </div>
        </>
    }
</>;

export default Preview;
