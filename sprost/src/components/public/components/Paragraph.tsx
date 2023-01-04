import React, {FC} from "react";
import {
    Paragraph as ParagraphType
} from "../../../types/components/Paragraph";

const Paragraph: FC<{component: ParagraphType}> = ({component}) => <p>
    {component.message}
</p>;

export default Paragraph;
