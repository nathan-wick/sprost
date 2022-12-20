import React, { FC } from "react";
import { Header as HeaderType } from "../../../types/components/Header";

const Header: FC<{ component: HeaderType }> = ({ component }) => {
	return <h1>
		{component.message}
	</h1>;
};

export default Header;