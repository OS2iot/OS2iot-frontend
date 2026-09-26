import { KeyValue } from "@shared/types/tuple.type";
import { Metadata } from "@shared/types/metadata";
import { TranslatableError } from "@shared/translatable-error";

export const metadataToKeyValueList = (metadata: object, shouldThrowOnError = false): KeyValue[] => {
  try {
    const tags: KeyValue[] = [];

    for (const key of Object.keys(metadata)) {
      tags.push({ key, value: metadata[key] });
    }

    return tags;
  } catch (error) {
    if (shouldThrowOnError) {
      throw error;
    }
  }
};

export const keyValueListToMetadata = (pairs: KeyValue[]): Metadata => {
  const metadata = {}

  for (const pair of pairs) {
    const key = pair.key?.trim();
    const value = pair.value?.trim();
    if (!key) {
      throw new TranslatableError("ERROR.METADATA-EMPTY-KEY");
    } else if (key in metadata) {
      throw new TranslatableError("ERROR.METADATA-DUPLICATE-KEY", { key });
    }
    if (!value) {
      throw new TranslatableError("ERROR.METADATA-EMPTY-VALUE", { key });
    }
    metadata[key] = value
  }

  return metadata;
};
