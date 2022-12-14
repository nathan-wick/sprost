import React, { Dispatch, FC, SetStateAction, useContext, useState } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { ColumnsGap, PlusCircle } from "react-bootstrap-icons";
import { Component } from "../../../types/Component";
import { Header } from "../../../types/components/Header";
import { Paragraph } from "../../../types/components/Paragraph";
import { Title } from "../../../types/components/Title";
import { View } from "../../../types/View";
import { UserContext } from "../../User";

const NewComponent: FC<{
	editView: View | undefined,
	setEditView: Dispatch<SetStateAction<View | undefined>>,
}> = ({
	editView,
	setEditView,
}) => {
	const user = useContext(UserContext);
	const [ modal, setModal ] = useState<boolean>(false);
	const [ typeInput, setTypeInput ] = useState<string>("header");
	const [ isLoading, setIsLoading ] = useState<boolean>(false);
	const showModal = () => setModal(true);
	const hideModal = () => reset();

	const defaultHeader: Header ={
		id: "header",
		text: "New Header",
	};

	const defaultTitle: Title ={
		id: "title",
		text: "New Title",
		size: "medium",
	};

	const defaultParagraph: Paragraph ={
		id: "paragraph",
		text: "New Paragraph",
	};

	const typeOptions = [
		{
			value: "header",
			text: "Header",
		},
		{
			value: "title",
			text: "Title",
		},
		{
			value: "paragraph",
			text: "Paragraph",
		},
	];

	const onTypeChange = (event: { target: { value: string; }; }) => {
		setTypeInput(event.target.value);
	};

	const reset = () => {
		setTypeInput("header");
		setIsLoading(false);
		setModal(false);
	};

	const onSubmit = (event: { preventDefault: () => void; }) => {
		setIsLoading(true);
		event.preventDefault();
		if (editView) {
			let componentType: Header | Title | Paragraph;
			switch(typeInput) {
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
			const newComponent: Component = {
				type: componentType,
			};
			const newView = structuredClone(editView);
			newView.version = newView.version + 1;
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
							className={user?.theme.name === "dark" ? "bg-black text-light" : "bg-white text-dark"}
							onChange={onTypeChange}
							value={typeInput}>
							{
								typeOptions.map(typeOption =>
									<option
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
						isLoading ?
							<>Loading...</> :
							<>Create Component</>
					}
				</Button>
			</Modal.Footer>
		</Modal>
	</>;
};

export default NewComponent;