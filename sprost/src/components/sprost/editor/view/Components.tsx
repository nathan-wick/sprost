import {Col, Row} from "react-bootstrap";
import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {ColumnsGap} from "react-bootstrap-icons";
import {Component} from "../../../../types/Component";
import ComponentEditor from "./ComponentEditor";
import NewComponent from "../../modals/NewComponent";
import {View} from "../../../../types/View";

const ViewComponents: FC<{
    view: View,
    setView: Dispatch<SetStateAction<View | undefined>>,
    componentsRef: React.MutableRefObject<HTMLHeadingElement | null>
}> = ({view, setView, componentsRef}) => {

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
        <h1
            ref={componentsRef}
            className="mt-4">
            <ColumnsGap
                className="mx-2" />
            Components
        </h1>
        <div
            className="m-4">
            <Row
                className="gx-0">
                <Col
                    className="p-2">
                    <NewComponent editViewComponents={viewComponents}
                        setEditViewComponents={setViewComponents} />
                </Col>
            </Row>
            {
                viewComponents.map((component) => <ComponentEditor
                    key={`${component.id}-editor`}
                    componentId={component.id}
                    editViewComponents={viewComponents}
                    setEditViewComponents={setViewComponents}/>)
            }
        </div>
    </>;

};

export default ViewComponents;
