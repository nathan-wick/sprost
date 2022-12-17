import React, { FC, useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { App as AppIcon, BoxSeam, ColumnsGap, InfoCircle, Pencil, RocketTakeoffFill, Signpost, Tag, Window, WindowStack } from "react-bootstrap-icons";
import { UserContext } from "../../User";
import EditView from "./EditView";
import NewView from "../modals/NewView";
import { NavigationContext } from "../Navigation";

const EditApp: FC<{ appRoute: string }> = ({ appRoute }) => {
	const user = useContext(UserContext);
	const { setCurrentView } = useContext(NavigationContext);
	const app = user?.apps.find(app => app.route === appRoute);
	const views = app?.views;

	return <>
		<Row
			className="gx-0 mx-5 mt-5">
			<Col
				lg={6}
				md={4}
				sm={12}>
				<h1>
					<AppIcon
						className="mx-2" />
					{app?.name}
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
			className="gx-0 p-3">
			<Col
				lg={4}
				md={6}
				sm={12} >
				<div
					className={`m-3 p-2 shadow rounded bg-${user?.theme.name === "dark" ? "black" : "white"}`}>
					<h3
						className="mb-3">
						<InfoCircle
							className="mx-2" />
						App Information
					</h3>
					<small>
						<Tag
							className="mx-2"/>
						Name: <b>{app?.name}</b>
					</small>
					<br />
					<small>
						<Signpost
							className="mx-2" />
						Route: <b>{app?.route}</b>
					</small>
					<br />
					<small>
						<BoxSeam
							className="mx-2" />
						Version: <b>{app?.version.major}.{app?.version.minor}.{app?.version.patch}</b>
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
				<NewView appRoute={appRoute} />
			</Col>
		</Row>
		<Row
			className="gx-0 p-3">
			{
				views?.map(view => 
					<Col
						key={view.route}
						lg={4}
						md={6}
						sm={12}>
						<div
							className={`m-3 p-2 shadow rounded bg-${user?.theme.name === "dark" ? "black" : "white"}`}>
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
								Route: <b>{app?.route}/{view.route}</b>
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
									sm={12}
									className="p-1">
									<Button
										className="w-100"
										variant="primary"
										onClick={() => setCurrentView(<EditView appRoute={appRoute} viewRoute={view.route} />)}>
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

export default EditApp;