export const enumToEntries = <T extends Record<string, string | number>>(
  someEnum: T
) => {
  return Object.keys(someEnum)
    .filter((entry) => isNaN(Number(entry)))
    .map((key: keyof typeof someEnum) => ({
      key,
      value: someEnum[key],
    }));
};
