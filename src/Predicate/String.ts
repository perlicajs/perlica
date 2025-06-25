import * as P from ".";

// -------------------------------------------------------------------------------------------------
// Predicates
// -------------------------------------------------------------------------------------------------

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `searchString` appears as a substring of `self`, otherwise returns `false`.
 *
 *
 * @category Predicate
 * @example
 * import { includes } from "perlica/Predicate/String"
 *
 * const predicate = includes("test");
 *
 * expect(predicate("Hello test world")).toBeTrue();
 * expect(predicate("Hello world")).toBeFalse();
 */
export const includes = (searchString: string, position?: number): P.Predicate<string> =>
  value => value.includes(searchString, position);

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `searchString` starts with a `self`, otherwise returns `false`.
 *
 *
 * @category Predicate
 * @example
 * import { startsWith } from "perlica/Predicate/String"
 *
 * const predicate = startsWith("test");
 *
 * expect(predicate("test world")).toBeTrue();
 * expect(predicate("world")).toBeFalse();
 */
export const startsWith = (searchString: string, position?: number): P.Predicate<string> =>
  value => value.startsWith(searchString, position);

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `searchString` ends with a `self`, otherwise returns `false`.
 *
 *
 * @category Predicate
 * @example
 * import { endsWith } from "perlica/Predicate/String"
 *
 * const predicate = endsWith("test");
 *
 * expect(predicate("world test")).toBeTrue();
 * expect(predicate("world")).toBeFalse();
 */
export const endsWith = (searchString: string, position?: number): P.Predicate<string> =>
  value => value.endsWith(searchString, position);

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if a regular expression (`regexp`) to match `self`, otherwise returns `false`.
 *
 *
 * @category Predicate
 * @example
 * import { isMatch } from "perlica/Predicate/String"
 *
 * const predicate = isMatch(/Hello.*\/);
 *
 * expect(predicate("Hello world")).toBeTrue();
 * expect(predicate("Fello world")).toBeFalse();
 */
export const isMatch = (regexp: RegExp): P.Predicate<string> =>
  value => P.isNotNull(value.match(regexp));

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `value` is length less or equal to a pre-defined `count`.
 *
 * @category Predicate
 * @example
 * import { max } from "perlica/Predicate/String"
 *
 * const predicate = max(5);
 *
 * expect(predicate("Hello")).toBeTrue();
 * expect(predicate("Hello world")).toBeFalse();
 */
export const maxLen = (count: number): P.Predicate<string> =>
  value => value.length <= count;

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `value` is length greater or equal to a pre-defined `count`.
 *
 * @category Predicate
 * @example
 * import { min } from "perlica/Predicate/String"
 *
 * const predicate = min(5);
 *
 * expect(predicate("Hello")).toBeTrue();
 * expect(predicate("Hello world")).toBeFalse();
 */
export const minLen = (count: number): P.Predicate<string> =>
  value => value.length >= count;

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `value` is length equal to a pre-defined `count`.
 *
 * @category Predicate
 * @example
 * import { len } from "perlica/Predicate/String"
 *
 * const predicate = len(5);
 *
 * expect(predicate("Hello")).toBeTrue();
 * expect(predicate("Hi")).toBeFalse();
 * expect(predicate("Hello world")).toBeFalse();
 */
export const len = (count: number): P.Predicate<string> => value => value.length === count;

// -------------------------------------------------------------------------------------------------
// Guards
// -------------------------------------------------------------------------------------------------

/**
 * Returns `true` if `value` is `string`, otherwise returns `false`.
 *
 *
 * @category Guard
 * @example
 * import { isString } from "perlica/Predicate/String"
 *
 * expect(isString("hello")).toBeTrue();
 * expect(isString(4)).toBeFalse();
 * expect(isString(null)).toBeFalse();
 * expect(isString(true)).toBeFalse();
 */
export const isString: P.Guard<unknown, string> = P.isString;

/**
 * Returns `true` if `self` is empty, otherwise returns `false`.
 *
 *
 * @category Guard
 * @example
 * import { isEmpty } from "perlica/Predicate/String"
 *
 * expect(isEmpty("hello")).toBeFalse();
 * expect(isEmpty("")).toBeTrue();
 */
export const isEmpty: P.Guard<string, ""> = (self: string): self is "" => self.length === 0;
