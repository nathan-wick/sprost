import {ArrowDown, ArrowUp, CardHeading, CardImage, CardText, ThreeDots,
    Trash} from "react-bootstrap-icons";
import {Button, ButtonGroup, Col, Row} from "react-bootstrap";
import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {Component} from "../../../types/Component";
import HeaderAlignment from "./../inputs/components/header/HeaderAlignment";
import HeaderBackground from "./../inputs/components/header/HeaderBackground";
import HeaderImage from "./../inputs/components/header/HeaderImage";
import HeaderMessage from "./../inputs/components/header/HeaderMessage";
import HeaderSize from "./../inputs/components/header/HeaderSize";
import ParagraphMessage from "./../inputs/components/paragraph/ParagraphMessage";
import TitleMessage from "./../inputs/components/title/TitleMessage";
import TitleSize from "./../inputs/components/title/TitleSize";
import deleteElement from "../../../utilities/deleteElement";
import moveElement from "../../../utilities/moveElement";
import setComponent from "../../../utilities/setComponent";

const ComponentEditor: FC<{
    componentId: string,
    editViewComponents: Component[],
    setEditViewComponents: Dispatch<SetStateAction<Component[]>>,
}> = ({componentId, editViewComponents, setEditViewComponents}) => {

    const [
            editComponent,
            setEditComponent
        ] = useState<Component | undefined>(editViewComponents.find((component) => component.id ===
            componentId)),
        [
            showAdvancedInputs,
            setShowAdvancedInputs
        ] = useState<boolean>(false),
        [
            title,
            setTitle
        ] = useState<JSX.Element>(<></>),
        [
            inputs,
            setInputs
        ] = useState<JSX.Element[]>([]),
        [
            advancedInputs,
            setAdvancedInputs
        ] = useState<JSX.Element[]>([]);

    useEffect(
        () => {

            switch (editComponent?.type.id) {

            case "header":
                setTitle(<>
                    <CardImage
                        className="mx-2"/>
                    Header
                </>);
                setInputs([
                    <HeaderMessage key={`${componentId}-message`} editComponent={editComponent}
                        setEditComponent={setEditComponent} />
                ]);
                setAdvancedInputs([
                    <HeaderSize key={`${componentId}-size`} editComponent={editComponent}
                        setEditComponent={setEditComponent} />,
                    <HeaderAlignment key={`${componentId}-alignment`} editComponent={editComponent}
                        setEditComponent={setEditComponent} />,
                    <HeaderBackground key={`${componentId}-background`}
                        editComponent={editComponent} setEditComponent={setEditComponent} />,
                    <div
                        key={`${componentId}-image`}>
                        {
                            editComponent.type.background === "image" &&
                                <HeaderImage editComponent={editComponent}
                                    setEditComponent={setEditComponent} />
                        }
                    </div>
                ]);
                break;
            case "title":
                setTitle(<>
                    <CardHeading
                        className="mx-2"/>
                    Title
                </>);
                setInputs([
                    <TitleMessage key={`${componentId}-message`} editComponent={editComponent}
                        setEditComponent={setEditComponent} />
                ]);
                setAdvancedInputs([
                    <TitleSize key={`${componentId}-size`} editComponent={editComponent}
                        setEditComponent={setEditComponent} />
                ]);
                break;
            case "paragraph":
            default:
                if (editComponent) {

                    setTitle(<>
                        <CardText
                            className="mx-2"/>
                        Paragraph
                    </>);
                    setInputs([
                        <ParagraphMessage key={`${componentId}-message`}
                            editComponent={editComponent} setEditComponent={setEditComponent} />
                    ]);

                }

            }
            if (editComponent && editComponent !==
                editViewComponents.find((component) => component.id === componentId)) {

                const newEditViewComponents: Component[] = setComponent(
                    editViewComponents,
                    editComponent
                );
                setEditViewComponents(newEditViewComponents);

            }

        },
        [editComponent]
    );

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
            {
                editComponent &&
                    <Col
                        className="text-end">
                        {
                            advancedInputs.length > 0 && <Button
                                variant="outline-primary"
                                className="mx-1"
                                onClick={() => setShowAdvancedInputs(!showAdvancedInputs)}>
                                <ThreeDots
                                    className="mx-2"/>
                            </Button>
                        }
                        <ButtonGroup
                            className="mx-1">
                            {
                                editViewComponents.indexOf(editComponent) !== 0 &&
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => {

                                            const newEditViewComponents =
                                                structuredClone(editViewComponents);
                                            setEditViewComponents(moveElement(
                                                newEditViewComponents,
                                                newEditViewComponents.indexOf(editComponent),
                                                "up"
                                            ));

                                        }}>
                                        <ArrowUp
                                            className="mx-2"/>
                                    </Button>
                            }
                            {
                                editViewComponents.indexOf(editComponent) !==
                                    (editViewComponents.length ??= 1) - 1 &&
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => {

                                            const newEditViewComponents =
                                                structuredClone(editViewComponents);
                                            setEditViewComponents(moveElement(
                                                newEditViewComponents,
                                                newEditViewComponents.indexOf(editComponent),
                                                "down"
                                            ));

                                        }}>
                                        <ArrowDown
                                            className="mx-2"/>
                                    </Button>
                            }
                        </ButtonGroup>
                        <Button
                            variant="outline-danger"
                            className="mx-1"
                            onClick={() => {

                                const newEditViewComponents = structuredClone(editViewComponents);
                                setEditViewComponents(deleteElement(
                                    newEditViewComponents,
                                    newEditViewComponents.indexOf(editComponent)
                                ));

                            }}>
                            <Trash
                                className="mx-2"/>
                        </Button>
                    </Col>
            }
        </Row>
        {inputs}
        {
            showAdvancedInputs && advancedInputs
        }
    </div>;

};

export default ComponentEditor;
