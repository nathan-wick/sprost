import {Button, Form, FormGroup, Modal} from "react-bootstrap";
import {ColumnsGap, PlusCircle} from "react-bootstrap-icons";
import React, {Dispatch, FC, SetStateAction, useContext, useState} from "react";
import {Component} from "../../../types/Component";
import {Header} from "../../../types/components/Header";
import {Paragraph} from "../../../types/components/Paragraph";
import {Title} from "../../../types/components/Title";
import {UserContext} from "../../User";
import {View} from "../../../types/View";
import createUniqueString from "../../../utilities/createUniqueString";

const NewComponent: FC<{
    editView: View | undefined,
    setEditView: Dispatch<SetStateAction<View | undefined>>,
}> = ({editView, setEditView}) => {

    const user = useContext(UserContext),
        [
            modal,
            setModal
        ] = useState<boolean>(false),
        [
            typeInput,
            setTypeInput
        ] = useState<string>("header"),
        [
            isLoading,
            setIsLoading
        ] = useState<boolean>(false),
        defaultHeader: Header = {
            "id": "header",
            "message": "New Header"
        },
        defaultTitle: Title = {
            "id": "title",
            "message": "New Title",
            "size": "medium"
        },
        defaultParagraph: Paragraph = {
            "id": "paragraph",
            "message": "New Paragraph"
        },
        typeOptions = [
            {
                "text": "Header",
                "value": "header"
            },
            {
                "text": "Title",
                "value": "title"
            },
            {
                "text": "Paragraph",
                "value": "paragraph"
            }
        ],
        onTypeChange = (event: { target: { value: string; }; }) => {

            setTypeInput(event.target.value);

        },
        reset = () => {

            setTypeInput("header");
            setIsLoading(false);
            setModal(false);

        },
        showModal = () => setModal(true),
        hideModal = () => reset(),
        onSubmit = (event: { preventDefault: () => void; }) => {

            setIsLoading(true);
            event.preventDefault();
            if (editView) {

                let componentType: Header | Title | Paragraph = defaultParagraph;
                switch (typeInput) {

                case "header":
                    componentType = defaultHeader;
                    break;
                case "title":
                    componentType = defaultTitle;
                    break;
                case "paragraph":
                default:
                    componentType = defaultParagraph;
                    break;

                }
                const uniqueId = createUniqueString(editView.components.map(({id}) => id)),
                    newComponent: Component = {
                        "id": uniqueId,
                        "type": componentType
                    },
                    newView = structuredClone(editView);
                newView.isSaved = false;
                newView.components.push(newComponent);
                setEditView(newView);

            }
            hideModal();

        };

    return <>
        <Button
            variant="primary"
            className="w-100 shadow"
            onClick={showModal}>
            <PlusCircle
                className="mx-2" />
            New Component
        </Button>

        <Modal
            show={modal}
            onHide={hideModal}
            className="text-dark">
            <Modal.Header
                className="bg-primary bg-gradient text-white">
                <Modal.Title>
                    <PlusCircle
                        className="mx-2" />
                    New Component
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup>
                        <Form.Label>
                            <ColumnsGap
                                className="mx-2" />
                            Component Type
                        </Form.Label>
                        <Form.Select
                            className={user?.theme.name === "dark"
                                ? "bg-black text-light"
                                : "bg-white text-dark"}
                            onChange={onTypeChange}
                            value={typeInput}>
                            {
                                typeOptions.map((typeOption) => <option
                                    key={typeOption.text}
                                    value={typeOption.value}>
                                    {typeOption.text}
                                </option>)
                            }
                        </Form.Select>
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="outline-secondary"
                    className="m-2"
                    onClick={hideModal}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    className="m-2"
                    disabled={isLoading}
                    onClick={onSubmit}>
                    {
                        isLoading
                            ? <>Loading...</>
                            : <>Create Component</>
                    }
                </Button>
            </Modal.Footer>
        </Modal>
    </>;

};

export default NewComponent;
