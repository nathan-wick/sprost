import React, { useContext } from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { DeviceSsd, Eye, Gear, RocketTakeoffFill } from "react-bootstrap-icons";
import { UserContext } from "../../User";

const App = (props: any) => {
	const app = props.app;
	const user = useContext(UserContext);

	return <>
		<h1
			className="mx-5 mt-5">
			{app.name}
		</h1>
		<p
			className="mx-5 mb-5 text-muted">
			Version: {app.version.major}.{app.version.minor}.{app.version.patch}
		</p>
		<ButtonGroup
			className="px-5 mb-5 w-100">
			<Button
				variant="primary">
				<Eye
					className="mx-2" />
				Preview
			</Button>
			<Button
				variant="outline-secondary">
				<DeviceSsd
					className="mx-2" />
				Save
			</Button>
			<Button
				variant="outline-secondary">
				<RocketTakeoffFill
					className="mx-2" />
				Release
			</Button>
		</ButtonGroup>
		<Row
			className="gx-0 mx-5">
			<Col
				sm={12}
				className={`shadow rounded bg-${user?.theme.name === "dark" ? "black" : "white"}`}>
				<h1
					className="m-3">
					<Gear
						className="mx-2" />
					Settings
				</h1>
				<Row
					className="gx-0">
					<Col
						md={6}
						sm={12}
						className="m-3">
						TODO
					</Col>
					<Col
						className="m-3">
						TODO
					</Col>
				</Row>
			</Col>
		</Row>
	</>;
};

export default App;