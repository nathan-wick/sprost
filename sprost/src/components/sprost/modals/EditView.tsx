import React, { useState } from "react";
import { Button, ButtonGroup, Col, Modal, Row } from "react-bootstrap";
import { DeviceSsd, Pencil, PlusCircle, X, XLg } from "react-bootstrap-icons";

const EditView = (props: any) => {
	const view = props.view;
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
							{view.name}
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
								<Button
									variant="primary"
									className="w-100">
									<PlusCircle
										className="mx-2" />
									New Component
								</Button>
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