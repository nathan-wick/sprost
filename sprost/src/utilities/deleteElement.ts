const deleteElement = (elements: unknown[], elementToDeleteIndex: number) => {

    const newElements = structuredClone(elements);
    newElements.splice(
        elementToDeleteIndex,
        1
    );
    return newElements;

};

export default deleteElement;
