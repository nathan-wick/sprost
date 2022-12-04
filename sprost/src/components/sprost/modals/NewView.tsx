import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { Bookmarks, PlusCircle } from "react-bootstrap-icons";
import { App } from "../../../types/App";
import { AppsContext } from "../../Apps";
import { UserContext } from "../../User";

const NewView = (appRoute: string) => {
	const user = useContext(UserContext);
	const apps = useContext(AppsContext);
	const [ modal, setModal ] = useState<boolean>(false);
	const [ nameInput, setNameInput ] = useState<string>();
	const [ nameRoute, setNameRoute ] = useState<string>();
	const [ nameError, setNameError ] = useState<string | undefined>("Please enter an app name");
	const [ canSave, setCanSave ] = useState<boolean>(false);
	const showModal = () => setModal(true);
	const hideModal = () => setModal(false);

	console.log(appRoute);

	useEffect(() => {
		setCanSave(!!nameInput && !nameError);
	}, [ nameInput, nameError ]);

	const onNameChange = (event: { target: { value: string; }; }) => {
		if (event.target.value) {
			if (event.target.value.match(/^[a-zA-Z\s]*$/g)) {
				const newNameRoute = event.target.value.toLowerCase().replaceAll(" ", "-");
				if (!apps?.find(app => app.route === newNameRoute)) {
					setNameInput(event.target.value);
					setNameRoute(newNameRoute);
					setNameError(undefined);
				} else {
					setNameError("Please enter a unique view name");
				}
			} else {
				setNameError("Please enter only letters and spaces");
			}
		} else {
			setNameError("Please enter a view name");
		}
	};

	const onSubmit = async (event: { preventDefault: () => void; }) => {
		event.preventDefault();
		// TODO Create new view
	};
	
	return <>
		<Button
			className="w-100 shadow"
			variant="outline-primary"
			onClick={showModal}>
			<PlusCircle
				className="mx-2" />
            New View
		</Button>

		<Modal 
			show={modal}
			onHide={hideModal}
			className="text-dark">
			<Modal.Header>
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
							<Bookmarks
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
				<p
					className="text-muted">
					View Route: {nameRoute}
				</p>
				<p
					className="text-muted">
					View name and route cannot be changed after creation.
				</p>
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
					disabled={!canSave}
					onClick={onSubmit}>
					Create {nameInput}
				</Button>
			</Modal.Footer>
		</Modal>
	</>;
};

export default NewView;