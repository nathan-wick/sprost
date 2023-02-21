const moveElement = (
    elements: unknown[],
    elementToMoveIndex: number,
    direction: "up" | "down"
) => {

    const newElements = structuredClone(elements),
        desiredComponentIndex = direction === "up"
            ? elementToMoveIndex - 1
            : elementToMoveIndex + 1;
    newElements.splice(
        desiredComponentIndex,
        0,
        newElements.splice(
            elementToMoveIndex,
            1
        )[0]
    );
    return newElements;

};

export default moveElement;
