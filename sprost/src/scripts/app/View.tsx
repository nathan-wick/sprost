import React, { FC } from "react";
import { App as AppType } from "../../types/App";
import { View as ViewType } from "../../types/View";
import { Component as ComponentType } from "../../types/Component";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Title from "./components/Title";
import Paragraph from "./components/Paragraph";

const View: FC<{ app: AppType, view?: ViewType }> = ({ app, view }) => {
	return <>
		<Navigation app={app} />
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