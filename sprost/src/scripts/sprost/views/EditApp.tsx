import {App as AppIcon, BoxSeam, ColumnsGap, InfoCircle, Pencil, Signpost, Tag, Window,
    WindowStack} from "react-bootstrap-icons";
import {Button, Col, Row} from "react-bootstrap";
import React, {FC, useContext} from "react";
import EditView from "./EditView";
import {NavigationContext} from "../Navigation";
import NewRelease from "../modals/NewRelease";
import NewView from "../modals/NewView";
import {UserContext} from "../../User";

const EditApp: FC<{ appRoute: string }> = ({appRoute}) => {

    const user = useContext(UserContext),
        {setCurrentView} = useContext(NavigationContext),
        app = user?.apps.find((userApp) => userApp.route === appRoute),
        views = app?.views;

    return <>
        <Row
            className="gx-0 mx-5 mt-5">
            <Col
                lg={6}
                md={4}
                sm={12}>
                <h1>
                    <AppIcon
                        className="mx-2" />
                    {app?.name}
                </h1>
            </Col>
            <Col
                className="text-end">
                <NewRelease app={app} />
            </Col>
        </Row>
        <Row
            className="gx-0 p-3">
            <Col
                lg={4}
                md={6}
                sm={12} >
                <div
                    className={`m-3 p-2 shadow rounded bg-${user?.theme.name === "dark"
                        ? "black"
                        : "white"}`}>
                    <h3
                        className="mb-3">
                        <InfoCircle
                            className="mx-2" />
                        App Information
                    </h3>
                    <small>
                        <Tag
                            className="mx-2"/>
                        Name: <b>{app?.name}</b>
                    </small>
                    <br />
                    <small>
                        <Signpost
                            className="mx-2" />
                        Route: sprost.com/{user?.route}/<b>{app?.route}</b>
                    </small>
                    <br />
                    <small>
                        <BoxSeam
                            className="mx-2" />
                        Version: <b>{app?.version.major}.
                            {app?.version.minor}.{app?.version.patch}</b>
                    </small>
                </div>
            </Col>
        </Row>
        <Row
            className="gx-0 mx-5 mt-5">
            <Col
                lg={6}
                md={4}
                sm={12}>
                <h1>
                    <WindowStack
                        className="mx-2" />
                    Views
                </h1>
            </Col>
            <Col
                className="text-end">
                <NewView appRoute={appRoute} />
            </Col>
        </Row>
        <Row
            className="gx-0 p-3">
            {
                views?.map((view) => <Col
                    key={view.route}
                    lg={4}
                    md={6}
                    sm={12}>
                    <div
                        className={`m-3 p-2 shadow rounded bg-${user?.theme.name === "dark"
                            ? "black"
                            : "white"}`}>
                        <h3
                            className="mb-3">
                            <Window
                                className="mx-2" />
                            {view.name}
                        </h3>
                        <small>
                            <Tag
                                className="mx-2" />
                            Name: <b>{view.name}</b>
                        </small>
                        <br />
                        <small>
                            <Signpost
                                className="mx-2" />
                            Route: sprost.com/{user?.route}/{app?.route}/<b>{view.route}</b>
                        </small>
                        <br />
                        <small>
                            <ColumnsGap
                                className="mx-2" />
                            Type: <b>{view.type}</b>
                        </small>
                        <Row
                            className="mt-4 gx-0">
                            <Col
                                sm={12}
                                className="p-1">
                                <Button
                                    className="w-100"
                                    variant="primary"
                                    onClick={() => setCurrentView(<EditView
                                        appRoute={appRoute} viewRoute={view.route} />)}>
                                    <Pencil
                                        className="mx-2" />
                                    Edit
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>)
            }
        </Row>
    </>;

};

export default EditApp;
