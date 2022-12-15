import { doc, Firestore, setDoc } from "firebase/firestore";
import React, { FC, useContext, useState } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { PlusCircle, Signpost, Tag } from "react-bootstrap-icons";
import { View } from "../../../types/View";
import { DatabaseContext } from "../../Database";
import { UserContext } from "../../User";

const NewView: FC<{ appRoute: string }> = ({ appRoute }) => {
	const database = useContext(DatabaseContext);
	const user = useContext(UserContext);
	const views = user?.apps.find(app => app.route === appRoute)?.views;
	const [ modal, setModal ] = useState<boolean>(false);
	const [ nameInput, setNameInput ] = useState<string>();
	const [ nameRoute, setNameRoute ] = useState<string>();
	const [ nameError, setNameError ] = useState<string | undefined>("Please enter a view name");
	const [ isLoading, setIsLoading ] = useState<boolean>(false);
	const showModal = () => setModal(true);
	const hideModal = () => reset();

	const onNameChange = (event: { target: { value: string; }; }) => {
		if (event.target.value) {
			if (event.target.value.match(/^[a-zA-Z\s]*$/g)) {
				const newNameRoute = event.target.value.toLowerCase().replaceAll(" ", "-");
				if (!views?.find((view: { route: string; }) => view.route === newNameRoute)) {
					setNameInput(event.target.value);
					setNameRoute(newNameRoute);
					setNameError(undefined);
				} else {
					setNameInput(undefined);
					setNameRoute(undefined);
					setNameError("Please enter a unique view name");
				}
			} else {
				setNameInput(undefined);
				setNameRoute(undefined);
				setNameError("Please enter only letters (a-z) and spaces");
			}
		} else {
			setNameInput(undefined);
			setNameRoute(undefined);
			setNameError("Please enter a view name");
		}
	};

	const reset = () => {
		setNameInput(undefined);
		setNameRoute(undefined);
		setNameError("Please enter a view name");
		setIsLoading(false);
		setModal(false);
	};

	const onSubmit = async (event: { preventDefault: () => void; }) => {
		setIsLoading(true);
		event.preventDefault();
		if (user) {
			const newView: View = {
				isSaved: true,
				route: String(nameRoute),
				name: String(nameInput),
				type: "information",
				components: [],
			};
			user?.apps.find(app => app.route === appRoute)?.views.push(newView);
			const userReference = doc(database as Firestore, "users", user.id);
			await setDoc(userReference, user, { merge: true });
		}
		hideModal();
	};
	
	return <>
		<Button
			variant="primary"
			className="w-50 shadow"
			onClick={showModal}>
			<PlusCircle
				className="mx-2" />
			New View
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
					New View
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<FormGroup>
						<Form.Label>
							<Tag
								className="mx-2" />
                            View Name
						</Form.Label>
						<Form.Control
							className={user?.theme.name === "dark" ? "bg-black text-light" : "bg-white text-dark"}
							type="text"
							defaultValue={nameInput}
							onChange={onNameChange}
							maxLength={50} />
						{
							nameError ?
								<p
									className="text-danger">
									{nameError}
								</p> :
								<p
									className="text-success">
									{nameInput} is a valid view name
								</p>
						}
					</FormGroup>
				</Form>
				{
					nameRoute &&
					<>
						<p
							className="text-muted">
							<Signpost
								className="mx-2" />
							View Route: <b>{nameRoute}</b>
						</p>
					</>
				}
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
					disabled={!nameInput || !!nameError || isLoading}
					onClick={onSubmit}>
					{
						isLoading ?
							<>Loading...</> :
							<>Create {nameInput}</>
					}
				</Button>
			</Modal.Footer>
		</Modal>
	</>;
};

export default NewView;