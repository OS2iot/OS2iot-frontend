export const splitList = <T extends unknown[]>(
  data: T,
  batchSize = 50
): T[] => {
  const dataBatches: typeof data[] = [];
  for (let i = 0; i < data.length; i += batchSize) {
    dataBatches.push(data.slice(i, i + batchSize) as T);
  }

  return dataBatches;
};
