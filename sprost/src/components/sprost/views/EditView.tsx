import {ArrowsAngleContract, ArrowsAngleExpand, BoxArrowLeft, DeviceSsd,
    Window} from "react-bootstrap-icons";
import {Button, ButtonGroup, Col, Row} from "react-bootstrap";
import {Firestore, doc, setDoc} from "firebase/firestore";
import React, {FC, useContext, useState} from "react";
import {DatabaseContext} from "../../../contexts/Database";
import EditApp from "./EditApp";
import Editor from "../Editor";
import {NavigationContext} from "../Navigation";
import NewComponent from "../modals/NewComponent";
import {User} from "../../../types/User";
import {UserContext} from "../../../contexts/User";
import View from "../../generated/View";
import {View as ViewType} from "../../../types/View";

const EditView: FC<{appRoute: string, viewRoute: string}> = ({appRoute, viewRoute}) => {

    const database = useContext(DatabaseContext),
        user = useContext(UserContext),
        {setCurrentView} = useContext(NavigationContext),
        app = user === "undefined"
            ? "undefined"
            : user.apps.find((userApp) => userApp.route === appRoute) ?? "undefined",
        savedView = app === "undefined"
            ? "undefined"
            : app.views.find((view) => view.route === viewRoute),
        [
            editView,
            setEditView
        ] = useState<ViewType | "undefined">(structuredClone(savedView)),
        [
            isSaving,
            setIsSaving
        ] = useState<boolean>(false),
        [
            previewIsExpanded,
            setPreviewIsExpanded
        ] = useState<boolean>(false),
        exit = () => {

            setCurrentView(<EditApp appRoute={String(appRoute)} />);

        },
        saveUser = async () => {

            setIsSaving(true);
            if (user !== "undefined") {

                const newView: ViewType = structuredClone(editView),
                    newUser: User = structuredClone(user),
                    newUserAppViews = newUser.apps.find((userApp: {
                        route: string;
                    }) => userApp.route === appRoute)?.views ?? "undefined",
                    newUserAppViewIndex = newUserAppViews === "undefined"
                        ? "undefined"
                        : newUserAppViews.findIndex((view: {
                                route: string;
                            }) => view.route === viewRoute) ?? "undefined",
                    userReference = doc(
                        database as Firestore,
                        "users",
                        user.id
                    );
                if (newUserAppViews !== "undefined" && newUserAppViewIndex !== "undefined") {

                    newUserAppViews[newUserAppViewIndex] = newView;
                    newView.isSaved = true;
                    await setDoc(
                        userReference,
                        newUser,
                        {"merge": true}
                    );
                    setEditView(newView);

                }

            }
            setIsSaving(false);

        };

    return <>
        <Row
            className="gx-0 my-5 mx-2">
            <Col
                lg={6}
                md={4}
                sm={12}>
                <h1>
                    <Window
                        className="mx-2" />
                    {editView === "undefined"
                        ? ""
                        : editView.name}
                </h1>
            </Col>
            <Col
                className="p-2">
                <ButtonGroup
                    className="w-100 shadow">
                    <Button
                        variant={editView === "undefined"
                            ? "primary"
                            : editView.isSaved
                                ? "primary"
                                : "danger"}
                        onClick={exit}>
                        <BoxArrowLeft
                            className="mx-2" />
                        Exit
                    </Button>
                    <Button
                        variant={"primary"}
                        onClick={() => setPreviewIsExpanded(!previewIsExpanded)}>
                        {
                            previewIsExpanded
                                ? <ArrowsAngleContract
                                    className="mx-2" />
                                : <ArrowsAngleExpand
                                    className="mx-2" />
                        }
                        Preview
                    </Button>
                    <Button
                        variant={"primary"}
                        // eslint-disable-next-line no-extra-parens
                        disabled={isSaving || (editView !== "undefined" && editView?.isSaved)}
                        onClick={saveUser}>
                        <DeviceSsd
                            className="mx-2" />
                        {isSaving
                            ? "Saving..."
                            : editView === "undefined"
                                ? "saved"
                                : editView.isSaved
                                    ? "saved"
                                    : "save"}
                    </Button>
                </ButtonGroup>
            </Col>
        </Row>
        <Row
            className="gx-0 my-5 mx-2">
            <Col
                md={previewIsExpanded
                    ? 12
                    : 6}
                sm={12}
                className={previewIsExpanded
                    ? ""
                    : "d-none d-lg-block"}>
                <div
                    className="m-2 mb-4 rounded shadow">
                    {
                        editView !== "undefined" &&
                            <View view={editView} />
                    }
                </div>
            </Col>
            <Col>
                <Row
                    className="gx-0">
                    <Col
                        className="p-2">
                        <NewComponent editView={editView} setEditView={setEditView} />
                    </Col>
                </Row>
                {
                    editView !== "undefined" &&
                        editView.components.map((component, index) => <Editor
                            key={index}
                            componentId={component.id}
                            editView={editView}
                            setEditView={setEditView}/>)
                }
            </Col>
        </Row>
    </>;

};

export default EditView;
