import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { InfoCircle } from "react-bootstrap-icons";

const Information = (props: any) => {
    const [ modal, setModal ] = useState<boolean>(false);
    const showModal = () => setModal(true);
    const hideModal = () => setModal(false);
    
    return <>
        <Button 
            variant="link"
            disabled={modal}
            onClick={showModal}>
                <InfoCircle
                    className="mx-2" />
        </Button>

        <Modal show={modal} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.text}
            </Modal.Body>
        </Modal>
    </>
}

export default Information;