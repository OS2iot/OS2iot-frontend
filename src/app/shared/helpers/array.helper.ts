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
