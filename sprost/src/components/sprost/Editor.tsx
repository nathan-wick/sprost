import {ArrowDown, ArrowUp, CardHeading, CardImage, CardText, ThreeDots,
    Trash} from "react-bootstrap-icons";
import {Button, ButtonGroup, Col, Row} from "react-bootstrap";
import React, {Dispatch, FC, SetStateAction, useState} from "react";
import HeaderAlignment from "./inputs/components/header/HeaderAlignment";
import HeaderBackground from "./inputs/components/header/HeaderBackground";
import HeaderImage from "./inputs/components/header/HeaderImage";
import HeaderMessage from "./inputs/components/header/HeaderMessage";
import HeaderSize from "./inputs/components/header/HeaderSize";
import ParagraphMessage from "./inputs/components/paragraph/ParagraphMessage";
import TitleMessage from "./inputs/components/title/TitleMessage";
import TitleSize from "./inputs/components/title/TitleSize";
import {View} from "../../types/View";
import deleteComponent from "../../utilities/deleteComponent";
import moveComponent from "../../utilities/moveComponent";

const Editor: FC<{
    componentId: string,
    editView: View,
    setEditView: Dispatch<SetStateAction<View | "undefined">>,
}> = ({componentId, editView, setEditView}) => {

    const editComponent = editView?.components.find((component) => component.id === componentId),
        [
            showAdvancedInputs,
            setShowAdvancedInputs
        ] = useState<boolean>(false);
    let title = <></>,
        inputs: JSX.Element[] = [],
        advancedInputs: JSX.Element[] = [];

    switch (editComponent?.type.id) {

    case "header":
        title = <>
            <CardImage
                className="mx-2"/>
            Header
        </>;
        inputs = [
            <HeaderMessage key={`${componentId}-message`} componentId={componentId}
                editView={editView} setEditView={setEditView} />
        ];
        advancedInputs = [
            <HeaderSize key={`${componentId}-size`} componentId={componentId} editView={editView}
                setEditView={setEditView} />,
            <HeaderAlignment key={`${componentId}-alignment`} componentId={componentId}
                editView={editView} setEditView={setEditView} />,
            <HeaderBackground key={`${componentId}-background`} componentId={componentId}
                editView={editView} setEditView={setEditView} />,
            <div
                key={`${componentId}-image`}>
                {
                    editComponent.type.background === "image" &&
                        <HeaderImage componentId={componentId}
                            editView={editView} setEditView={setEditView} />
                }
            </div>
        ];
        break;
    case "title":
        title = <>
            <CardHeading
                className="mx-2"/>
            Title
        </>;
        inputs = [
            <TitleMessage key={`${componentId}-message`} componentId={componentId}
                editView={editView} setEditView={setEditView} />
        ];
        advancedInputs = [
            <TitleSize key={`${componentId}-size`} componentId={componentId} editView={editView}
                setEditView={setEditView} />
        ];
        break;
    case "paragraph":
    default:
        title = <>
            <CardText
                className="mx-2"/>
            Paragraph
        </>;
        inputs = [
            <ParagraphMessage key={`${componentId}-message`} componentId={componentId}
                editView={editView} setEditView={setEditView} />
        ];
        advancedInputs = [];

    }

    return <div
        className="mx-2 mt-4 p-2 rounded shadow">
        <Row
            className="gx-0">
            <Col
                md={6}
                sm={12}>
                <h3>
                    {title}
                </h3>
            </Col>
            <Col
                className="text-end">
                {
                    advancedInputs.length > 0 && <Button
                        variant="primary"
                        className="mx-1"
                        onClick={() => setShowAdvancedInputs(!showAdvancedInputs)}>
                        <ThreeDots
                            className="mx-2"/>
                    </Button>
                }
                <ButtonGroup
                    className="mx-1">
                    <Button
                        variant="primary"
                        onClick={() => setEditView(moveComponent(
                            editView,
                            componentId,
                            "up"
                        ))}
                        disabled={editComponent
                            ? editView?.components.indexOf(editComponent) === 0
                            : true}>
                        <ArrowUp
                            className="mx-2"/>
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => setEditView(moveComponent(
                            editView,
                            componentId,
                            "down"
                        ))}
                        disabled={editComponent && editView
                            ? editView.components.indexOf(editComponent) ===
                                (editView.components.length ??= 1) - 1
                            : true}>
                        <ArrowDown
                            className="mx-2"/>
                    </Button>
                </ButtonGroup>
                <Button
                    variant="danger"
                    className="mx-1"
                    onClick={() => setEditView(deleteComponent(
                        editView,
                        componentId
                    ))}>
                    <Trash
                        className="mx-2"/>
                </Button>
            </Col>
        </Row>
        {inputs}
        {
            showAdvancedInputs && advancedInputs
        }
    </div>;

};

export default Editor;
