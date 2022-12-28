const createUniqueString = (currentStrings: string[]) => {

    const createString = () => Math.random().toString(36).
            slice(-8),
        findDuplicate =
            (newString: string) => currentStrings.find((currentString) => currentString ===
                newString);
    let newString = createString(),
        duplicateString = findDuplicate(newString);
    while (duplicateString) {

        newString = createString();
        duplicateString = findDuplicate(newString);

    }
    return newString;

};

export default createUniqueString;
