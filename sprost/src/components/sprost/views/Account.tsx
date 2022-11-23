import { doc, Firestore, setDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Bookmarks, DeviceSsd, Envelope, Eye } from "react-bootstrap-icons";
import { Color } from "../../../types/Color";
import { User } from "../../../types/User";
import { DatabaseContext } from "../../Database";
import { UserContext } from "../../User";
import SignOut from "../SignOut";

const Account = () => {
	const database = useContext(DatabaseContext);
	const user = useContext(UserContext);
	const [ nameInput, setNameInput ] = useState<string>();
	const [ nameError, setNameError ] = useState<string>();
	const [ emailInput, setEmailInput ] = useState<string>();
	const [ emailError, setEmailError ] = useState<string>();
	const [ themeInput, setThemeInput ] = useState<Color>();
	const [ canSave, setCanSave ] = useState<boolean>(false);

	// TODO: Input Validation

	const themeOptions = [
		{
			value: "light",
			text: "Light",
		},
		{
			value: "dark",
			text: "Dark",
		},
	];

	useEffect(() => {
		setNameInput(user?.name);
		setEmailInput(user?.email);
		setThemeInput(user?.theme);
	}, [ user ]);

	useEffect(() => {
		nameInput === user?.name &&
        emailInput === user?.email &&
        themeInput === user?.theme ?
			setCanSave(false) :
			nameError || emailError ?
				setCanSave(false) :
				setCanSave(true);
	}, [ user, emailInput, nameInput, themeInput, nameError, emailError ]);

	const onNameChange = (event: { target: { value: string; }; }) => {
		if (event.target.value) {
			if (event.target.value.match(/^[a-zA-Z\s]*$/g)) {
				setNameInput(event.target.value);
				setNameError(undefined);
			} else {
				setNameError("Please use only letters and spaces");
			}
		} else {
			setNameError("Please enter a name");
		}
	};

	const onEmailChange = (event: { target: { value: string; }; }) => {
		if (event.target.value) {
			if (event.target.value.match(/^\S+@\S+\.\S+$/)) {
				setEmailInput(event.target.value);
				setEmailError(undefined);
			} else {
				setEmailError("Please enter a valid email");
			}
		} else {
			setEmailError("Please enter an email");
		}
	};

	const onThemeChange = (event: { target: { value: string; }; }) => {
		setThemeInput({ name: event.target.value });
	};

	const onSubmit = async (event: { preventDefault: () => void; }) => {
		event.preventDefault();
		if (user) {
			const userInputData: Partial<User> = {
				name: nameInput,
				email: emailInput,
				theme: themeInput,
			};
			const userReference = doc(database as Firestore, "users", user.id);
			await setDoc(userReference, userInputData, { merge: true });
		}
	};

	return <>
		<h1
			className="my-3 mx-5">
            Account
		</h1>
		<hr
			className="my-3 mx-5" />
		<Row
			className="gx-0 my-3">
			<Col
				lg={3}
				md={12}
				className="text-center">
				<img
					src={user?.portrait}
					alt={`${user?.name}'s portrait`}
					referrerPolicy="no-referrer"
					className="w-50 my-3 border border-2 rounded-circle" />
			</Col>
			<Col
				lg={9}
				md={12}>
				<Form
					className="my-3 mx-5"
					onSubmit={onSubmit}>
					<Form.Group
						className="my-3">
						<Form.Label>
							<Bookmarks
								className="mx-2" />
                            Name
						</Form.Label>
						<Form.Control
							className={user?.theme.name === "dark" ? "bg-black text-light" : "bg-white text-dark"}
							type="text"
							placeholder="Enter name"
							onChange={onNameChange}
							defaultValue={user?.name}
							maxLength={50} />
						{
							nameError &&
								<p
									className="text-danger">
									{nameError}
								</p>
						}
					</Form.Group>
					<Form.Group
						className="my-3">
						<Form.Label>
							<Envelope
								className="mx-2" />
                            Email
						</Form.Label>
						<Form.Control
							className={user?.theme.name === "dark" ? "bg-black text-light" : "bg-white text-dark"}
							type="email"
							placeholder="Enter email"
							onChange={onEmailChange}
							defaultValue={user?.email}
							maxLength={50} />
						{
							emailError &&
								<p
									className="text-danger">
									{emailError}
								</p>
						}
					</Form.Group>
					<Form.Group
						className="my-3">
						<Form.Label>
							<Eye
								className="mx-2" />
                            Theme
						</Form.Label>
						<Form.Select
							className={user?.theme.name === "dark" ? "bg-black text-light" : "bg-white text-dark"}
							onChange={onThemeChange}
							value={themeInput?.name}>
							{
								themeOptions.map(themeOption =>
									<option
										key={themeOption.value}
										value={themeOption.value}>
										{themeOption.text}
									</option>)
							}
						</Form.Select>
					</Form.Group>
					<Button
						variant="primary"
						type="submit"
						className="m-2"
						disabled={!canSave}>
						<DeviceSsd
							className="mx-2" />
                        Save Preferences
					</Button>
					<SignOut />
				</Form>
			</Col>
		</Row>
	</>;
};

export default Account;