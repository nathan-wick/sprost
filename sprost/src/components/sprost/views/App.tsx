import { collection, Firestore, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { BoxSeam, ColumnsGap, Eye, InfoCircle, Pencil, RocketTakeoffFill, Signpost, Tag, Window, WindowStack } from "react-bootstrap-icons";
import { View } from "../../../types/View";
import { DatabaseContext } from "../../Database";
import { UserContext } from "../../User";
import NewView from "../modals/NewView";

const App = (props: any) => {
	const app = props.app;
	const database = useContext(DatabaseContext);
	const user = useContext(UserContext);
	const [ views, setViews ] = useState<View[]>();

	useEffect(() => {
		if (user && app) {
			// Get App's View
			const viewsReference = collection(database as Firestore, "users", user.id, "apps", app.route, "views");
			onSnapshot(viewsReference, (viewsSnapshot) => {
				const viewsFromDatabase: View[] = [];
				viewsSnapshot.forEach((viewDocument) => {
					const viewData = viewDocument.data();
					const viewFromDatabase: View = {
						route: viewData.route,
						name: viewData.name,
						type: viewData.type,
					};
					viewsFromDatabase.push(viewFromDatabase);
				});
				setViews(viewsFromDatabase);
			});
		}
	}, [ app ]);

	useEffect(() => console.log("Got Views ", views), [ views ]);

	return <>
		<Row
			className="gx-0 mx-5 mt-5">
			<Col
				lg={6}
				md={4}
				sm={12}>
				<h1>
					{app.name}
				</h1>
			</Col>
			<Col
				className="text-end">
				<Button
					className="w-50 shadow"
					disabled={true}
					variant="primary">
					<RocketTakeoffFill
						className="mx-2" />
					Release
				</Button>
			</Col>
		</Row>
		<Row
			className="gx-0">
			<Col
				lg={4}
				md={6}
				sm={12} >
				<div
					className={`mx-5 mt-5 p-2 shadow rounded bg-${user?.theme.name === "dark" ? "black" : "white"}`}>
					<h3
						className="mb-3">
						<InfoCircle
							className="mx-2" />
						App Information
					</h3>
					<small>
						<Tag
							className="mx-2"/>
						Name: <b>{app.name}</b>
					</small>
					<br />
					<small>
						<Signpost
							className="mx-2" />
						Route: <b>{app.route}</b>
					</small>
					<br />
					<small>
						<BoxSeam
							className="mx-2" />
						Version: <b>{app.version.major}.{app.version.minor}.{app.version.patch}</b>
					</small>
				</div>
			</Col>
		</Row>
		<Row
			className="gx-0 mx-5 mt-5">
			<Col
				lg={6}
				md={4}
				sm={12}>
				<h1>
					<WindowStack
						className="mx-2" />
					Views
				</h1>
			</Col>
			<Col
				className="text-end">
				<NewView app={app} views={views} />
			</Col>
		</Row>
		<Row
			className="gx-0">
			{
				views?.map(view => 
					<Col
						key={view.route}
						lg={4}
						md={6}
						sm={12}>
						<div
							className={`mx-5 mt-5 p-2 shadow rounded bg-${user?.theme.name === "dark" ? "black" : "white"}`}>
							<h3
								className="mb-3">
								<Window
									className="mx-2" />
								{view.name}
							</h3>
							<small>
								<Tag
									className="mx-2" />
								Name: <b>{view.name}</b>
							</small>
							<br />
							<small>
								<Signpost
									className="mx-2" />
								Route: <b>{app.route}/{view.route}</b>
							</small>
							<br />
							<small>
								<ColumnsGap
									className="mx-2" />
								Type: <b>{view.type}</b>
							</small>
							<Row
								className="mt-4 gx-0">
								<Col
									sm={6}
									className="p-1">
									<Button
										className="w-100"
										variant="outline-primary">
										<Eye
											className="mx-2" />
										View
									</Button>
								</Col>
								<Col
									sm={6}
									className="p-1">
									<Button
										className="w-100"
										variant="outline-primary">
										<Pencil
											className="mx-2" />
										Edit
									</Button>
								</Col>
							</Row>
						</div>
					</Col>
				)
			}
		</Row>
	</>;
};

export default App;