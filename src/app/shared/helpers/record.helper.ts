export const recordToEntries = <T extends Record<string, unknown>>(
  record: T
) => {
  return Object.keys(record)
    .filter((entry) => isNaN(Number(entry)))
    .map((key: keyof typeof record) => ({
      key,
      value: record[key],
    }));
};
