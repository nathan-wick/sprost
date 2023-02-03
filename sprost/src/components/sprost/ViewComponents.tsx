import {Col, Row} from "react-bootstrap";
import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {Component} from "../../types/Component";
import Editor from "./Editor";
import NewComponent from "./modals/NewComponent";
import {View} from "../../types/View";

const ViewComponents: FC<{
    editView: View,
    setEditView: Dispatch<SetStateAction<View | "undefined">>
}> = ({editView, setEditView}) => {

    const [
        editViewComponents,
        setEditViewComponents
    ] = useState<Component[]>(editView.components);

    useEffect(
        () => {

            if (editViewComponents !== editView.components) {

                const newEditView: View = structuredClone(editView);
                newEditView.components = editViewComponents;
                newEditView.isSaved = false;
                setEditView(newEditView);

            }

        },
        [editViewComponents]
    );

    return <>
        <Row
            className="gx-0">
            <Col
                className="p-2">
                <NewComponent editViewComponents={editViewComponents}
                    setEditViewComponents={setEditViewComponents} />
            </Col>
        </Row>
        {
            editViewComponents.map((component) => <Editor
                key={`${component.id}-editor`}
                componentId={component.id}
                editViewComponents={editViewComponents}
                setEditViewComponents={setEditViewComponents}/>)
        }
    </>;

};

export default ViewComponents;
