export const splitList = <T extends unknown>(
  data: T[],
  batchSize = 50
): typeof data[] => {
  const dataBatches: typeof data[] = [];
  for (let i = 0; i < data.length; i += batchSize) {
    dataBatches.push(data.slice(i, i + batchSize));
  }

  return dataBatches;
};

export const sortBy = <T>(
  value: T[],
  column: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  if (!value?.length) {
    return value;
  }

  const copy = value.slice();
  copy.sort((a, b) =>
    a[column] === b[column] ? 0 : a[column] > b[column] ? 1 : -1
  );

  return order === 'asc' ? copy : copy.reverse();
};
