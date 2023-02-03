import {Component} from "../types/Component";

const deleteComponent = (components: Component[], component: Component) => {

    const newComponents = structuredClone(components),
        componentIndex = newComponents.indexOf(component);
    newComponents.splice(
        componentIndex,
        1
    );
    return newComponents;

};

export default deleteComponent;
