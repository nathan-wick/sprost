import {ArrowDown, ArrowUp, CardHeading, CardImage, CardText, ThreeDots,
    Trash} from "react-bootstrap-icons";
import {Button, ButtonGroup, Col, Row} from "react-bootstrap";
import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {Component} from "../../../../types/Component";
import HeaderAlignment from "../../inputs/components/header/HeaderAlignment";
import HeaderBackground from "../../inputs/components/header/HeaderBackground";
import HeaderImage from "../../inputs/components/header/HeaderImage";
import HeaderMessage from "../../inputs/components/header/HeaderMessage";
import HeaderSize from "../../inputs/components/header/HeaderSize";
import ParagraphMessage from "../../inputs/components/paragraph/ParagraphMessage";
import TitleMessage from "../../inputs/components/title/TitleMessage";
import TitleSize from "../../inputs/components/title/TitleSize";
import deleteElement from "../../../../utilities/deleteElement";
import moveElement from "../../../../utilities/moveElement";
import setComponent from "../../../../utilities/setComponent";

const ComponentEditor: FC<{
    component: Component,
    viewComponents: Component[],
    setViewComponents: Dispatch<SetStateAction<Component[]>>,
}> = ({component, viewComponents, setViewComponents}) => {

    const [
            editComponent,
            setEditComponent
        ] = useState<Component | undefined>(viewComponents.find((viewComponent) => component.id ===
            viewComponent.id)),
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
                    <HeaderMessage
                        key={editComponent.type.message}
                        editComponent={editComponent}
                        setEditComponent={setEditComponent} />
                ]);
                setAdvancedInputs([
                    <HeaderSize
                        key={editComponent.type.size}
                        editComponent={editComponent}
                        setEditComponent={setEditComponent} />,
                    <HeaderAlignment
                        key={editComponent.type.alignment}
                        editComponent={editComponent}
                        setEditComponent={setEditComponent} />,
                    <HeaderBackground
                        key={editComponent.type.background}
                        editComponent={editComponent}
                        setEditComponent={setEditComponent} />,
                    <div
                        key={editComponent.type.image}>
                        {
                            editComponent.type.background === "image" &&
                                <HeaderImage
                                    editComponent={editComponent}
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
                    <TitleMessage
                        key={editComponent.type.message}
                        editComponent={editComponent}
                        setEditComponent={setEditComponent} />
                ]);
                setAdvancedInputs([
                    <TitleSize
                        key={editComponent.type.size}
                        editComponent={editComponent}
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
                        <ParagraphMessage
                            key={editComponent.type.message}
                            editComponent={editComponent}
                            setEditComponent={setEditComponent} />
                    ]);

                }

            }
            if (editComponent && editComponent !==
                viewComponents.find((viewComponent) => viewComponent.id === component.id)) {

                const newViewComponents: Component[] = setComponent(
                    viewComponents,
                    editComponent
                );
                setViewComponents(newViewComponents);

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
                                variant="primary"
                                className="mx-1 bg-gradient text-white shadow"
                                onClick={() => setShowAdvancedInputs(!showAdvancedInputs)}>
                                <ThreeDots
                                    className="mx-2"/>
                            </Button>
                        }
                        <ButtonGroup
                            className="mx-1 shadow">
                            {
                                viewComponents.indexOf(editComponent) !== 0 &&
                                    <Button
                                        variant="primary"
                                        className="bg-gradient text-white"
                                        onClick={() => {

                                            const newEditViewComponents =
                                                structuredClone(viewComponents);
                                            setViewComponents(moveElement(
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
                                viewComponents.indexOf(editComponent) !==
                                    (viewComponents.length ??= 1) - 1 &&
                                    <Button
                                        variant="primary"
                                        className="bg-gradient text-white"
                                        onClick={() => {

                                            const newEditViewComponents =
                                                structuredClone(viewComponents);
                                            setViewComponents(moveElement(
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
                            variant="danger"
                            className="mx-1 bg-gradient text-white shadow"
                            onClick={() => {

                                const newEditViewComponents = structuredClone(viewComponents);
                                setViewComponents(deleteElement(
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
