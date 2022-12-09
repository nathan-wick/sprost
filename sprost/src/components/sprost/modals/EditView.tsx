import React, { FC, useContext, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { BoxArrowLeft, DeviceSsd, Pencil } from "react-bootstrap-icons";
import { UserContext } from "../../User";
import NewComponent from "./NewComponent";

const EditView: FC<{ appRoute: string, viewRoute: string }> = ({ appRoute, viewRoute }) => {
	const user = useContext(UserContext);
	const app = user?.apps.find(app => app.route === appRoute);
	const view = app?.views.find(view => view.route === viewRoute);
	const [ modal, setModal ] = useState<boolean>(false);
	const showModal = () => setModal(true);
	const hideModal = () => setModal(false);
    
	return <>
		<Button
			className="w-100"
			variant="outline-primary"
			onClick={showModal}>
			<Pencil
				className="mx-2" />
            Edit
		</Button>

		<Modal
			fullscreen={true}
			show={modal}
			onHide={hideModal}>
			<Modal.Header
				className="rounded shadow">
				<Row
					className="gx-0 w-100">
					<Col
						md={6}
						sm={12}>
						<Modal.Title>
							<Pencil
								className="mx-2" />
							{view?.name}
						</Modal.Title>
					</Col>
					<Col
						md={6}
						sm={12}>
						<Row
							className="gx-0">
							<Col
								className="p-2">
								<Button
									variant="outline-danger"
									className="w-100"
									onClick={hideModal}>
									<BoxArrowLeft
										className="mx-2" />
									Exit
								</Button>
							</Col>
							<Col
								className="p-2">
								<Button
									variant="primary"
									className="w-100"
									disabled={true}>
									<DeviceSsd
										className="mx-2" />
									Save Changes
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			</Modal.Header>
			<Modal.Body>
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
								<NewComponent appRoute={appRoute} viewRoute={viewRoute} />
							</Col>
						</Row>
						{
							view?.components.map((component, index) => 
								<div
									key={index}>
									<p>{component.type.text}</p>
								</div>)
						}
					</Col>
				</Row>
				
			</Modal.Body>
		</Modal>
	</>;
};

export default EditView;