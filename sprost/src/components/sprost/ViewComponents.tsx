import {Col, Row} from "react-bootstrap";
import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {Component} from "../../types/Component";
import Editor from "./Editor";
import NewComponent from "./modals/NewComponent";
import {View} from "../../types/View";

const ViewComponents: FC<{
    view: View,
    setView: Dispatch<SetStateAction<View | undefined>>
}> = ({view, setView}) => {

    // eslint-disable-next-line no-warning-comments
    // TODO Improve this by renaming vars and removing isSaved
    const [
        viewComponents,
        setViewComponents
    ] = useState<Component[]>(view.components);

    useEffect(
        () => {

            if (viewComponents !== view.components) {

                const newEditView: View = structuredClone(view);
                newEditView.components = viewComponents;
                newEditView.isSaved = false;
                setView(newEditView);

            }

        },
        [viewComponents]
    );

    return <>
        <Row
            className="gx-0">
            <Col
                className="p-2">
                <NewComponent editViewComponents={viewComponents}
                    setEditViewComponents={setViewComponents} />
            </Col>
        </Row>
        {
            viewComponents.map((component) => <Editor
                key={`${component.id}-editor`}
                componentId={component.id}
                editViewComponents={viewComponents}
                setEditViewComponents={setViewComponents}/>)
        }
    </>;

};

export default ViewComponents;
