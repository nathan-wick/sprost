import { Auth, signOut } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { BoxArrowRight } from "react-bootstrap-icons";
import { AuthenticationContext } from "../Authentication";

const SignIn = () => {
	const [ signingOut, setSigningOut ] = useState<boolean>(false);
	const authentication = useContext(AuthenticationContext);
    
	return <Button 
		variant="secondary"
		className="m-2"
		disabled={signingOut}
		onClick={() => {
			setSigningOut(true);
			signOut(authentication as Auth);
			setSigningOut(false);
		}}>
		<BoxArrowRight
			className="mx-2" />
            Sign Out
	</Button>;
};

export default SignIn;