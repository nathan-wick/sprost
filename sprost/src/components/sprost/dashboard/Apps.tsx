import {Button, Col, Row} from "react-bootstrap";
import {Grid, Pencil, Signpost, Tag} from "react-bootstrap-icons";
import React, {FC, useContext} from "react";
import EditorView from "../editor/EditorView";
import {NavigationContext} from "../../../contexts/Navigation";
import NewApp from "../modals/NewApp";
import {UserContext} from "../../../contexts/User";

const Apps: FC<{
    appsRef: React.MutableRefObject<HTMLHeadingElement | null>
}> = ({appsRef}) => {

    const user = useContext(UserContext),
        {setCurrentView} = useContext(NavigationContext);

    return <>
        <Row
            className="gx-0 mt-4">
            <Col>
                <h1
                    ref={appsRef}>
                    <Grid
                        className="mx-2" />
                    Apps
                </h1>
            </Col>
            <Col
                className="text-end">
                <NewApp />
            </Col>
        </Row>
        <Row
            className="gx-0">
            {
                user !== "undefined" && user.apps.map((app, index) => <Col
                    key={index}
                    lg={4}
                    md={6}
                    sm={12}>
                    <div
                        className="m-4 p-2 shadow rounded">
                        <h3
                            className="mb-4">
                            <img
                                src={app.logo}
                                height={40}
                                width={40}
                                className="mx-2 rounded"
                                referrerPolicy="no-referrer"
                                alt={`${app.name} logo`} />
                            {app.name}
                        </h3>
                        <small>
                            <Tag
                                className="mx-2" />
                            {app.name}
                        </small>
                        <br />
                        <small>
                            <Signpost
                                className="mx-2" />
                            sprost.com/{user.route}/{app.route}
                        </small>
                        <Button
                            className="mt-4 w-100 bg-gradient text-white shadow"
                            variant="primary"
                            onClick={() => setCurrentView(<EditorView
                                appRoute={app.route} />)}>
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

export default Apps;
