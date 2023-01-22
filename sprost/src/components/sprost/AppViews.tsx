import {Button, Col, Row} from "react-bootstrap";
import {ColumnsGap, Pencil, Signpost,
    Tag, Window, WindowStack} from "react-bootstrap-icons";
import React, {FC, useContext} from "react";
import {App} from "../../types/App";
import EditView from "./EditView";
import {NavigationContext} from "./Navigation";
import NewView from "./modals/NewView";
import {UserContext} from "../../contexts/User";

const AppViews: FC<{ app: App }> = ({app}) => {

    const user = useContext(UserContext),
        {setCurrentView} = useContext(NavigationContext),
        {views} = app;

    return <>
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
                <NewView appRoute={app.route} />
            </Col>
        </Row>
        <Row
            className="gx-0 p-3">
            {views?.map((view) => <Col
                key={`${app.route}-app-view-${view.route}`}
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
                            : user.route}/{app?.route}/<b>{view.route}</b>
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
                                    appRoute={app.route} viewRoute={view.route} />)}>
                                <Pencil
                                    className="mx-2" />
                                Edit
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Col>)}
        </Row>
    </>;

};

export default AppViews;
