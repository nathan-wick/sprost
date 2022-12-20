import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Button, ButtonGroup, Col, Form, Row } from "react-bootstrap";
import { ArrowDown, ArrowUp, CardText, Chat, Trash } from "react-bootstrap-icons";
import { Paragraph as ParagraphType } from "../../../types/components/Paragraph";
import { View } from "../../../types/View";

const Paragraph: FC<{
	componentId: string,
	editView: View | undefined,
	setEditView: Dispatch<SetStateAction<View | undefined>>,
}> = ({
	componentId,
	editView,
	setEditView,
}) => {
	const editComponent = editView?.components.find(component => component.id === componentId);
	const [ messageInput, setMessageInput ] = useState<string | undefined>(editComponent?.type.message);
	const onMessageChange = (event: { target: { value: React.SetStateAction<string | undefined>; }; }) => {
		setMessageInput(event.target.value);
	};
	const onSubmit = () => {
		const newParagraph: ParagraphType = {
			id: "paragraph",
			message: String(messageInput),
		};
		const newView: View = structuredClone(editView);
		const newComponent = newView.components.find(component => component.id === componentId);
		if (newComponent) {
			newComponent.type = newParagraph;
			newView.isSaved = false;
			setEditView(newView);
		}
	};
	const moveComponent = (move: "up" | "down") => {
		const newView: View = structuredClone(editView);
		const newComponent = newView.components.find(component => component.id === componentId);
		if (newComponent) {
			const oldComponentIndex = newView.components.indexOf(newComponent);
			const newComponentIndex = move === "up" ? oldComponentIndex - 1 : oldComponentIndex + 1;
			newView.components.splice(newComponentIndex, 0, newView.components.splice(oldComponentIndex, 1)[0]);
			newView.isSaved = false;
			setEditView(newView);
			console.log(move, newView.components);
		}
	};
	const deleteComponent = () => {
		const newView: View = structuredClone(editView);
		const componentToDelete = newView.components.find(component => component.id === componentId);
		if (componentToDelete) {
			const componentToDeleteIndex = newView.components.indexOf(componentToDelete);
			newView.components.splice(componentToDeleteIndex, 1);
			newView.isSaved = false;
			setEditView(newView);
			console.log(newView.components);
		}
	};
	
	return <Form
		className="mx-2 mt-4 p-2 rounded shadow"
		onSubmit={event => event.preventDefault()}>
		<Row
			className="gx-0">
			<Col
				md={6}
				sm={12}>
				<h3>
					<CardText
						className="mx-2"/>
                    Paragraph
				</h3>
			</Col>
			<Col
				className="text-end">
				<ButtonGroup>
					<Button
						variant="outline-primary"
						onClick={() => moveComponent("up")}
						disabled={editComponent ? editView?.components.indexOf(editComponent) === 0 : true}>
						<ArrowUp 
							className="mx-2"/>
					</Button>
					<Button
						variant="outline-primary"
						onClick={() => moveComponent("down")}
						disabled={editComponent && editView ? editView.components.indexOf(editComponent) === (editView.components.length ??= 1) - 1 : true}>
						<ArrowDown 
							className="mx-2"/>
					</Button>
					<Button
						variant="outline-danger"
						onClick={deleteComponent}>
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
			as="textarea"
			rows={3}
			onChange={onMessageChange}
			onBlur={onSubmit}
			defaultValue={messageInput}
			maxLength={500} />
	</Form>;
};

export default Paragraph;