import {View} from "../types/View";

const moveComponent = (view: View | undefined, componentId: string, direction: "up" | "down") => {

    const newView: View = structuredClone(view);
    if (newView) {

        const component =
            newView.components.find((viewComponent) => viewComponent.id === componentId);
        if (component) {

            const currentComponentIndex = newView.components.indexOf(component),
                desiredComponentIndex = direction === "up"
                    ? currentComponentIndex - 1
                    : currentComponentIndex + 1;
            newView.components.splice(
                desiredComponentIndex,
                0,
                newView.components.splice(
                    currentComponentIndex,
                    1
                )[0]
            );
            newView.isSaved = false;

        }

    }
    return newView;

};

export default moveComponent;
