import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Form } from "react-bootstrap";
import { CardText, Chat } from "react-bootstrap-icons";
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
	
	return <Form
		className="mx-2 mt-4 p-2 rounded shadow"
		onSubmit={event => event.preventDefault()}>
		<h3>
			<CardText
				className="mx-2"/>
			Paragraph
		</h3>
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