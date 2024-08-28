import type { Tail } from "./type.helper";

export const splitList = <T extends unknown>(data: T[], batchSize = 50): (typeof data)[] => {
  const dataBatches: (typeof data)[] = [];
  for (let i = 0; i < data.length; i += batchSize) {
    dataBatches.push(data.slice(i, i + batchSize));
  }

  return dataBatches;
};

const sortByGeneric = <T, DelegateParams>(
  value: T[],
  order: "asc" | "desc" = "asc",
  sortByDelegate: (arr: typeof value, ...params: DelegateParams[]) => typeof value,
  ...sortByParams: Tail<Parameters<typeof sortByDelegate>>
): T[] => {
  if (!value?.length) {
    return value;
  }

  const copy = sortByDelegate(value, ...sortByParams);
  return order === "asc" ? copy : copy.reverse();
};

const sortByColumnAsc = <T>(value: T[], column: keyof T): T[] => {
  return value.slice().sort((a, b) => (a[column] === b[column] ? 0 : a[column] > b[column] ? 1 : -1));
};

const sortBySelectorAsc = <T>(value: T[], valueSelector: (e: T) => string | number): T[] => {
  return value
    .slice()
    .sort((a, b) => (valueSelector(a) === valueSelector(b) ? 0 : valueSelector(a) > valueSelector(b) ? 1 : -1));
};

export const sortBy = <T>(value: T[], column: keyof T, order: "asc" | "desc" = "asc"): T[] => {
  return sortByGeneric(value, order, sortByColumnAsc, column);
};

export const sortBySelector = <T>(
  value: T[],
  valueSelector: (e: T) => string | number,
  order: "asc" | "desc" = "asc"
): T[] => {
  return sortByGeneric(value, order, sortBySelectorAsc, valueSelector);
};
