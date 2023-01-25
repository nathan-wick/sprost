import {Col, Row} from "react-bootstrap";
import React, {Dispatch, FC, SetStateAction} from "react";
import {FileEarmark} from "react-bootstrap-icons";
import PageCover from "./inputs/page/PageCover";
import PageDescription from "./inputs/page/PageDescription";
import PageIcon from "./inputs/page/PageIcon";
import {View} from "../../types/View";

const PageSettings: FC<{
        editView: View,
        setEditView: Dispatch<SetStateAction<View | "undefined">>
    }> = ({editView, setEditView}) => <div
        className="m-2 p-2 rounded shadow">
        <Row
            className="gx-0">
            <Col
                md={6}
                sm={12}>
                <h3>
                    <FileEarmark
                        className="mx-2"/>
                    Page
                </h3>
            </Col>
        </Row>
        <Row
            className="gx-0">
            <Col
                className="mx-2"
                md={6}
                sm={12}>
                <PageIcon editView={editView} setEditView={setEditView} />
            </Col>
            <Col
                className="mx-2">
                <PageCover editView={editView} setEditView={setEditView} />
            </Col>
        </Row>
        <Row
            className="gx-0">
            <Col>
                <PageDescription editView={editView} setEditView={setEditView} />
            </Col>
        </Row>
    </div>;

export default PageSettings;
