import { doc, Firestore, setDoc, updateDoc } from "firebase/firestore";
import React, { FC, useContext, useState } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { BoxSeam, RocketTakeoffFill } from "react-bootstrap-icons";
import { App } from "../../../types/App";
import { User } from "../../../types/User";
import { DatabaseContext } from "../../Database";
import { UserContext } from "../../User";

const NewRelease: FC<{
	app: App | undefined,
}> = ({
	app,
}) => {
	const database = useContext(DatabaseContext);
	const user = useContext(UserContext);
	let version = structuredClone(app?.version);
	const [ modal, setModal ] = useState<boolean>(false);
	const [ releaseType, setReleaseType ] = useState<string>("minor");
	const [ newVersion, setNewVersion ] = useState<{ major: number, minor: number, patch: number } | undefined>(version ? {
		major: version.major,
		minor: version.minor += 1,
		patch: version.patch,
	} : undefined);
	const [ isLoading, setIsLoading ] = useState<boolean>(false);
	const showModal = () => setModal(true);
	const hideModal = () => reset();

	const releaseTypeOptions = [
		{
			value: "major",
			text: "Major",
		},
		{
			value: "minor",
			text: "Minor",
		},
		{
			value: "patch",
			text: "Patch",
		},
	];

	const onReleaseTypeChange = (event: { target: { value: string; }; }) => {
		setReleaseType(event.target.value);
		version = structuredClone(app?.version);
		if (version) {
			switch(event.target.value) {
			case "major":
				setNewVersion({
					major: version.major += 1,
					minor: version.minor,
					patch: version.patch,
				});
				break;
			case "minor":
				setNewVersion({
					major: version.major,
					minor: version.minor += 1,
					patch: version.patch,
				});
				break;
			case "patch":
			default:
				setNewVersion({
					major: version.major,
					minor: version.minor,
					patch: version.patch += 1,
				});
				break;
			}
		}
	};

	const reset = () => {
		setReleaseType("minor");
		version = structuredClone(app?.version);
		setNewVersion(version ? {
			major: version.major,
			minor: version.minor += 1,
			patch: version.patch,
		} : undefined);
		setIsLoading(false);
		setModal(false);
	};

	const onSubmit = async (event: { preventDefault: () => void; }) => {
		setIsLoading(true);
		event.preventDefault();
		if (user && app && newVersion) {
			const newApp = user.apps.find(newApp => newApp.route === app.route);
			if (newApp) {
				newApp.version = newVersion;
				const userReference = doc(database as Firestore, "users", user.id);
				await setDoc(userReference, user, { merge: true });
				const publicUserReference = doc(database as Firestore, "public", user.route);
				const newPublicUser: Partial<User> = {
					apps: user.apps,
				};
				await updateDoc(publicUserReference, newPublicUser);
			}
		}
		hideModal();
	};
	
	return <>
		<Button
			className="w-50 shadow"
			disabled={app?.views.length ? app.views.length < 1 : true}
			variant="primary"
			onClick={showModal}>
			<RocketTakeoffFill
				className="mx-2" />
            Release
		</Button>

		<Modal 
			show={modal}
			onHide={hideModal}
			className="text-dark">
			<Modal.Header
				className="bg-primary bg-gradient text-white">
				<Modal.Title>
					<RocketTakeoffFill
						className="mx-2" />
					Release
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<FormGroup>
						<Form.Label>
							<BoxSeam
								className="mx-2" />
                            Release Size
						</Form.Label>
						<Form.Select
							className={user?.theme.name === "dark" ? "bg-black text-light" : "bg-white text-dark"}
							onChange={onReleaseTypeChange}
							value={releaseType}>
							{
								releaseTypeOptions.map(releaseTypeOption =>
									<option
										key={releaseTypeOption.text}
										value={releaseTypeOption.value}>
										{releaseTypeOption.text}
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
							<>Release Version {newVersion?.major}.{newVersion?.minor}.{newVersion?.patch}</>
					}
				</Button>
			</Modal.Footer>
		</Modal>
	</>;
};

export default NewRelease;