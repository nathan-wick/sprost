import React, {Dispatch, FC, SetStateAction} from "react";
import PageSettings from "./PageSettings";
import {View} from "../../types/View";

const ViewSettings: FC<{
    editView: View,
    setEditView: Dispatch<SetStateAction<View | "undefined">>
}> = ({editView, setEditView}) => <>
    {
        editView.type === "page" &&
            <PageSettings editView={editView} setEditView={setEditView} />
    }
</>;

export default ViewSettings;
