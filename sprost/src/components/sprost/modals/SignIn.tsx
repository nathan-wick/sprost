import { Auth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AuthContext } from "../../../contexts/Auth";

const SignIn = () => {
    const [ modal, setModal ] = useState<boolean>(false);
    const [ signingIn, setSigningIn ] = useState<boolean>(false);
    const auth = useContext(AuthContext);
    const showModal = () => setModal(true);
    const hideModal = () => setModal(false);

    const signInWith = (provider: 'Google' | 'Apple' | 'Microsoft') => {
        setSigningIn(true);

        switch(provider) {
            case 'Google': {
                const googleProvider = new GoogleAuthProvider();
                signInWithPopup(auth as Auth, googleProvider);
                break;
            }
            case 'Apple': {

                break;
            }
            case 'Microsoft': {

                break;
            }
        }

        setSigningIn(false);
    }
    
    return <>
        <Button 
            variant="primary"
            size="lg"
            disabled={modal}
            onClick={showModal}>
                Sign In
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
                        variant="primary"
                        size="lg"
                        disabled={signingIn}
                        onClick={() => signInWith('Google')}>
                            Google
                    </Button>
                    <Button
                        variant="primary"
                        size="lg"
                        disabled={signingIn}
                        onClick={() => signInWith('Apple')}>
                            Apple
                    </Button>
                    <Button
                        variant="primary"
                        size="lg"
                        disabled={signingIn}
                        onClick={() => signInWith('Microsoft')}>
                            Microsoft
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    </>
}

export default SignIn;