import { doc, Firestore, setDoc } from "firebase/firestore";
import React, { FC, useContext, useEffect, useState } from "react";
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

	const exit = () => {
		setCurrentView(<App appRoute={String(appRoute)} />);
	};
	
	const saveUser = async () => {
		if (user) {
			const newUser = structuredClone(user);
			const newUserAppViews = newUser.apps.find((app: { route: string; }) => app.route === appRoute).views;
			const newUserAppViewIndex = newUserAppViews.findIndex((view: { route: string; }) => view.route === viewRoute);
			newUserAppViews[newUserAppViewIndex] = structuredClone(editView);
			console.log(newUser, user);
			const userReference = doc(database as Firestore, "users", user.id);
			await setDoc(userReference, newUser, { merge: true });
		}
	};

	useEffect(() => console.log(editView?.version === savedView?.version), [ editView, savedView ]);
	useEffect(() => console.log(editView, savedView), [ editView, savedView ]);
    
	return <>
		<Row
			className="gx-0 mx-5 mt-5">
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
				className="text-end">
				<Button
					variant={editView?.version === savedView?.version ? "primary" : "danger"}
					className="w-50 shadow"
					onClick={exit}>
					<BoxArrowLeft
						className="mx-2" />
					Exit
				</Button>
				<Button
					variant={editView?.version === savedView?.version ? "success" : "primary"}
					className="w-50 shadow"
					disabled={editView?.version === savedView?.version}
					onClick={saveUser}>
					<DeviceSsd
						className="mx-2" />
					{editView?.version === savedView?.version ? "Saved" : "Save"}
				</Button>
			</Col>
		</Row>
		<Row
			className="gx-0 h-100">
			<Col
				md={6}
				sm={12}
				className="h-100 border rounded">
						Preview
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
				{
					savedView?.components.map(() => 
						<>o</>)
				}
			</Col>
		</Row>
	</>;
};

export default EditView;