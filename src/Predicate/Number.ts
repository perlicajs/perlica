import * as P from ".";

// -------------------------------------------------------------------------------------------------
// Predicates
// -------------------------------------------------------------------------------------------------

/**
 * Returns `true` if `value > 0`, otherwise returns `false`.
 *
 *
 * @category Predicate
 * @example
 * import { isPositive } from "perlica/Predicate/Number"
 *
 * expect(isPositive(0)).toBeFalse();
 * expect(isPositive(4)).toBeTrue();
 * expect(isPositive(-4)).toBeFalse();
 */
export const isPositive: P.Predicate<number> = (value: number): boolean => value > 0;

/**
 * Returns `true` if `value >= 0`, otherwise returns `false`.
 *
 *
 * @category Predicate
 * @example
 * import { isNonNegative } from "perlica/Predicate/Number"
 *
 * expect(isNonNegative(0)).toBeTrue();
 * expect(isNonNegative(4)).toBeTrue();
 * expect(isNonNegative(-4)).toBeFalse();
 */
export const isNonNegative: P.Predicate<number> = (value: number): boolean => value >= 0;

/**
 * Returns `true` if `value < 0`, otherwise returns `false`.
 *
 *
 * @category Predicate
 * @example
 * import { isNegative } from "perlica/Predicate/Number"
 *
 * expect(isNegative(0)).toBeFalse();
 * expect(isNegative(4)).toBeFalse();
 * expect(isNegative(-4)).toBeTrue();
 */
export const isNegative: P.Predicate<number> = (value: number): boolean => value < 0;

/**
 * Returns `true` if `value <= 0`, otherwise returns `false`.
 *
 *
 * @category Predicate
 * @example
 * import { isNonPositive } from "perlica/Predicate/Number"
 *
 * expect(isNonPositive(0)).toBeTrue();
 * expect(isNonPositive(4)).toBeFalse();
 * expect(isNonPositive(-4)).toBeTrue();
 */
export const isNonPositive: P.Predicate<number> = (value: number): boolean => value <= 0;

/**
 * Returns `true` if `value` is finite, not `Infinity` or `-Infinity`, otherwise returns `false`.
 *
 *
 * @category Predicate
 * @example
 * import { isFinite } from "perlica/Predicate/Number"
 *
 * expect(isFinite(4 / 2)).toBeTrue();
 * expect(isFinite(4 / 0)).toBeFalse();
 */
export const isFinite: P.Predicate<number> = (value: number): boolean => Number.isFinite(value);

/**
 * Returns a new `Predicate<T>`.
 * Returns true if `value` is evenly divisible by a pre-defined `that`.
 *
 * @category Predicate
 * @example
 * import { multipleOf } from "perlica/Predicate/Number"
 *
 * const predicate = multipleOf(2);
 *
 * expect(predicate(4)).toBeTrue();
 * expect(predicate(3)).toBeFalse();
 */
export const multipleOf = (that: number): P.Predicate<number> =>
  value => (value % that) === 0;

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `value` is less than a pre-defined `that`.
 *
 * @category Predicate
 * @example
 * import { lt } from "perlica/Predicate/Number"
 *
 * const predicate = lt(4);
 *
 * expect(predicate(5)).toBeFalse();
 * expect(predicate(4)).toBeFalse();
 * expect(predicate(3)).toBeTrue();
 */
export const lt = (that: number): P.Predicate<number> => value => value < that;

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `value` is greater than a pre-defined `that`.
 *
 * @category Predicate
 * @example
 * import { gt } from "perlica/Predicate/Number"
 *
 * const predicate = gt(4);
 *
 * expect(predicate(5)).toBeTrue();
 * expect(predicate(4)).toBeFalse();
 * expect(predicate(3)).toBeFalse();
 */
export const gt = (that: number): P.Predicate<number> => value => value > that;

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `value` is less than or equal to a pre-defined `that`.
 *
 * @category Predicate
 * @example
 * import { le } from "perlica/Predicate/Number"
 *
 * const predicate = le(4);
 *
 * expect(predicate(5)).toBeFalse();
 * expect(predicate(4)).toBeTrue();
 * expect(predicate(3)).toBeTrue();
 */
export const le = (that: number): P.Predicate<number> => value => value <= that;

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `value` is greater than or equal to a pre-defined `that`.
 *
 * @category Predicate
 * @example
 * import { ge } from "perlica/Predicate/Number"
 *
 * const predicate = ge(4);
 *
 * expect(predicate(5)).toBeTrue();
 * expect(predicate(4)).toBeTrue();
 * expect(predicate(3)).toBeFalse();
 */
export const ge = (that: number): P.Predicate<number> => value => value >= that;

// -------------------------------------------------------------------------------------------------
// Guards
// -------------------------------------------------------------------------------------------------

/**
 * Returns `true` if `value` is `number`, otherwise returns `false`.
 *
 * @category Guard
 * @example
 * import { isNumber } from "perlica/Predicate/Number"
 *
 * expect(isNumber(4)).toBeTrue();
 * expect(isNumber(4.4)).toBeTrue();
 *
 * expect(isNumber(null)).toBeFalse();
 * expect(isNumber(true)).toBeFalse();
 * expect(isNumber("hello")).toBeFalse();
 */
export const isNumber: P.Guard<unknown, number> = P.isNumber;

/**
 * Returns `true` if `value` is `integer`, otherwise returns `false`.
 *
 * @category Guard
 * @example
 * import { isInteger } from "perlica/Predicate/Number"
 *
 * expect(isInteger(4)).toBeTrue();
 * expect(isInteger(4.4)).toBeFalse();
 */
export const isInteger: P.Guard<unknown, number> = P.isInteger;
