export type keyofType<Value, ValuePropType> = {
  [k in keyof Value]: Value[k] extends ValuePropType ? k : never;
}[keyof Value];
export type keyofNumber<Value> = keyofType<Value, number>;
export const nameof = <T>(name: Extract<keyof T, string>): string => name;

/**
 * Tail<T> returns a tuple with the first element removed
 * so Tail<[1, 2, 3]> is [2, 3]
 * (works by using rest tuples)
 *
 * @see https://stackoverflow.com/a/56370310
 */
export type Tail<T extends unknown[]> = ((...t: T) => void) extends (h: unknown, ...r: infer R) => void ? R : never;
