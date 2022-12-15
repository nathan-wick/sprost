import { doc, Firestore, setDoc } from "firebase/firestore";
import React, { FC, useContext, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { ArrowsAngleContract, ArrowsAngleExpand, BoxArrowLeft, DeviceSsd, Pencil } from "react-bootstrap-icons";
import { View } from "../../types/View";
import { DatabaseContext } from "../Database";
import { UserContext } from "../User";
import Header from "./editors/Header";
import Title from "./editors/Title";
import Paragraph from "./editors/Paragraph";
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
	const [ previewIsExpanded, setPreviewIsExpanded ] = useState<boolean>(false);

	const exit = () => {
		setCurrentView(<App appRoute={String(appRoute)} />);
	};
	
	const saveUser = async () => {
		setIsSaving(true);
		if (user) {
			const newView = structuredClone(editView);
			newView.isSaved = true;
			const newUser = structuredClone(user);
			const newUserAppViews = newUser.apps.find((app: { route: string; }) => app.route === appRoute).views;
			const newUserAppViewIndex = newUserAppViews.findIndex((view: { route: string; }) => view.route === viewRoute);
			newUserAppViews[newUserAppViewIndex] = newView;
			const userReference = doc(database as Firestore, "users", user.id);
			await setDoc(userReference, newUser, { merge: true });
			setEditView(newView);
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
					variant={editView?.isSaved ? "primary" : "danger"}
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
					variant={"primary"}
					className="w-100 shadow"
					onClick={() => setPreviewIsExpanded(!previewIsExpanded)}>
					{
						previewIsExpanded ?
							<ArrowsAngleContract
								className="mx-2" /> :
							<ArrowsAngleExpand
								className="mx-2" />
					}
					Preview
				</Button>
			</Col>
			<Col
				className="mx-2">
				<Button
					variant={editView?.isSaved ? "success" : "primary"}
					className="w-100 shadow"
					disabled={isSaving || editView?.isSaved}
					onClick={saveUser}>
					<DeviceSsd
						className="mx-2" />
					{isSaving ? "Saving..." : editView?.isSaved ? "Saved" : "Save"}
				</Button>
			</Col>
		</Row>
		<Row
			className="gx-0 m-5">
			<Col
				md={previewIsExpanded ? 12 : 6}
				sm={12}
				className={previewIsExpanded ? "" : "d-none d-lg-block"}>
				<div
					className="m-2 mb-4 rounded shadow">
					Preview
				</div>
			</Col>
			<Col>
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
									return <Header componentId={component.id} editView={editView} setEditView={setEditView} />;
								case "title":
									return <Title componentId={component.id} editView={editView} setEditView={setEditView} />;
								case "paragraph":
									return <Paragraph componentId={component.id} editView={editView} setEditView={setEditView} />;
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