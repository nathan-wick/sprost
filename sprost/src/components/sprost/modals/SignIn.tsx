import {Auth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {Button, Modal} from "react-bootstrap";
import React, {useContext, useState} from "react";
import {AuthenticationContext} from "../../../contexts/Authentication";
import GoogleIcon from "../../../assets/images/icons/google.svg";

const SignIn = () => {

    const [
            modal,
            setModal
        ] = useState<boolean>(false),
        [
            signingIn,
            setSigningIn
        ] = useState<boolean>(false),
        authentication = useContext(AuthenticationContext),
        showModal = () => setModal(true),
        hideModal = () => setModal(false),
        signInWith = (provider: "Google" | "Apple" | "Microsoft") => {

            setSigningIn(true);

            switch (provider) {

            case "Google": {

                const googleProvider = new GoogleAuthProvider();
                signInWithPopup(
                    authentication as Auth,
                    googleProvider
                );
                break;

            }
            case "Apple": {

                break;

            }
            case "Microsoft":
            default: {

                break;

            }

            }

            setSigningIn(false);

        };

    return <>
        <Button
            variant="primary"
            size="lg"
            disabled={modal}
            onClick={showModal}>
            Get Started
        </Button>

        <Modal show={modal} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Sign In With
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-grid gap-2">
                    <Button
                        className="my-2"
                        variant="outline-primary"
                        size="lg"
                        disabled={signingIn}
                        onClick={() => signInWith("Google")}>
                        <img
                            src={GoogleIcon}
                            alt="Google"
                            className="mx-2"
                            width="30"
                            height="30" />
                            Google
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    </>;

};

export default SignIn;
