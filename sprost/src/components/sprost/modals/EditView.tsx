import React, { FC, useContext, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { DeviceSsd, Pencil, XLg } from "react-bootstrap-icons";
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
						lg={3}
						sm={12}>
						<Modal.Title>
							<Pencil
								className="mx-2" />
							{view?.name}
						</Modal.Title>
					</Col>
					<Col
						lg={9}
						sm={12}>
						<Row
							className="gx-0">
							<Col
								lg={4}
								sm={12}
								className="p-1">
								<Button
									variant="outline-secondary"
									className="w-100"
									onClick={hideModal}>
									<XLg
										className="mx-2" />
									Exit
								</Button>
							</Col>
							<Col
								lg={4}
								sm={12}
								className="p-1">
								<NewComponent appRoute={appRoute} viewRoute={viewRoute} />
							</Col>
							<Col
								lg={4}
								sm={12}
								className="p-1">
								<Button
									variant="primary"
									className="w-100"
									disabled={true}>
									<DeviceSsd
										className="mx-2" />
									Save & Exit
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			</Modal.Header>
			<Modal.Body>
				
			</Modal.Body>
		</Modal>
	</>;
};

export default EditView;