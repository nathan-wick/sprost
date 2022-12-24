import React, { FC } from "react";
import { View as ViewType } from "../../types/View";
import { Component as ComponentType } from "../../types/Component";
import Header from "./components/Header";
import Title from "./components/Title";
import Paragraph from "./components/Paragraph";

const View: FC<{ view: ViewType }> = ({ view }) => {
	return <>
		{
			view?.components.map((component: ComponentType) => {
				switch(component.type.id) {
				case "header":
					return <Header
						key={component.id}
						component={component.type}/>;
				case "title":
					return <Title
						key={component.id}
						component={component.type}/>;
				case "paragraph":
					return <Paragraph
						key={component.id}
						component={component.type}/>;
				}
			})
		}
	</>;
};

export default View;