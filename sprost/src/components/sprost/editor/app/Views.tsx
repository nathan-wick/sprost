import {Button, Col, Row} from "react-bootstrap";
import {Pencil, Signpost, Tag, WindowStack} from "react-bootstrap-icons";
import React, {FC, useContext} from "react";
import {App} from "../../../../types/App";
import NewView from "../../modals/NewView";
import {UserContext} from "../../../../contexts/User";
import {View} from "../../../../types/View";

const Views: FC<{
    app: App | undefined,
    setView: React.Dispatch<React.SetStateAction<View | undefined>>,
    viewsRef: React.MutableRefObject<HTMLHeadingElement | null>
}> = ({app, setView, viewsRef}) => {

    const user = useContext(UserContext);

    return <>
        <Row
            className="gx-0 mt-4">
            <Col>
                <h1
                    ref={viewsRef}>
                    <WindowStack
                        className="mx-2" />
                    Views
                </h1>
            </Col>
            <Col
                className="text-end">
                <NewView
                    appRoute={app?.route ?? ""} />
            </Col>
        </Row>
        <Row
            className="gx-0">
            {
                app?.views.map((appView) => <Col
                    key={`${app.route}-app-view-${appView.route}`}
                    lg={4}
                    md={6}
                    sm={12}>
                    <div
                        className="m-4 p-2 shadow rounded">
                        <h3
                            className="mb-4">
                            <img
                                src={appView.icon}
                                height={40}
                                width={40}
                                className="mx-2 rounded"
                                referrerPolicy="no-referrer"
                                alt={`${appView.name} icon`} />
                            {appView.name}
                        </h3>
                        <small>
                            <Tag
                                className="mx-2" />
                            Name: <b>{appView.name}</b>
                        </small>
                        <br />
                        <small>
                            <Signpost
                                className="mx-2" />
                            Route: sprost.com/{user === "undefined"
                                ? "undefined"
                                : user.route}/{app?.route}/<b>
                                {appView.route}</b>
                        </small>
                        <Button
                            className="mt-4 w-100 bg-gradient text-white shadow"
                            variant="primary"
                            onClick={() => setView(appView)}>
                            <Pencil
                                className="mx-2" />
                            Edit
                        </Button>
                    </div>
                </Col>)
            }
        </Row>
    </>;

};

export default Views;
