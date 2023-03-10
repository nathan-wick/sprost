import {Col, Row} from "react-bootstrap";
import React, {FC} from "react";
import {App} from "../../../../types/App";
import AppCover from "../../inputs/app/AppCover";
import AppLogo from "../../inputs/app/AppLogo";
import {Brush} from "react-bootstrap-icons";

const Appearance: FC<{
    app: App | undefined,
    setApp: React.Dispatch<React.SetStateAction<App | undefined>>,
    appearanceRef: React.MutableRefObject<HTMLHeadingElement | null>
}> = ({app, setApp, appearanceRef}) => <>
    <h1
        ref={appearanceRef}
        className="mt-4">
        <Brush
            className="mx-2" />
        Appearance
    </h1>
    <Row
        className="gx-0">
        <Col
            md={6}
            sm={12}>
            <div
                className="m-4 p-2 shadow rounded">
                {
                    app &&
                        <AppLogo
                            editApp={app}
                            setEditApp={setApp} />
                }
            </div>
        </Col>
        <Col
            md={6}
            sm={12}>
            <div
                className="m-4 p-2 shadow rounded">
                {
                    app &&
                        <AppCover
                            editApp={app}
                            setEditApp={setApp} />
                }
            </div>
        </Col>
    </Row>
</>;

export default Appearance;
