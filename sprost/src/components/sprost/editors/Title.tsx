import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Form } from "react-bootstrap";
import { AspectRatio, CardHeading, Chat } from "react-bootstrap-icons";
import { Title as TitleType } from "../../../types/components/Title";
import { View } from "../../../types/View";

const Title: FC<{
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
	const [ sizeInput, setSizeInput ] = useState<"small" | "medium" | "large">((editComponent?.type as TitleType).size);
	const onMessageChange = (event: { target: { value: React.SetStateAction<string | undefined>; }; }) => {
		setMessageInput(event.target.value);
	};
	const onSizeChange = (event: { target: { value: string } }) => {
		let newSizeInput: "small" | "medium" | "large";
		switch(event.target.value) {
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
	};
	const onSubmit = () => {
		const newTitle: TitleType = {
			id: "title",
			message: String(messageInput),
			size: sizeInput ? sizeInput : "medium",
		};
		const newView: View = structuredClone(editView);
		const newComponent = newView.components.find(component => component.id === componentId);
		if (newComponent) {
			newComponent.type = newTitle;
			newView.isSaved = false;
			setEditView(newView);
		}
	};
	const sizeOptions = [
		{
			value: "large",
			text: "Large",
		},
		{
			value: "medium",
			text: "Medium",
		},
		{
			value: "small",
			text: "Small",
		},
	];
	
	return <Form
		className="mx-2 mt-4 p-2 rounded shadow"
		onSubmit={event => event.preventDefault()}>
		<h3>
			<CardHeading
				className="mx-2"/>
			Title
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
		<Form.Label
			className="mt-2">
			<AspectRatio
				className="mx-2" />
			Size
		</Form.Label>
		<Form.Select
			onChange={onSizeChange}
			onBlur={onSubmit}
			defaultValue={sizeInput}> {/* TODO Default value */}
			{
				sizeOptions.map(sizeOption =>
					<option
						key={sizeOption.value}
						value={sizeOption.value}>
						{sizeOption.text}
					</option>)
			}
		</Form.Select>
	</Form>;
};

export default Title;