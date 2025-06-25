import * as P from ".";

// -------------------------------------------------------------------------------------------------
// Predicates
// -------------------------------------------------------------------------------------------------

/**
 * Returns `true` if `value > 0`, otherwise returns `false`.
 *
 * @category Predicate
 * @example
 * import { isPositive } from "perlica/Predicate/BigInt"
 *
 * expect(isPositive(0n)).toBeFalse();
 * expect(isPositive(4n)).toBeTrue();
 * expect(isPositive(-4n)).toBeFalse();
 */
export const isPositive: P.Predicate<bigint> = (value: bigint) => value > 0;

/**
 * Returns `true` if `value >= 0`, otherwise returns `false`.
 *
 * @category Predicate
 * @example
 * import { isNonNegative } from "perlica/Predicate/BigInt"
 *
 * expect(isNonNegative(0n)).toBeTrue();
 * expect(isNonNegative(4n)).toBeTrue();
 * expect(isNonNegative(-4n)).toBeFalse();
 */
export const isNonNegative: P.Predicate<bigint> = (value: bigint) => value >= 0;

/**
 * Returns `true` if `value < 0`, otherwise returns `false`.
 *
 * @category Predicate
 * @example
 * import { isNegative } from "perlica/Predicate/BigInt"
 *
 * expect(isNegative(0n)).toBeFalse();
 * expect(isNegative(4n)).toBeFalse();
 * expect(isNegative(-4n)).toBeTrue();
 */
export const isNegative: P.Predicate<bigint> = (value: bigint) => value < 0;

/**
 * Returns `true` if `value <= 0`, otherwise returns `false`.
 *
 * @category Predicate
 * @example
 * import { isNonPositive } from "perlica/Predicate/BigInt"
 *
 * expect(isNonPositive(0n)).toBeTrue();
 * expect(isNonPositive(4n)).toBeFalse();
 * expect(isNonPositive(-4n)).toBeTrue();
 */
export const isNonPositive: P.Predicate<bigint> = (value: bigint) => value <= 0;

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `value` is evenly divisible by a pre-defined `that`.
 *
 * @category Predicate
 * @example
 * import { multipleOf } from "perlica/Predicate/BigInt"
 *
 * const predicate = multipleOf(2n);
 *
 * expect(predicate(4n)).toBeTrue();
 * expect(predicate(3n)).toBeFalse();
 */
export const multipleOf = (that: bigint): P.Predicate<bigint> =>
  value => (value % that) === 0n;

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `that` is less than a pre-defined `value`.
 *
 * @category Predicate
 * @example
 * import { lt } from "perlica/Predicate/BigInt"
 *
 * const predicate = lt(4n);
 *
 * expect(predicate(5n)).toBeFalse();
 * expect(predicate(4n)).toBeFalse();
 * expect(predicate(3n)).toBeTrue();
 */
export const lt = (that: bigint): P.Predicate<bigint> => value => value < that;

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `that` is greater than a pre-defined `value`.
 *
 * @category Predicate
 * @example
 * import { gt } from "perlica/Predicate/BigInt"
 *
 * const predicate = gt(4n);
 *
 * expect(predicate(5n)).toBeTrue();
 * expect(predicate(4n)).toBeFalse();
 * expect(predicate(3n)).toBeFalse();
 */
export const gt = (that: bigint): P.Predicate<bigint> => value => value > that;

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `that` is less than or equal to a pre-defined `value`.
 *
 * @category Predicate
 * @example
 * import { le } from "perlica/Predicate/BigInt"
 *
 * const predicate = le(4n);
 *
 * expect(predicate(5n)).toBeFalse();
 * expect(predicate(4n)).toBeTrue();
 * expect(predicate(3n)).toBeTrue();
 */
export const le = (that: bigint): P.Predicate<bigint> => value => value <= that;

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `that` is greater than or equal to a pre-defined `value`.
 *
 * @category Predicate
 * @example
 * import { ge } from "perlica/Predicate/BigInt"
 *
 * const predicate = ge(4n);
 *
 * expect(predicate(5n)).toBeTrue();
 * expect(predicate(4n)).toBeTrue();
 * expect(predicate(3n)).toBeFalse();
 */
export const ge = (that: bigint): P.Predicate<bigint> => value => value >= that;

// -------------------------------------------------------------------------------------------------
// Guards
// -------------------------------------------------------------------------------------------------

/**
 * Returns `true` if `value` is `bigint`, otherwise returns `false`.
 *
 * @category Guard
 * @example
 * import { isBigInt } from "perlica/Predicate/BigInt"
 *
 * expect(isBigInt(4n)).toBeFalse();
 * expect(isBigInt(4n)).toBeTrue();
 */
export const isBigInt: P.Guard<unknown, bigint> = P.isBigInt;
