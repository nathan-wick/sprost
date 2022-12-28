import {ArrowDown, ArrowUp, AspectRatio, CardHeading, Chat, Trash} from "react-bootstrap-icons";
import {Button, ButtonGroup, Col, Form, Row} from "react-bootstrap";
import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {Title as TitleType} from "../../../types/components/Title";
import {View} from "../../../types/View";
import deleteComponent from "../../../utilities/deleteComponent";
import moveComponent from "../../../utilities/moveComponent";

const Title: FC<{
    componentId: string,
    editView: View | undefined,
    setEditView: Dispatch<SetStateAction<View | undefined>>,
}> = ({componentId, editView, setEditView}) => {

    const editComponent = editView?.components.find((component) => component.id === componentId),
        [
            messageInput,
            setMessageInput
        ] = useState<string | undefined>(editComponent?.type.message),
        [
            sizeInput,
            setSizeInput
        // eslint-disable-next-line no-extra-parens
        ] = useState<"small" | "medium" | "large">((editComponent?.type as TitleType).size),
        onMessageChange = (event: { target: {
            value: React.SetStateAction<string | undefined>;
        }; }) => {

            setMessageInput(event.target.value);

        },
        onSizeChange = (event: { target: { value: string } }) => {

            let newSizeInput: "small" | "medium" | "large" = "medium";
            switch (event.target.value) {

            case "large":
                newSizeInput = "large";
                break;
            case "small":
                newSizeInput = "small";
                break;
            case "medium":
            default:
                newSizeInput = "medium";
                break;

            }
            setSizeInput(newSizeInput);

        },
        onSubmit = () => {

            const newTitle: TitleType = {
                "id": "title",
                "message": String(messageInput),
                "size": sizeInput
                    ? sizeInput
                    : "medium"
            },
                newView: View = structuredClone(editView);
            if (newView) {

                const newComponent =
                    newView.components.find((component) => component.id === componentId);
                if (newComponent) {

                    newComponent.type = newTitle;
                    newView.isSaved = false;
                    setEditView(newView);

                }

            }

        },
        sizeOptions = [
            {
                "text": "Large",
                "value": "large"
            },
            {
                "text": "Medium",
                "value": "medium"
            },
            {
                "text": "Small",
                "value": "small"
            }
        ];

    return <Form
        className="mx-2 mt-4 p-2 rounded shadow"
        onSubmit={(event) => event.preventDefault()}>
        <Row
            className="gx-0">
            <Col
                md={6}
                sm={12}>
                <h3>
                    <CardHeading
                        className="mx-2"/>
                    Title
                </h3>
            </Col>
            <Col
                className="text-end">
                <ButtonGroup>
                    <Button
                        variant="outline-primary"
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
                        variant="outline-primary"
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
                    <Button
                        variant="outline-danger"
                        onClick={() => setEditView(deleteComponent(
                            editView,
                            componentId
                        ))}>
                        <Trash
                            className="mx-2"/>
                    </Button>
                </ButtonGroup>
            </Col>
        </Row>
        <Form.Label
            className="mt-2">
            <Chat
                className="mx-2"/>
            Message
        </Form.Label>
        <Form.Control
            type="text"
            onChange={onMessageChange}
            onBlur={onSubmit}
            defaultValue={messageInput}
            maxLength={50} />
        <Form.Label
            className="mt-2">
            <AspectRatio
                className="mx-2" />
            Size
        </Form.Label>
        <Form.Select
            onChange={onSizeChange}
            onBlur={onSubmit}
            defaultValue={sizeInput}>
            {
                sizeOptions.map((sizeOption) => <option
                    key={sizeOption.value}
                    value={sizeOption.value}>
                    {sizeOption.text}
                </option>)
            }
        </Form.Select>
    </Form>;

};

export default Title;
