import React, { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { DeviceSsd, Eye, InfoCircle, PlusCircle, RocketTakeoffFill } from "react-bootstrap-icons";
import { UserContext } from "../../User";

const App = (props: any) => {
	const app = props.app;
	const user = useContext(UserContext);

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
			<Col>
				<Row
					className="gx-0">
					<Col
						className="m-1">
						<Button
							className="w-100 shadow"
							disabled={false}
							variant="primary">
							<Eye
								className="mx-2" />
							Preview
						</Button>
					</Col>
					<Col
						className="m-1">
						<Button
							className="w-100 shadow"
							disabled={false}
							variant="primary">
							<DeviceSsd
								className="mx-2" />
							Save
						</Button>
					</Col>
					<Col
						className="m-1">
						<Button
							className="w-100 shadow"
							disabled={true}
							variant="primary">
							<RocketTakeoffFill
								className="mx-2" />
							Release
						</Button>
					</Col>
				</Row>
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
					<p>
						Name: {app.name}
					</p>
					<p>
						ID: {app.id}
					</p>
					<p>
						Version: {app.version.major}.{app.version.minor}.{app.version.patch}
					</p>
				</div>
			</Col>
		</Row>
	</>;
};

export default App;