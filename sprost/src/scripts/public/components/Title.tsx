import React, {FC} from "react";
import {Title as TitleType} from "../../../types/components/Title";

const Title: FC<{component: TitleType}> = ({component}) => {

    let titleComponent: JSX.Element = <></>;
    switch (component.size) {

    case "large":
        titleComponent = <h2>
            {component.message}
        </h2>;
        break;
    case "medium":
        titleComponent = <h3>
            {component.message}
        </h3>;
        break;
    case "small":
    default:
        titleComponent = <h4>
            {component.message}
        </h4>;
        break;

    }

    return titleComponent;

};

export default Title;
