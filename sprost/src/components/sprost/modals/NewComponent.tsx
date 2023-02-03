import {Button, Form, FormGroup, Modal} from "react-bootstrap";
import {ColumnsGap, PlusCircle} from "react-bootstrap-icons";
import React, {Dispatch, FC, SetStateAction, useContext, useState} from "react";
import {Component} from "../../../types/Component";
import {Header} from "../../../types/components/Header";
import {Paragraph} from "../../../types/components/Paragraph";
import {Title} from "../../../types/components/Title";
import {ToasterContext} from "../../../contexts/Toaster";
import createUniqueString from "../../../utilities/createUniqueString";
import setComponent from "../../../utilities/setComponent";

const NewComponent: FC<{
    editViewComponents: Component[],
    setEditViewComponents: Dispatch<SetStateAction<Component[]>>,
}> = ({editViewComponents, setEditViewComponents}) => {

    const toaster = useContext(ToasterContext),
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
            "alignment": "left",
            "background": "color",
            "id": "header",
            "image": "undefined",
            "message": "New Header",
            "size": "medium"
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
            const uniqueId = createUniqueString(editViewComponents.map(({id}) => id)),
                newComponent: Component = {
                    "id": uniqueId,
                    "type": componentType
                },
                newEditViewComponents = setComponent(
                    editViewComponents,
                    newComponent
                );
            setEditViewComponents(newEditViewComponents);
            if (toaster !== "undefined") {

                toaster.createToast(
                    "success",
                    "New Component",
                    `Successfully created the ${typeInput} component.`
                );

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
                            onChange={onTypeChange}
                            value={typeInput}>
                            {
                                typeOptions.map((typeOption) => <option
                                    key={`component-type-option-${typeOption.value}`}
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
