import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Form } from "react-bootstrap";
import { Bookmark, Chat } from "react-bootstrap-icons";
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
	const [ messageInput, setMessageInput ] = useState<string>();

	const onChange = (event: { target: { value: React.SetStateAction<string | undefined>; }; preventDefault: () => void; }) => {
		setMessageInput(event.target.value);
		event.preventDefault();
		console.log(messageInput, editView);
		// TODO Implement better input validation
		if (messageInput) {
			const newHeader: HeaderType = {
				id: "header",
				message: messageInput,
			};
			const newView: View = structuredClone(editView);
			const newComponent = newView.components.find(component => component.id === componentId);
			if (newComponent) {
				newComponent.type = newHeader;
				newView.isSaved = false;
				setEditView(newView);
			}
		}
	};
	
	return <Form
		className="mx-2 mt-4 p-2 rounded shadow">
		<h3>
			<Bookmark
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
			onChange={onChange} />
	</Form>;
};

export default Header;