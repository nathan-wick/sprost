import {Component} from "../types/Component";

const setComponent = (components: Component[], component: Component) => {

    const newComponents: Component[] = structuredClone(components),
        newComponentIndex =
        newComponents.findIndex((newComponent) => newComponent.id ===
                component.id);
    if (newComponentIndex >= 0) {

        newComponents[newComponentIndex] = component;

    } else {

        newComponents.push(component);

    }
    return newComponents;

};

export default setComponent;
