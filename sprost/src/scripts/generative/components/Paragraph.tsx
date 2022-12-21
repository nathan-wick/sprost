import React, { FC } from "react";
import { Paragraph as ParagraphType } from "../../../types/components/Paragraph";

const Paragraph: FC<{ component: ParagraphType }> = ({ component }) => {
	return <p>
		{component.message}
	</p>;
};

export default Paragraph;