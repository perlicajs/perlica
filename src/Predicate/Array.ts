import * as P from ".";

// -------------------------------------------------------------------------------------------------
// Instances
// -------------------------------------------------------------------------------------------------

/**
 * Any typed array
 *
 * @category Instances
 */
export type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;

// -------------------------------------------------------------------------------------------------
// Predicates
// -------------------------------------------------------------------------------------------------

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `value` is length less or equal to a pre-defined `count`.
 *
 * @category Predicate
 * @example
 * import { max } from "perlica/Predicate/Array"
 *
 * const predicate = max(5);
 *
 * expect(predicate([1, 2, 3, 4])).toBeTrue();
 * expect(predicate([1, 2, 3, 4, 5])).toBeFalse();
 */
export const maxLen = <T>(count: number): P.Predicate<T[]> =>
  value => value.length <= count;

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `value` is length greater or equal to a pre-defined `count`.
 *
 * @category Predicate
 * @example
 * import { min } from "perlica/Predicate/Array"
 *
 * const predicate = min(4);
 *
 * expect(predicate([1, 2, 3, 4])).toBeTrue();
 * expect(predicate([1, 2, 3])).toBeFalse();
 */
export const minLen = <T>(count: number): P.Predicate<T[]> =>
  value => value.length >= count;

/**
 * Returns a new `Predicate<T>`.
 * Return `true` if `value` is length equal to a pre-defined `count`.
 *
 * @category Predicate
 * @example
 * import { len } from "perlica/Predicate/Array"
 *
 * const predicate = len(4);
 *
 * expect(predicate([1, 2, 3, 4])).toBeTrue();
 * expect(predicate([1, 2])).toBeFalse();
 * expect(predicate([1, 2, 3, 4, 5])).toBeFalse();
 */
export const len = <T>(count: number): P.Predicate<T[]> =>
  value => value.length === count;

// -------------------------------------------------------------------------------------------------
// Guards
// -------------------------------------------------------------------------------------------------

/**
 * Returns `true` if `value` is `Array`, otherwise returns `false`.
 *
 * @category Guard
 * @example
 * import { isArray } from "perlica/Predicate"
 *
 * expect(isArray([])).toBeTrue();
 * expect(isArray(4)).toBeFalse();
 * expect(isArray(null)).toBeFalse();
 * expect(isArray(true)).toBeFalse();
 */
export const isArray: P.Guard<unknown, unknown[]> = P.isArray;

/**
 * Returns `true` if `self` is empty, otherwise returns `false`.
 *
 * @category Guard
 * @example
 * import { isEmpty } from "perlica/Predicate/Array"
 *
 * expect(isEmpty([4])).toBeFalse();
 * expect(isEmpty([])).toBeTrue();
 */
export const isEmpty = <T>(self: T[]): self is [] => self.length === 0;

/**
 * Returns `true` if `self` is not empty, otherwise returns `false`.
 *
 * @category Guard
 * @example
 * import { isNonEmpty } from "perlica/Predicate/Array"
 *
 * expect(isEmpty([4])).toBeTrue();
 * expect(isEmpty([])).toBeFalse();
 */
export const isNonEmpty = <T>(self: T[]): self is [T, ...T[]] => self.length !== 0;

/**
 * Returns `true` if `value` is `TypedArray`, otherwise returns `false`.
 *
 * @category Guards
 */
export const isTypedArray: P.Guard<unknown, TypedArray> = (value: unknown): value is TypedArray =>
  ArrayBuffer.isView(value);

/**
 * Returns `true` if `value` is `Int8Array`, otherwise returns `false`.
 *
 * @category Guards
 */
export const isInt8Array: P.Guard<unknown, Int8Array> = (value: unknown): value is Int8Array =>
  value instanceof Int8Array;

/**
 * Returns `true` if `value` is `Uint8Array`, otherwise returns `false`.
 *
 * @category Guards
 */
export const isUint8Array: P.Guard<unknown, Uint8Array> = (value: unknown): value is Uint8Array =>
  value instanceof Uint8Array;

/**
 * Returns `true` if `value` is `Uint8ClampedArray`, otherwise returns `false`.
 *
 * @category Guards
 */
export const isUint8ClampedArray: P.Guard<unknown, Uint8ClampedArray>
  = (value: unknown): value is Uint8ClampedArray =>
    value instanceof Uint8ClampedArray;

/**
 * Returns `true` if `value` is `Int16Array`, otherwise returns `false`.
 *
 * @category Guards
 */
export const isInt16Array: P.Guard<unknown, Int16Array> = (value: unknown): value is Int16Array =>
  value instanceof Int16Array;

/**
 * Returns `true` if `value` is `Uint16Array`, otherwise returns `false`.
 *
 * @category Guards
 */
export const isUint16Array: P.Guard<unknown, Uint16Array>
  = (value: unknown): value is Uint16Array =>
    value instanceof Uint16Array;

/**
 * Returns `true` if `value` is `Int32Array`, otherwise returns `false`.
 *
 * @category Guards
 */
export const isInt32Array: P.Guard<unknown, Int32Array>
  = (value: unknown): value is Int32Array =>
    value instanceof Int32Array;

/**
 * Returns `true` if `value` is `Uint32Array`, otherwise returns `false`.
 *
 * @category Guards
 */
export const isUint32Array: P.Guard<unknown, Uint32Array>
  = (value: unknown): value is Uint32Array =>
    value instanceof Uint32Array;

/**
 * Returns `true` if `value` is `Float32Array`, otherwise returns `false`.
 *
 * @category Guards
 */
export const isFloat32Array: P.Guard<unknown, Float32Array>
  = (value: unknown): value is Float32Array =>
    value instanceof Float32Array;

/**
 * Returns `true` if `value` is `Float64Array`, otherwise returns `false`.
 *
 * @category Guards
 */
export const isFloat64Array: P.Guard<unknown, Float64Array>
  = (value: unknown): value is Float64Array =>
    value instanceof Float64Array;

/**
 * Returns `true` if `value` is `BigInt64Array`, otherwise returns `false`.
 *
 * @category Guards
 */
export const isBigInt64Array: P.Guard<unknown, BigInt64Array>
  = (value: unknown): value is BigInt64Array =>
    value instanceof BigInt64Array;

/**
 * Returns `true` if `value` is `BigUint64Array`, otherwise returns `false`.
 *
 * @category Guards
 */
export const isBigUint64Array: P.Guard<unknown, BigUint64Array>
  = (value: unknown): value is BigUint64Array =>
    value instanceof BigUint64Array;
