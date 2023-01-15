import {Button, Col, Form, Image, Modal, Row} from "react-bootstrap";
import React, {FC, useContext, useEffect, useRef, useState} from "react";
import {getDownloadURL, list, ref, uploadBytesResumable} from "firebase/storage";
import {Image as ImageIcon} from "react-bootstrap-icons";
import {StorageContext} from "../../../contexts/Storage";
import {UserContext} from "../../../contexts/User";

const ImageSelector: FC<{
    setInput: React.Dispatch<React.SetStateAction<string>>
}> = ({setInput}) => {

    const user = useContext(UserContext),
        storage = useContext(StorageContext),
        [
            modal,
            setModal
        ] = useState<boolean>(false),
        [
            userImages,
            setUserImages
        ] = useState<string[]>([]),
        inputRef = useRef<HTMLInputElement>(null),
        [
            error,
            setError
        ] = useState<string>("undefined"),
        [
            progress,
            setProgress
        ] = useState<number>(100),
        getUserImages = async () => {

            if (user !== "undefined" && storage !== "undefined") {

                const userImagesReference = ref(
                        storage,
                        `users/${user.id}`
                    ),
                    firstUserImages = await list(
                        userImagesReference,
                        {"maxResults": 20}
                    ),
                    newUserImagePaths: string[] = [],
                    newUserImages: string[] = [];
                firstUserImages.items.forEach((userImage) => {

                    newUserImagePaths.push(userImage.fullPath);

                });
                for await (const newUserImagePath of newUserImagePaths) {

                    const newUserImageReference = ref(
                            storage,
                            newUserImagePath
                        ),
                        newUserImage = await getDownloadURL(newUserImageReference);
                    newUserImages.push(newUserImage);

                }
                setUserImages(newUserImages);

            }

        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        uploadNewImage = (newImage: any) => {

            const newImageStorageReference = user === "undefined" || storage === "undefined"
                ? "undefined"
                : ref(
                    storage,
                    `users/${user.id}/${newImage.name}`
                );
            if (newImageStorageReference !== "undefined") {

                const uploadTask = uploadBytesResumable(
                    newImageStorageReference,
                    newImage
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
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                            setInput(downloadURL);
                            setModal(false);

                        });

                    }
                );

            }

        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validateNewImage = (event: any) => {

            const [newImage] = event.target.files;
            if (newImage) {

                if (newImage.size > 1048576) {

                    setError("Portrait cannot be more than 1MB in size");

                } else {

                    uploadNewImage(newImage);
                    setError("undefined");

                }

            } else {

                setError("Please upload an image");

            }

        };

    useEffect(
        () => {

            if (modal && userImages) {

                getUserImages();

            }

        },
        [modal]
    );

    return <>
        <Button
            className="w-100"
            variant="primary"
            onClick={() => setModal(true)}>
            <ImageIcon
                className="mx-2" />
            Select Image
        </Button>

        <Modal
            show={modal}
            size="lg"
            onHide={() => setModal(false)}>
            <Modal.Header
                className="bg-primary bg-gradient text-white">
                <Modal.Title>
                    <ImageIcon
                        className="mx-2" />
                    Select Image
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    userImages &&
                        <Row
                            className="gx-0">
                            {
                                userImages.map((userImage) => <Col
                                    key={userImage}
                                    className="overlay-container"
                                    lg={3}
                                    md={4}
                                    sm={6}
                                    onClick={() => {

                                        setInput(userImage);
                                        setModal(false);

                                    }}>
                                    <Image
                                        src={userImage}
                                        alt={"Image option"}
                                        referrerPolicy="no-referrer"
                                        className="rounded w-100"/>
                                    <div
                                        className="overlay rounded">
                                        <p
                                            className="align-center text-white">
                                            Select
                                        </p>
                                    </div>
                                </Col>)
                            }
                        </Row>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="outline-secondary"
                    className="m-2"
                    onClick={() => setModal(false)}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    className="m-2"
                    onClick={() => inputRef.current?.click()}
                    disabled={progress !== 100}>
                    Upload New
                </Button>
                <Form.Control
                    ref={inputRef}
                    className="d-none"
                    type="file"
                    accept="image/*"
                    onChange={validateNewImage} />
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
            </Modal.Footer>
        </Modal>
    </>;

};

export default ImageSelector;
