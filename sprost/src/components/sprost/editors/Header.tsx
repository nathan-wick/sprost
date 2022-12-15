import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Form } from "react-bootstrap";
import { CardImage, Chat } from "react-bootstrap-icons";
import { Header as HeaderType } from "../../../types/components/Header";
import { View } from "../../../types/View";

const Header: FC<{
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
		const newHeader: HeaderType = {
			id: "header",
			message: String(messageInput),
		};
		const newView: View = structuredClone(editView);
		const newComponent = newView.components.find(component => component.id === componentId);
		if (newComponent) {
			newComponent.type = newHeader;
			newView.isSaved = false;
			setEditView(newView);
		}
	};
	
	return <Form
		className="mx-2 mt-4 p-2 rounded shadow"
		onSubmit={event => event.preventDefault()}>
		<h3>
			<CardImage
				className="mx-2"/>
			Header
		</h3>
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