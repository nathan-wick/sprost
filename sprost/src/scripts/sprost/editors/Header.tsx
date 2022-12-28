import {ArrowDown, ArrowUp, CardImage, Chat, Trash} from "react-bootstrap-icons";
import {Button, ButtonGroup, Col, Form, Row} from "react-bootstrap";
import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {Header as HeaderType} from "../../../types/components/Header";
import {View} from "../../../types/View";
import deleteComponent from "../../../utilities/deleteComponent";
import moveComponent from "../../../utilities/moveComponent";

const Header: FC<{
    componentId: string,
    editView: View | undefined,
    setEditView: Dispatch<SetStateAction<View | undefined>>,
}> = ({componentId, editView, setEditView}) => {

    const editComponent = editView?.components.find((component) => component.id === componentId),
        [
            messageInput,
            setMessageInput
        ] = useState<string | undefined>(editComponent?.type.message),
        onMessageChange = (event: { target: {
            value: React.SetStateAction<string | undefined>;
        }; }) => {

            setMessageInput(event.target.value);

        },
        onSubmit = () => {

            const newHeader: HeaderType = {
                "id": "header",
                "message": String(messageInput)
            },
                newView: View = structuredClone(editView);
            if (newView) {

                const newComponent =
                    newView.components.find((component) => component.id === componentId);
                if (newComponent) {

                    newComponent.type = newHeader;
                    newView.isSaved = false;
                    setEditView(newView);

                }

            }

        };

    return <Form
        className="mx-2 mt-4 p-2 rounded shadow"
        onSubmit={(event) => event.preventDefault()}>
        <Row
            className="gx-0">
            <Col
                md={6}
                sm={12}>
                <h3>
                    <CardImage
                        className="mx-2"/>
                    Header
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
    </Form>;

};

export default Header;
