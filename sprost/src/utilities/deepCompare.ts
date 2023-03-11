const deepCompare = (object1: unknown, object2: unknown) => {

    const srt = (newObject: unknown) => JSON.stringify(newObject)?.split("").
        sort().
        join("");
    return srt(object1) === srt(object2);

};

export default deepCompare;
