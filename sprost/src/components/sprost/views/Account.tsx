import { useContext } from "react";
import { UserContext } from "../../User";
import SignOut from "../SignOut";

const Account = () => {
    const user = useContext(UserContext);

    return <>
    <h1>Account</h1>
    <p>{user?.name}</p>
    <SignOut />
</>;
}

export default Account;