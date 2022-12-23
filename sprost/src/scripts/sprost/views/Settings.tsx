import { collection, doc, Firestore, getDocs, limit, query, updateDoc, where } from "firebase/firestore";
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
	const [ nameInput, setNameInput ] = useState<string>();
	const [ nameRoute, setNameRoute ] = useState<string>();
	const [ nameError, setNameError ] = useState<string>();
	const [ emailInput, setEmailInput ] = useState<string>();
	const [ emailError, setEmailError ] = useState<string>();
	const [ themeInput, setThemeInput ] = useState<Color>();
	const [ canSave, setCanSave ] = useState<boolean>(false);
	const createUserRoute = async (name: string) => {
		let route = name.toLowerCase().replaceAll(" ", "-");
		if (route !== user?.route) {
			let routeIsUnique = false;
			let iteration = 1;
			while (!routeIsUnique) {
				console.log(route, iteration);
				if (iteration > 1) {
					route = route + String(iteration);
				}
				const usersWithRoute = await getDocs(query(collection(database as Firestore, "users"), where("route", "==", route), limit(1)));
				if (usersWithRoute.empty) {
					routeIsUnique = true;
				} else {
					iteration += 1;
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
		setNameRoute(user?.route);
		setEmailInput(user?.email);
		setThemeInput(user?.theme);
	}, [ user ]);

	useEffect(() => {
		nameInput === user?.name &&
		nameRoute === user?.route &&
        emailInput === user?.email &&
        themeInput === user?.theme ?
			setCanSave(false) :
			nameError || emailError ?
				setCanSave(false) :
				setCanSave(true);
	}, [ user, emailInput, nameInput, themeInput, nameError, emailError ]);

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

	const onRouteChange = async () => {
		if (!nameError && nameInput) {
			setNameRoute(await createUserRoute(nameInput));
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
				route: nameRoute,
				email: emailInput,
				theme: themeInput,
			};
			const userReference = doc(database as Firestore, "users", user.id);
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
					className="m-3"
					onSubmit={onSubmit}>
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
							onBlur={onRouteChange}
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
									sprost.com/<b>{nameRoute}</b>
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
                        Save Settings
					</Button>
				</Form>
			</Col>
		</Row>
	</div>;
};

export default Settings;