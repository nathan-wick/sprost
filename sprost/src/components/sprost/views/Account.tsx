import { doc, Firestore, setDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Bookmarks, DeviceSsd, Envelope, Eye } from "react-bootstrap-icons";
import { Color } from "../../../types/Color";
import { User } from "../../../types/User";
import { DatabaseContext } from "../../Database";
import { UserContext } from "../../User";
import SignOut from "../SignOut";

const Account = () => {
    const database = useContext(DatabaseContext);
    const user = useContext(UserContext);
    const [ nameInput, setNameInput ] = useState<string>();
    const [ emailInput, setEmailInput ] = useState<string>();
    const [ themeInput, setThemeInput ] = useState<Color>();
    const [ canSave, setCanSave ] = useState<boolean>(false);

    // TODO: Input Validation

    const themeOptions = [
        {
            value: `light`,
            text: `Light`,
        },
        {
            value: `dark`,
            text: `Dark`,
        },
    ];

    useEffect(() => {
        setNameInput(user?.name);
        setEmailInput(user?.email);
        setThemeInput(user?.theme);
    }, [ user ]);

    useEffect(() => {
        nameInput === user?.name &&
        emailInput === user?.email &&
        themeInput === user?.theme ?
            setCanSave(false) :
            setCanSave(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ user, emailInput, nameInput, themeInput ]);

    const onNameChange = (event: any) => {
        setNameInput(event.target.value);
    };

    const onEmailChange = (event: any) => {
        setEmailInput(event.target.value);
    };

    const onThemeChange = (event: any) => {
        setThemeInput({ name: event.target.value });
    };

    const onSubmit = async (event: any) => {
        event.preventDefault();
        if (user) {
            const userInputData: Partial<User> = {
                name: nameInput,
                email: emailInput,
                theme: themeInput,
            };
            const userReference = doc(database as Firestore, "users", user.id);
            await setDoc(userReference, userInputData, { merge: true });
        }
    };

    return <>
        <h1
            className="my-3 mx-5">
            Account
        </h1>
        <hr
            className="my-3 mx-5" />
        <Row
            className="gx-0 my-3">
            <Col
                lg={3}
                md={12}
                className="text-center">
                <img
                    src={user?.portrait}
                    alt={`${user?.name}'s portrait`}
                    className="w-50 my-3 border border-2 rounded-circle" />
            </Col>
            <Col
                lg={9}
                md={12}>
                <Form
                    className="my-3 mx-5"
                    onSubmit={onSubmit}>
                    <Form.Group
                        className="my-3">
                        <Form.Label>
                            <Bookmarks
                                className="mx-2" />
                            Name
                        </Form.Label>
                        <Form.Control
                            className={user?.theme.name === `dark` ? `bg-black text-light` : `bg-white text-dark`}
                            type="text"
                            placeholder="Enter name"
                            onChange={onNameChange}
                            defaultValue={user?.name} />
                    </Form.Group>
                    <Form.Group
                        className="my-3">
                        <Form.Label>
                            <Envelope
                                className="mx-2" />
                            Email
                        </Form.Label>
                        <Form.Control
                            className={user?.theme.name === `dark` ? `bg-black text-light` : `bg-white text-dark`}
                            type="email"
                            placeholder="Enter email"
                            onChange={onEmailChange}
                            defaultValue={user?.email} />
                    </Form.Group>
                    <Form.Group
                        className="my-3">
                        <Form.Label>
                            <Eye
                                className="mx-2" />
                            Theme
                        </Form.Label>
                        <Form.Select
                            className={user?.theme.name === `dark` ? `bg-black text-light` : `bg-white text-dark`}
                            onChange={onThemeChange}
                            value={themeInput?.name}>
                            {
                                themeOptions.map(themeOption =>
                                    <option
                                        key={themeOption.value}
                                        value={themeOption.value}>
                                        {themeOption.text}
                                    </option>)
                            }
                        </Form.Select>
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        className="m-2"
                        disabled={!canSave}>
                        <DeviceSsd
                            className="mx-2" />
                        Save Preferences
                    </Button>
                    <SignOut />
                </Form>
            </Col>
        </Row>
    </>;
}

export default Account;