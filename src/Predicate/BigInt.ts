import * as predicate from ".";

/**
 * Returns `true` if `value` is `bigint`, otherwise returns `false`.
 *
 * ```ts
 * import { isBigInt } from "perlica/Predicate/BigInt"
 *
 * expect(isBigInt(4n)).toBeFalse();
 * expect(isBigInt(4n)).toBeTrue();
 * ```
 */
export const isBigInt: (value: unknown) => value is bigint = predicate.isBigInt;

/**
 * Returns `true` if `value > 0`, otherwise returns `false`.
 *
 * ```ts
 * import { isPositive } from "perlica/Predicate/BigInt"
 *
 * expect(isPositive(0n)).toBeFalse();
 * expect(isPositive(4n)).toBeTrue();
 * expect(isPositive(-4n)).toBeFalse();
 * ```
 */
export const isPositive = (value: bigint) => value > 0;

/**
 * Returns `true` if `value >= 0`, otherwise returns `false`.
 *
 * ```ts
 * import { isNonNegative } from "perlica/Predicate/BigInt"
 *
 * expect(isNonNegative(0n)).toBeTrue();
 * expect(isNonNegative(4n)).toBeTrue();
 * expect(isNonNegative(-4n)).toBeFalse();
 * ```
 */
export const isNonNegative = (value: bigint) => value >= 0;

/**
 * Returns `true` if `value < 0`, otherwise returns `false`.
 *
 * ```ts
 * import { isNegative } from "perlica/Predicate/BigInt"
 *
 * expect(isNegative(0n)).toBeFalse();
 * expect(isNegative(4n)).toBeFalse();
 * expect(isNegative(-4n)).toBeTrue();
 * ```
 */
export const isNegative = (value: bigint) => value < 0;

/**
 * Returns `true` if `value <= 0`, otherwise returns `false`.
 *
 * ```ts
 * import { isNonPositive } from "perlica/Predicate/BigInt"
 *
 * expect(isNonPositive(0n)).toBeTrue();
 * expect(isNonPositive(4n)).toBeFalse();
 * expect(isNonPositive(-4n)).toBeTrue();
 * ```
 */
export const isNonPositive = (value: bigint) => value <= 0;

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `value` is evenly divisible by a pre-defined `that`.
 * ```
 * import { multipleOf } from "perlica/Predicate/BigInt"
 *
 * const predicate = multipleOf(2n);
 *
 * expect(predicate(4n)).toBeTrue();
 * expect(predicate(3n)).toBeFalse();
 * ```
 */
export const multipleOf = (that: bigint): predicate.Predicate<bigint> =>
  value => (value % that) === 0n;

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `that` is less than a pre-defined `value`.
 * ```
 * import { lt } from "perlica/Predicate/BigInt"
 *
 * const predicate = lt(4n);
 *
 * expect(predicate(5n)).toBeFalse();
 * expect(predicate(4n)).toBeFalse();
 * expect(predicate(3n)).toBeTrue();
 * ```
 */
export const lt = (that: bigint): predicate.Predicate<bigint> => value => value < that;

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `that` is greater than a pre-defined `value`.
 * ```
 * import { gt } from "perlica/Predicate/BigInt"
 *
 * const predicate = gt(4n);
 *
 * expect(predicate(5n)).toBeTrue();
 * expect(predicate(4n)).toBeFalse();
 * expect(predicate(3n)).toBeFalse();
 * ```
 */
export const gt = (that: bigint): predicate.Predicate<bigint> => value => value > that;

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `that` is less than or equal to a pre-defined `value`.
 * ```
 * import { le } from "perlica/Predicate/BigInt"
 *
 * const predicate = le(4n);
 *
 * expect(predicate(5n)).toBeFalse();
 * expect(predicate(4n)).toBeTrue();
 * expect(predicate(3n)).toBeTrue();
 * ```
 */
export const le = (that: bigint): predicate.Predicate<bigint> => value => value <= that;

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `that` is greater than or equal to a pre-defined `value`.
 * ```
 * import { ge } from "perlica/Predicate/BigInt"
 *
 * const predicate = ge(4n);
 *
 * expect(predicate(5n)).toBeTrue();
 * expect(predicate(4n)).toBeTrue();
 * expect(predicate(3n)).toBeFalse();
 * ```
 */
export const ge = (that: bigint): predicate.Predicate<bigint> => value => value >= that;
