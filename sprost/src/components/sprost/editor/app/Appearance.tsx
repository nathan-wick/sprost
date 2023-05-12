import {Col, Row} from "react-bootstrap";
import React, {FC} from "react";
import {App} from "../../../../types/App";
import AppCover from "../../inputs/app/AppCover";
import AppLogo from "../../inputs/app/AppLogo";
import {Brush} from "react-bootstrap-icons";
import NewAppDomain from "../../modals/NewAppDomain";

const Appearance: FC<{
    app: App | undefined,
    setApp: React.Dispatch<React.SetStateAction<App | undefined>>,
    appearanceRef: React.MutableRefObject<HTMLHeadingElement | null>
}> = ({app, setApp, appearanceRef}) => <>
    <h1
        ref={appearanceRef}
        className="mt-4">
        <Brush
            className="mx-4" />
        Appearance
    </h1>
    <Row
        className="gx-0">
        <Col
            md={6}
            sm={12}>
            {
                app &&
                    <AppLogo
                        editApp={app}
                        setEditApp={setApp} />
            }
        </Col>
        <Col
            md={6}
            sm={12}>
            {
                app &&
                    <AppCover
                        editApp={app}
                        setEditApp={setApp} />
            }
        </Col>
        <Col
            md={6}
            sm={12}>
            {
                app &&
                    <NewAppDomain
                        app={app} />
            }
        </Col>
    </Row>
</>;

export default Appearance;
