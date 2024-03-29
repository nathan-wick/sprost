
import React, {FC} from "react";
import {Component as ComponentType} from "../../types/Component";
import Header from "./Header";
import Paragraph from "./Paragraph";
import Title from "./Title";
import {View as ViewType} from "../../types/View";

const View: FC<{view: ViewType}> = ({view}) => <>
    {
        view?.components.map((component: ComponentType) => {

            switch (component.type.id) {

            case "header":
                return <Header
                    key={`${component.id}-component`}
                    component={component.type}/>;
            case "title":
                return <Title
                    key={`${component.id}-component`}
                    component={component.type}/>;
            case "paragraph":
            default:
                return <Paragraph
                    key={`${component.id}-component`}
                    component={component.type}/>;

            }

        })
    }
</>;

export default View;
