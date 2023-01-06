import {BoxSeam, RocketTakeoffFill} from "react-bootstrap-icons";
import {Button, Form, FormGroup, Modal} from "react-bootstrap";
import {Firestore, doc, setDoc, updateDoc} from "firebase/firestore";
import React, {FC, useContext, useState} from "react";
import {App} from "../../../types/App";
import {DatabaseContext} from "../../../contexts/Database";
import {ToasterContext} from "../../../contexts/Toaster";
import {User} from "../../../types/User";
import {UserContext} from "../../../contexts/User";

const NewRelease: FC<{
    app: App | "undefined",
}> = ({app}) => {

    let version = app === "undefined"
        ? "undefined"
        : structuredClone(app.version);
    const database = useContext(DatabaseContext),
        user = useContext(UserContext),
        toaster = useContext(ToasterContext),
        [
            modal,
            setModal
        ] = useState<boolean>(false),
        [
            releaseType,
            setReleaseType
        ] = useState<string>("minor"),
        [
            newVersion,
            setNewVersion
        ] = useState<{ major: number, minor: number, patch: number } | "undefined">(version
            ? {
                "major": version.major,
                "minor": version.minor += 1,
                "patch": version.patch
            }
            : "undefined"),
        [
            isLoading,
            setIsLoading
        ] = useState<boolean>(false),
        releaseTypeOptions = [
            {
                "text": "Major",
                "value": "major"
            },
            {
                "text": "Minor",
                "value": "minor"
            },
            {
                "text": "Patch",
                "value": "patch"
            }
        ],
        onReleaseTypeChange = (event: { target: { value: string; }; }) => {

            setReleaseType(event.target.value);
            version = app === "undefined"
                ? "undefined"
                : structuredClone(app.version);
            if (version) {

                switch (event.target.value) {

                case "major":
                    setNewVersion({
                        "major": version.major += 1,
                        "minor": version.minor,
                        "patch": version.patch
                    });
                    break;
                case "minor":
                    setNewVersion({
                        "major": version.major,
                        "minor": version.minor += 1,
                        "patch": version.patch
                    });
                    break;
                case "patch":
                default:
                    setNewVersion({
                        "major": version.major,
                        "minor": version.minor,
                        "patch": version.patch += 1
                    });
                    break;

                }

            }

        },
        reset = () => {

            setReleaseType("minor");
            version = app === "undefined"
                ? "undefined"
                : structuredClone(app.version);
            setNewVersion(version
                ? {
                    "major": version.major,
                    "minor": version.minor += 1,
                    "patch": version.patch
                }
                : "undefined");
            setIsLoading(false);
            setModal(false);

        },
        showModal = () => setModal(true),
        hideModal = () => reset(),
        onSubmit = async () => {

            setIsLoading(true);
            if (user !== "undefined" && app && newVersion) {

                const newApp = app === "undefined"
                    ? "undefined"
                    : user.apps.find((newUserApp) => newUserApp.route === app.route) ?? "undefined";
                if (newApp !== "undefined" && newVersion !== "undefined") {

                    newApp.version = newVersion;
                    const userReference = doc(
                            database as Firestore,
                            "users",
                            user.id
                        ),
                        publicUserReference = doc(
                            database as Firestore,
                            "public",
                            user.route
                        ),
                        newPublicUser: Partial<User> = {
                            "apps": user.apps
                        };
                    await setDoc(
                        userReference,
                        user,
                        {"merge": true}
                    );
                    await updateDoc(
                        publicUserReference,
                        newPublicUser
                    );
                    if (toaster !== "undefined") {

                        toaster.createToast(
                            "success",
                            "New Release",
                            // eslint-disable-next-line max-len
                            `Successfully released ${newApp.name} version ${newApp.version.major}.${newApp.version.minor}.${newApp.version.patch}.`
                        );

                    }

                }

            }
            hideModal();

        };

    return <>
        <Button
            className="w-50 shadow"
            disabled={app !== "undefined" && app.views.length
                ? app.views.length < 1
                : true}
            variant="primary"
            onClick={showModal}>
            <RocketTakeoffFill
                className="mx-2" />
            Release
        </Button>

        <Modal
            show={modal}
            onHide={hideModal}
            className="text-dark">
            <Modal.Header
                className="bg-primary bg-gradient text-white">
                <Modal.Title>
                    <RocketTakeoffFill
                        className="mx-2" />
                    Release
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup>
                        <Form.Label>
                            <BoxSeam
                                className="mx-2" />
                            Release Size
                        </Form.Label>
                        <Form.Select
                            onChange={onReleaseTypeChange}
                            value={releaseType}>
                            {
                                releaseTypeOptions.map((releaseTypeOption) => <option
                                    key={releaseTypeOption.text}
                                    value={releaseTypeOption.value}>
                                    {releaseTypeOption.text}
                                </option>)
                            }
                        </Form.Select>
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="outline-secondary"
                    className="m-2"
                    onClick={hideModal}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    className="m-2"
                    disabled={isLoading}
                    onClick={onSubmit}>
                    {
                        isLoading || newVersion === "undefined"
                            ? <>Loading...</>
                            : <>
                                Release Version {newVersion?.major}.
                                {newVersion?.minor}.{newVersion?.patch}
                            </>
                    }
                </Button>
            </Modal.Footer>
        </Modal>
    </>;

};

export default NewRelease;
