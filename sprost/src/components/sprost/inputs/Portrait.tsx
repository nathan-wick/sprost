import {Col, Form, Row} from "react-bootstrap";
import {Firestore, doc, updateDoc} from "firebase/firestore";
import React, {useContext, useState} from "react";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {Camera} from "react-bootstrap-icons";
import {DatabaseContext} from "../../../contexts/Database";
import {StorageContext} from "../../../contexts/Storage";
import {User} from "../../../types/User";
import {UserContext} from "../../../contexts/User";

const Portrait = () => {

    const database = useContext(DatabaseContext),
        user = useContext(UserContext),
        userReference = user === "undefined"
            ? "undefined"
            : doc(
                database as Firestore,
                "users",
                user.id
            ),
        storage = useContext(StorageContext),
        [
            error,
            setError
        ] = useState<string>("undefined"),
        [
            progress,
            setProgress
        ] = useState<number>(100),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        savePortrait = (newPortrait: any) => {

            const portraitStorageReference = user === "undefined" || storage === "undefined"
                ? "undefined"
                : ref(
                    storage,
                    `users/${user.id}/${newPortrait.name}`
                );
            if (portraitStorageReference !== "undefined") {

                const uploadTask = uploadBytesResumable(
                    portraitStorageReference,
                    newPortrait
                );
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {

                        const uploadProgress =
                            Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
                        setProgress(uploadProgress);

                    },
                    (uploadError) => {

                        setProgress(100);
                        setError(`Failed to upload. ${uploadError.message}`);

                    },
                    () => {

                        setProgress(100);
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

                            if (downloadURL && userReference !== "undefined") {

                                const userInputData: Partial<User> = {
                                    "portrait": downloadURL
                                };
                                await updateDoc(
                                    userReference,
                                    userInputData
                                );

                            }

                        });

                    }
                );

            }

        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        changePortrait = (event: any) => {

            const [newPortrait] = event.target.files;
            if (newPortrait) {

                if (newPortrait.size > 1048576) {

                    setError("Portrait cannot be more than 1MB in size");

                } else {

                    savePortrait(newPortrait);
                    setError("undefined");

                }

            } else {

                setError("Please upload an image");

            }

        };

    return <Form.Group
        className="my-4">
        <Row
            className="gx-0">
            <Col
                md="auto"
                className="text-center px-3">
                <img
                    src={user === "undefined"
                        ? "undefined"
                        : user.portrait}
                    alt={`${user === "undefined"
                        ? "undefined"
                        : user.name}'s portrait`}
                    referrerPolicy="no-referrer"
                    className="border border-2 rounded-circle"
                    height={80}
                    width={80} />
            </Col>
            <Col>
                <Form.Label>
                    <Camera
                        className="mx-2" />
                    Portrait
                </Form.Label>
                <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={changePortrait} />
            </Col>
        </Row>
        {
            error !== "undefined" &&
            <p
                className="text-danger">
                {error}
            </p>
        }
        {
            progress < 100 &&
            <p
                className="text-success">
                Uploading... {progress}% complete
            </p>
        }
    </Form.Group>;

};

export default Portrait;
