import {Col, Row} from "react-bootstrap";
import React, {Dispatch, FC, SetStateAction} from "react";
import {Gear} from "react-bootstrap-icons";
import PageCover from "../../inputs/page/PageCover";
import PageDescription from "../../inputs/page/PageDescription";
import PageIcon from "../../inputs/page/PageIcon";
import {View} from "../../../../types/View";

const Settings: FC<{
    view: View,
    setView: Dispatch<SetStateAction<View | undefined>>,
    settingsRef: React.MutableRefObject<HTMLHeadingElement | null>
}> = ({view, setView, settingsRef}) => <>
    <h1
        ref={settingsRef}
        className="mt-4">
        <Gear
            className="mx-4" />
        Settings
    </h1>
    <Row
        className="gx-0">
        <Col
            md={6}
            sm={12}>
            <div
                className="m-4 p-2 rounded shadow">
                <PageIcon
                    view={view}
                    setView={setView} />
            </div>
        </Col>
        <Col
            md={6}
            sm={12}>
            <div
                className="m-4 p-2 rounded shadow">
                <PageCover
                    view={view}
                    setView={setView} />
            </div>
        </Col>
    </Row>
    <div
        className="m-4 p-2 rounded shadow">
        <PageDescription
            view={view}
            setView={setView} />
    </div>
</>;

export default Settings;
