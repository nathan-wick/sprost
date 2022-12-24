import { Auth, signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../contexts/Auth";

const SignIn = () => {
    const [ signingOut, setSigningOut ] = useState<boolean>(false);
    const auth = useContext(AuthContext);
    
    return <Button 
            variant="secondary"
            size="lg"
            disabled={signingOut}
            onClick={() => {
                setSigningOut(true);
                signOut(auth as Auth);
                setSigningOut(false);
            }}>
                Sign Out
    </Button>
}

export default SignIn;