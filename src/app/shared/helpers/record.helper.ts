export const recordToEntries = <T extends Record<string, unknown>>(record: T, isEnum = true) => {
    return Object.keys(record)
        .filter(entry => !isEnum || isNaN(Number(entry)))
        .map((key: keyof typeof record) => ({
            key,
            value: record[key],
        }));
};
