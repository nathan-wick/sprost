import { addDoc, collection, Firestore } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { ColumnsGap, PlusCircle } from "react-bootstrap-icons";
import { Component } from "../../../types/Component";
import { DatabaseContext } from "../../Database";
import { UserContext } from "../../User";

const NewComponent = (props: any) => {
	const app = props.app;
	const view = props.view;
	const database = useContext(DatabaseContext);
	const user = useContext(UserContext);
	const [ modal, setModal ] = useState<boolean>(false);
	const [ typeInput, setTypeInput ] = useState<string>("title");
	const [ isLoading, setIsLoading ] = useState<boolean>(false);
	const showModal = () => setModal(true);
	const hideModal = () => reset();

	const typeOptions = [
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
		setTypeInput("title");
		setIsLoading(false);
		setModal(false);
	};

	const onSubmit = async (event: { preventDefault: () => void; }) => {
		setIsLoading(true);
		event.preventDefault();
		if (user) {
			const componentData: Component = {
				type: typeInput,
			};
			const componentReference = collection(database as Firestore, "users", user.id, "apps", app.route, "views", view.route, "components");
			await addDoc(componentReference, componentData);
		}
		hideModal();
	};
	
	return <>
		<Button
			variant="primary"
			className="w-100"
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
										key={typeOption.value}
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