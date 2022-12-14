import { doc, Firestore, setDoc } from "firebase/firestore";
import React, { FC, useContext, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { BoxArrowLeft, DeviceSsd, Pencil } from "react-bootstrap-icons";
import { View } from "../../types/View";
import { DatabaseContext } from "../Database";
import { UserContext } from "../User";
import NewComponent from "./modals/NewComponent";
import { NavigationContext } from "./Navigation";
import App from "./views/App";

const EditView: FC<{ appRoute: string, viewRoute: string }> = ({ appRoute, viewRoute }) => {
	const database = useContext(DatabaseContext);
	const user = useContext(UserContext);
	const { setCurrentView } = useContext(NavigationContext);
	const savedView = user?.apps.find(app => app.route === appRoute)?.views.find(view => view.route === viewRoute);
	const [ editView, setEditView ] = useState<View | undefined>(structuredClone(savedView));
	const [ isSaving, setIsSaving ] = useState<boolean>(false);

	const exit = () => {
		setCurrentView(<App appRoute={String(appRoute)} />);
	};
	
	const saveUser = async () => {
		setIsSaving(true);
		if (user) {
			const newUser = structuredClone(user);
			const newUserAppViews = newUser.apps.find((app: { route: string; }) => app.route === appRoute).views;
			const newUserAppViewIndex = newUserAppViews.findIndex((view: { route: string; }) => view.route === viewRoute);
			newUserAppViews[newUserAppViewIndex] = structuredClone(editView);
			const userReference = doc(database as Firestore, "users", user.id);
			await setDoc(userReference, newUser, { merge: true });
		}
		setIsSaving(false);
	};
    
	return <>
		<Row
			className="gx-0 m-5">
			<Col
				lg={6}
				md={4}
				sm={12}>
				<h1>
					<Pencil
						className="mx-2" />
					{editView?.name}
				</h1>
			</Col>
			<Col
				className="mx-2">
				<Button
					variant={editView?.version === savedView?.version ? "primary" : "danger"}
					className="w-100 shadow"
					onClick={exit}>
					<BoxArrowLeft
						className="mx-2" />
					Exit
				</Button>
			</Col>
			<Col
				className="mx-2">
				<Button
					variant={editView?.version === savedView?.version ? "success" : "primary"}
					className="w-100 shadow"
					disabled={isSaving || editView?.version === savedView?.version}
					onClick={saveUser}>
					<DeviceSsd
						className="mx-2" />
					{isSaving ? "Saving..." : editView?.version === savedView?.version ? "Saved" : "Save"}
				</Button>
			</Col>
		</Row>
		<Row
			className="gx-0 m-5">
			<Col
				md={6}
				sm={12}>
				<div
					className="m-2 rounded shadow">
					Preview
				</div>
			</Col>
			<Col
				md={6}
				sm={12}>
				<Row
					className="gx-0">
					<Col
						className="p-2">
						<NewComponent editView={editView} setEditView={setEditView} />
					</Col>
				</Row>
				{
					editView?.components.map((component, index) => 
						<div
							key={index}>
							{(() => {
								switch (component.type.id) {
								case "header":
									return <p>{component.type.id}</p>;
								case "title":
									return <p>{component.type.id}</p>;
								case "paragraph":
									return <p>{component.type.id}</p>;
								default:
									return <></>;
								}
							})()}
						</div>)
				}
			</Col>
		</Row>
	</>;
};

export default EditView;