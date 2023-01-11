import {App as AppIcon, BoxArrowUpRight, ColumnsGap, Pencil, Signpost, SignpostFill,
    Tag, Window, WindowStack} from "react-bootstrap-icons";
import {Button, Col, Row} from "react-bootstrap";
import React, {FC, useContext} from "react";
import Description from "../inputs/app/Description";
import EditView from "./EditView";
import {NavigationContext} from "../Navigation";
import NewRelease from "../modals/NewRelease";
import NewView from "../modals/NewView";
import {UserContext} from "../../../contexts/User";

const EditApp: FC<{ appRoute: string }> = ({appRoute}) => {

    const user = useContext(UserContext),
        {setCurrentView} = useContext(NavigationContext),
        app = user === "undefined"
            ? "undefined"
            : user.apps.find((userApp) => userApp.route === appRoute) ?? "undefined",
        views = app === "undefined"
            ? "undefined"
            : app.views;

    return <>
        <h1
            className="mx-5 mt-5">
            <AppIcon
                className="mx-2" />
            {app === "undefined"
                ? "undefined"
                : app.name}
        </h1>
        <Row
            className="gx-0 justify-content-md-center">
            <Col
                lg={8}
                md={10}
                sm={12}>
                <div
                    className="m-5 p-2 shadow rounded">
                    <Row
                        className="gx-0">
                        <Col
                            md={4}
                            sm={12}
                            className="p-2">
                            <Button
                                className="w-100"
                                variant="primary"
                                disabled={
                                    app !== "undefined" &&
                                    app.version.major <= 0 &&
                                    app.version.minor <= 0 &&
                                    app.version.patch <= 0
                                }>
                                <BoxArrowUpRight
                                    className="mx-2" />
                                Open {app === "undefined"
                                    ? "undefined"
                                    : app.name}
                            </Button>
                        </Col>
                        <Col
                            md={4}
                            sm={12}
                            className="p-2">
                            <Button
                                className="w-100"
                                variant="primary">
                                <SignpostFill
                                    className="mx-2" />
                                Edit Route
                            </Button>
                        </Col>
                        <Col
                            md={4}
                            sm={12}
                            className="p-2">
                            <Col
                                className="text-end">
                                <NewRelease app={app} />
                            </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Description app={app} />
                    </Row>
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
                views !== "undefined" && views?.map((view) => <Col
                    key={view.route}
                    lg={4}
                    md={6}
                    sm={12}>
                    <div
                        className="m-3 p-2 shadow rounded">
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
                            Route: sprost.com/{user === "undefined"
                                ? "undefined"
                                : user.route}/{app === "undefined"
                                ? "undefined"
                                : app?.route}/<b>{view.route}</b>
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
