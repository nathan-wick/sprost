import {Component} from "../types/Component";

const moveComponent = (components: Component[], component: Component, direction: "up" | "down") => {

    const newComponents = structuredClone(components),
        currentComponentIndex = components.indexOf(component),
        desiredComponentIndex = direction === "up"
            ? currentComponentIndex - 1
            : currentComponentIndex + 1;
    newComponents.splice(
        desiredComponentIndex,
        0,
        newComponents.splice(
            currentComponentIndex,
            1
        )[0]
    );
    return newComponents;

};

export default moveComponent;
