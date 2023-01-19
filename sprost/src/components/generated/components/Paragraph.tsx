import {Col, Row} from "react-bootstrap";
import React, {FC} from "react";
import {
    Paragraph as ParagraphType
} from "../../../types/components/Paragraph";

const Paragraph: FC<{component: ParagraphType}> = ({component}) => <Row
    className="gx-0 d-flex justify-content-md-center p-4">
    <Col
        md={6}
        sm={12}>
        <p>
            {component.message}
        </p>
    </Col>
</Row>;

export default Paragraph;
