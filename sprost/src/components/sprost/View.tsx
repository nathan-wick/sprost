import {ArrowsAngleContract, ArrowsAngleExpand, ColumnsGap, Window} from "react-bootstrap-icons";
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import {Firestore, doc, setDoc} from "firebase/firestore";
import React, {FC, useContext, useEffect, useState} from "react";
import {DatabaseContext} from "../../contexts/Database";
import SharedView from "../shared/View";
import {User} from "../../types/User";
import {UserContext} from "../../contexts/User";
import ViewComponents from "./ViewComponents";
import ViewSettings from "./ViewSettings";
import {View as ViewType} from "../../types/View";

const View: FC<{appRoute: string, viewRoute: string}> = ({appRoute, viewRoute}) => {

    const database = useContext(DatabaseContext),
        user = useContext(UserContext),
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
            previewIsExpanded,
            setPreviewIsExpanded
        ] = useState<boolean>(false),
        [
            currentView,
            setCurrentView
        ] = useState<JSX.Element>(editView === "undefined"
            ? <></>
            : <ViewSettings
                editView={editView}
                setEditView={setEditView} />),
        saveChanges = async () => {

            if (user !== "undefined" && editView !== "undefined" && editView.isSaved === false) {

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

        };

    useEffect(
        () => {

            saveChanges();

        },
        [editView]
    );

    return <>
        {
            editView !== "undefined" &&
                <>
                    <Navbar
                        expand="lg">
                        <Container>
                            <Navbar.Brand>
                                <img
                                    src={editView.icon}
                                    height={20}
                                    width={20}
                                    className="mx-2 rounded"
                                    referrerPolicy="no-referrer"
                                    alt={`${editView.name} icon`} />
                                {editView.name}
                            </Navbar.Brand>
                            <Navbar.Toggle
                                aria-controls="app-navbar-nav" />
                            <Navbar.Collapse
                                id="app-navbar-nav">
                                <Nav
                                    className="me-auto">
                                    <Nav.Link
                                        onClick={() => {

                                            setPreviewIsExpanded(false);
                                            setCurrentView(app === "undefined"
                                                ? <></>
                                                : <ViewSettings
                                                    editView={editView}
                                                    setEditView={setEditView} />);

                                        }}>
                                        <Window
                                            className="mx-2" />
                                    View
                                    </Nav.Link>
                                    <Nav.Link
                                        onClick={() => {

                                            setPreviewIsExpanded(false);
                                            setCurrentView(app === "undefined"
                                                ? <></>
                                                : <ViewComponents
                                                    editView={editView}
                                                    setEditView={setEditView} />);

                                        }}>
                                        <ColumnsGap
                                            className="mx-2" />
                                    Components
                                    </Nav.Link>
                                </Nav>
                                <Nav>
                                    <Nav.Link
                                        onClick={() => setPreviewIsExpanded(!previewIsExpanded)}>
                                        {
                                            previewIsExpanded
                                                ? <ArrowsAngleContract
                                                    className="mx-2" />
                                                : <ArrowsAngleExpand
                                                    className="mx-2" />
                                        }
                                    Preview
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Row
                        className="gx-0 m-2">
                        <Col>
                            {
                                !previewIsExpanded && currentView
                            }
                        </Col>
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
                                <SharedView
                                    view={editView} />
                            </div>
                        </Col>
                    </Row>
                </>
        }
    </>;

};

export default View;
