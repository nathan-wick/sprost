import {View} from "../types/View";

const deleteComponent = (view: View | undefined, componentId: string) => {

    const newView: View = structuredClone(view);
    if (newView) {

        const component =
            newView.components.find((viewComponent) => viewComponent.id === componentId);
        if (component) {

            const componentIndex = newView.components.indexOf(component);
            newView.components.splice(
                componentIndex,
                1
            );
            newView.isSaved = false;

        }

    }
    return newView;

};

export default deleteComponent;
