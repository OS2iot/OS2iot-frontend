export type keyofType<Value, ValuePropType> = {
  [k in keyof Value]: Value[k] extends ValuePropType ? k : never;
}[keyof Value];
export type keyofNumber<Value> = keyofType<Value, number>;
export const nameof = <T>(name: Extract<keyof T, string>): string => name;
