import {Col, Row} from "react-bootstrap";
import React, {Dispatch, FC, SetStateAction} from "react";
import PageCover from "./inputs/page/PageCover";
import PageDescription from "./inputs/page/PageDescription";
import PageIcon from "./inputs/page/PageIcon";
import {View} from "../../types/View";

const PageSettings: FC<{
    view: View,
    setView: Dispatch<SetStateAction<View | undefined>>
}> = ({view, setView}) => <>
    <Row
        className="gx-0">
        <Col
            className="mx-2"
            md={6}
            sm={12}>
            <PageIcon view={view} setView={setView} />
        </Col>
        <Col
            className="mx-2">
            <PageCover view={view} setView={setView} />
        </Col>
    </Row>
    <Row
        className="gx-0">
        <Col>
            <PageDescription view={view} setView={setView} />
        </Col>
    </Row>
</>;

export default PageSettings;
