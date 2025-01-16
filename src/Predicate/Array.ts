import * as predicate from ".";

/**
 * Returns `true` if `value` is `Array`, otherwise returns `false`.
 *
 * ```ts
 * import { isArray } from "perlica/Predicate"
 *
 * expect(isArray([])).toBeTrue();
 * expect(isArray(4)).toBeFalse();
 * expect(isArray(null)).toBeFalse();
 * expect(isArray(true)).toBeFalse();
 * ```
 */
export const isArray: (value: unknown) => value is unknown[] = predicate.isArray;

/**
 * Returns `true` if `self` is empty, otherwise returns `false`.
 *
 * ```ts
 * import { isEmpty } from "perlica/Predicate/Array"
 *
 * expect(isEmpty([4])).toBeFalse();
 * expect(isEmpty([])).toBeTrue();
 * ```
 */
export const isEmpty = <T>(self: T[]): self is [] => self.length === 0;

/**
 * Returns `true` if `self` is not empty, otherwise returns `false`.
 *
 * ```ts
 * import { isNonEmpty } from "perlica/Predicate/Array"
 *
 * expect(isEmpty([4])).toBeTrue();
 * expect(isEmpty([])).toBeFalse();
 * ```
 */
export const isNonEmpty = <T>(self: T[]): self is [T, ...T[]] => self.length !== 0;

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `value` is length less or equal to a pre-defined `count`.
 * ```
 * import { max } from "perlica/Predicate/Array"
 *
 * const predicate = max(5);
 *
 * expect(predicate([1, 2, 3, 4])).toBeTrue();
 * expect(predicate([1, 2, 3, 4, 5])).toBeFalse();
 * ```
 */
export const max = <T>(count: number): predicate.Predicate<T[]> =>
  value => value.length <= count;

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `value` is length greater or equal to a pre-defined `count`.
 * ```
 * import { min } from "perlica/Predicate/Array"
 *
 * const predicate = min(4);
 *
 * expect(predicate([1, 2, 3, 4])).toBeTrue();
 * expect(predicate([1, 2, 3])).toBeFalse();
 * ```
 */
export const min = <T>(count: number): predicate.Predicate<T[]> =>
  value => value.length >= count;

/**
 * Returns a new `Predicate<T>`.
 * Return `true` if `value` is length equal to a pre-defined `count`.
 * ```
 * import { len } from "perlica/Predicate/Array"
 *
 * const predicate = len(4);
 *
 * expect(predicate([1, 2, 3, 4])).toBeTrue();
 * expect(predicate([1, 2])).toBeFalse();
 * expect(predicate([1, 2, 3, 4, 5])).toBeFalse();
 * ```
 */
export const len = <T>(count: number): predicate.Predicate<T[]> =>
  value => value.length === count;
