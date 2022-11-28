import { doc, Firestore, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormGroup, Modal, NavDropdown } from "react-bootstrap";
import { Bookmarks, PlusCircle } from "react-bootstrap-icons";
import { App } from "../../../types/App";
import { User } from "../../../types/User";
import { DatabaseContext } from "../../Database";
import { UserContext } from "../../User";

const NewApp = () => {
	const database = useContext(DatabaseContext);
	const user = useContext(UserContext);
	const [ modal, setModal ] = useState<boolean>(false);
	const [ nameInput, setNameInput ] = useState<string>();
	const [ nameError, setNameError ] = useState<string>();
	const [ canSave, setCanSave ] = useState<boolean>(false);
	const showModal = () => setModal(true);
	const hideModal = () => setModal(false);

	useEffect(() => {
		setCanSave(!!nameInput && !nameError);
	}, [ nameInput, nameError ]);

	const onNameChange = (event: { target: { value: string; }; }) => {
		if (event.target.value) {
			if (event.target.value.match(/^[a-zA-Z\s]*$/g)) {
				setNameInput(event.target.value);
				setNameError(undefined);
			} else {
				setNameError("Please use only letters and spaces");
			}
		} else {
			setNameError("Please enter an app name");
		}
	};

	const onSubmit = async (event: { preventDefault: () => void; }) => {
		event.preventDefault();
		if (user) {
			const appData: App = {
				name: String(nameInput),
				version: {
					major: 0,
					minor: 0,
					patch: 0,
				},
			};
			const userData: Partial<User> = {
				apps: user.apps ? user.apps.concat(appData) : Array(appData),
			};
			const userReference = doc(database as Firestore, "users", user.id);
			await updateDoc(userReference, userData);
		}
	};
	
	return <>
		<NavDropdown.Item
			onClick={showModal}>
			<PlusCircle
				className="mx-2" />
			New App
		</NavDropdown.Item>

		<Modal 
			show={modal}
			onHide={hideModal}
			className="text-dark">
			<Modal.Header
				closeButton>
				<Modal.Title>
					<PlusCircle
						className="mx-2" />
					New App
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<FormGroup>
						<Form.Label>
							<Bookmarks
								className="mx-2" />
                            App Name
						</Form.Label>
						<Form.Control
							className={user?.theme.name === "dark" ? "bg-black text-light" : "bg-white text-dark"}
							type="text"
							placeholder="Enter an app name"
							onChange={onNameChange}
							maxLength={50} />
						{
							nameError &&
								<p
									className="text-danger">
									{nameError}
								</p>
						}
					</FormGroup>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="primary"
					className="m-2"
					disabled={!canSave}
					onClick={onSubmit}>
					Continue
				</Button>
			</Modal.Footer>
		</Modal>
	</>;
};

export default NewApp;