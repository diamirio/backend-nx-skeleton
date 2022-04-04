/**
 * Fetches a single element from the array if array is homogeneous in types.
 */
export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never
