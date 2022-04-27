import { KeyValue } from '@shared/types/tuple.type';

export const jsonToList = (
  json: string,
  shouldThrowOnError = false
): KeyValue[] => {
  try {
    const deserialized = JSON.parse(json) as Record<string, string>;

    const tags: KeyValue[] = [];

    for (const key of Object.keys(deserialized)) {
      tags.push({ key, value: deserialized[key] });
    }

    return tags;
  } catch (error) {
    if (shouldThrowOnError) {
      throw error;
    }
  }
};
