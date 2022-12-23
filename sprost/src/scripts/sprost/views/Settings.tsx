import { deleteDoc, doc, Firestore, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Bookmarks, DeviceSsd, Envelope, Eye, Gear, Signpost } from "react-bootstrap-icons";
import { Color } from "../../../types/Color";
import { User } from "../../../types/User";
import { DatabaseContext } from "../../Database";
import { UserContext } from "../../User";

const Settings = () => {
	const database = useContext(DatabaseContext);
	const user = useContext(UserContext);
	const userReference = user ? doc(database as Firestore, "users", user.id) : undefined;
	const [ nameInput, setNameInput ] = useState<string>();
	const [ routeInput, setRouteInput ] = useState<string>();
	const [ nameError, setNameError ] = useState<string>();
	const [ emailInput, setEmailInput ] = useState<string>();
	const [ emailError, setEmailError ] = useState<string>();
	const [ themeInput, setThemeInput ] = useState<Color>();
	const createUserRoute = async (name: string) => {
		let route = name.toLowerCase().replaceAll(" ", "-");
		if (route !== user?.route) {
			let routeIsUnique = false;
			let iteration = 1;
			while (!routeIsUnique) {
				console.log(route, iteration);
				let newRoute = route;
				if (iteration > 1) {
					newRoute = route + String(iteration);
				}
				const publicUserReference = doc(database as Firestore, "public", newRoute);
				const publicUserSnapshot = await getDoc(publicUserReference);
				if (publicUserSnapshot.exists()) {
					iteration += 1;
				} else {
					route = newRoute;
					routeIsUnique = true;
				}
			}
		}
		return route;
	};
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
		setRouteInput(user?.route);
		setEmailInput(user?.email);
		setThemeInput(user?.theme);
	}, [ user ]);

	const onNameChange = async (event: { target: { value: string; }; }) => {
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

	const saveName = async () => {
		if (user && userReference && !nameError && nameInput) {
			const newRoute = await createUserRoute(nameInput);
			setRouteInput(newRoute);
			const publicUserReference = doc(database as Firestore, "public", user.route);
			const publicUserSnapshot = await getDoc(publicUserReference);
			const publicUserData: Partial<User> = {
				name: nameInput,
				portrait: publicUserSnapshot.data()?.portrait,
			};
			await deleteDoc(publicUserReference);
			const newPublicUserReference = doc(database as Firestore, "public", newRoute);
			const userInputData: Partial<User> = {
				name: nameInput,
				route: newRoute,
			};
			await updateDoc(userReference, userInputData);
			await setDoc(newPublicUserReference, publicUserData);
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

	const saveEmail = async () => {
		if (userReference && !emailError) {
			const userInputData: Partial<User> = {
				email: emailInput,
			};
			await updateDoc(userReference, userInputData);
		}
	};

	const onThemeChange = (event: { target: { value: string; }; }) => {
		setThemeInput({ name: event.target.value });
	};

	const saveTheme = async () => {
		if (userReference) {
			const userInputData: Partial<User> = {
				theme: themeInput,
			};
			await updateDoc(userReference, userInputData);
		}
	};

	return <div
		className={`m-5 shadow rounded bg-${user?.theme.name === "dark" ? "black" : "white"}`}>
		<Row
			className="gx-0">
			<Col>
				<h1
					className="m-3">
					<Gear
						className="mx-2" />
					Settings
				</h1>
			</Col>
		</Row>
		<Row
			className="gx-0">
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
					className="m-3">
					<Form.Group
						className="m-3">
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
							onBlur={saveName}
							defaultValue={user?.name}
							maxLength={50} />
						{
							nameError ?
								<p
									className="text-danger">
									{nameError}
								</p> :
								<p
									className="text-muted">
									<Signpost
										className="mx-2" />
									sprost.com/<b>{routeInput}</b>
								</p>
						}
					</Form.Group>
					<Form.Group
						className="m-3">
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
							onBlur={saveEmail}
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
						className="m-3">
						<Form.Label>
							<Eye
								className="mx-2" />
                            Theme
						</Form.Label>
						<Form.Select
							className={user?.theme.name === "dark" ? "bg-black text-light" : "bg-white text-dark"}
							onChange={onThemeChange}
							onBlur={saveTheme}
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
				</Form>
			</Col>
		</Row>
	</div>;
};

export default Settings;