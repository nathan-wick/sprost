import React, {FC} from "react";
import {Header as HeaderType} from "../../../types/components/Header";

const Header: FC<{component: HeaderType}> = ({component}) => <div
    className={`d-flex align-items-center p-4 rounded
        ${component.background === "color" && "bg-primary"}
        ${component.background === "image" && "parallax"}
        ${component.size === "small" && "minimum-height-small"}
        ${component.size === "medium" && "minimum-height-medium"}
        ${component.size === "large" && "minimum-height-large"}
        ${component.alignment === "left" && "justify-content-start"}
        ${component.alignment === "center" && "justify-content-center"}
        ${component.alignment === "right" && "justify-content-end"}`}
    style={component.background === "image"
        ? {"backgroundImage": `url(${component.image})`}
        : {}
    }>
    <h1>
        <span
            className="p-2 bg-white rounded">
            {component.message}
        </span>
    </h1>
</div>;

export default Header;
