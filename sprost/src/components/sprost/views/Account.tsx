import { useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Bookmarks, Envelope, Eye, Upload } from "react-bootstrap-icons";
import { UserContext } from "../../User";
import Information from "../modals/Information";
import SignOut from "../SignOut";

const Account = () => {
    const user = useContext(UserContext);

    // TODO: Finish Form and save input to the database

    return <>
    <h1
        className="my-3 mx-5">
        Account
        <Information
            title="Account"
            text="Every Sprost user has an account. Accounts enable users to save their preferences, apps, statistics, etc. to the cloud and access them anywhere. Sprost will never share your personal information with anyone else." />
    </h1>
    <hr
        className="my-3 mx-5" />
    <Row
        className="gx-0 my-3">
        <Col
            lg={3}
            md={6}
            sm={12}
            className="text-center">
            <img
                src={user?.portrait}
                alt={`${user?.name}'s portrait`}
                className="w-50 my-3 border border-2 border-dark rounded-circle" />
            <p>
                {user?.name}
            </p>
            <SignOut />
        </Col>
        <Col
            lg={9}
            md={6}
            sm={12}>
            <Form
                className="my-3 mx-5">
                <Form.Group
                    controlId="userNameForm"
                    className="my-3">
                    <Form.Label>
                        <Bookmarks
                            className="mx-2" />
                        Name
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name" />
                </Form.Group>
                <Form.Group
                    controlId="userEmailForm"
                    className="my-3">
                    <Form.Label>
                        <Envelope
                            className="mx-2" />
                        Email
                    </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email" />
                </Form.Group>
                <Form.Group
                    controlId="userThemeForm"
                    className="my-3">
                    <Form.Label>
                        <Eye
                            className="mx-2" />
                        Theme
                    </Form.Label>
                    <Form.Select>
                        <option>
                            Light
                        </option>
                        <option>
                            Dark
                        </option>
                    </Form.Select>
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    className="my-3">
                    <Upload
                        className="mx-2" />
                    Save
                </Button>
            </Form>
        </Col>
    </Row>
</>;
}

export default Account;