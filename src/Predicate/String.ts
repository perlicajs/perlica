import * as predicate from ".";

/**
 * Returns `true` if `value` is `string`, otherwise returns `false`.
 *
 * ```ts
 * import { isString } from "perlica/Predicate/String"
 *
 * expect(isString("hello")).toBeTrue();
 * expect(isString(4)).toBeFalse();
 * expect(isString(null)).toBeFalse();
 * expect(isString(true)).toBeFalse();
 * ```
 */
export const isString: (value: unknown) => value is string = predicate.isString;

/**
 * Returns `true` if `self` is empty, otherwise returns `false`.
 *
 * ```ts
 * import { isEmpty } from "perlica/Predicate/String"
 *
 * expect(isEmpty("hello")).toBeFalse();
 * expect(isEmpty("")).toBeTrue();
 * ```
 */
export const isEmpty = (self: string): self is "" => self.length === 0;

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `searchString` appears as a substring of `self`, otherwise returns `false`.
 *
 * ```ts
 * import { includes } from "perlica/Predicate/String"
 *
 * const predicate = includes("test");
 *
 * expect(predicate("Hello test world")).toBeTrue();
 * expect(predicate("Hello world")).toBeFalse();
 * ```
 */
export const includes = (searchString: string, position?: number): predicate.Predicate<string> =>
  value => value.includes(searchString, position);

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `searchString` starts with a `self`, otherwise returns `false`.
 *
 * ```ts
 * import { startsWith } from "perlica/Predicate/String"
 *
 * const predicate = startsWith("test");
 *
 * expect(predicate("test world")).toBeTrue();
 * expect(predicate("world")).toBeFalse();
 * ```
 */
export const startsWith = (searchString: string, position?: number): predicate.Predicate<string> =>
  value => value.startsWith(searchString, position);

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `searchString` ends with a `self`, otherwise returns `false`.
 *
 * ```ts
 * import { endsWith } from "perlica/Predicate/String"
 *
 * const predicate = endsWith("test");
 *
 * expect(predicate("world test")).toBeTrue();
 * expect(predicate("world")).toBeFalse();
 * ```
 */
export const endsWith = (searchString: string, position?: number): predicate.Predicate<string> =>
  value => value.endsWith(searchString, position);

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if a regular expression (`regexp`) to match `self`, otherwise returns `false`.
 *
 * ```ts
 * import { isMatch } from "perlica/Predicate/String"
 *
 * const predicate = isMatch(/Hello.*\/);
 *
 * expect(predicate("Hello world")).toBeTrue();
 * expect(predicate("Fello world")).toBeFalse();
 * ```
 */
export const isMatch = (regexp: RegExp): predicate.Predicate<string> =>
  value => predicate.isNotNull(value.match(regexp));

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `value` is length less or equal to a pre-defined `count`.
 * ```
 * import { max } from "perlica/Predicate/String"
 *
 * const predicate = max(5);
 *
 * expect(predicate("Hello")).toBeTrue();
 * expect(predicate("Hello world")).toBeFalse();
 * ```
 */
export const maxLen = (count: number): predicate.Predicate<string> =>
  value => value.length <= count;

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `value` is length greater or equal to a pre-defined `count`.
 * ```
 * import { min } from "perlica/Predicate/String"
 *
 * const predicate = min(5);
 *
 * expect(predicate("Hello")).toBeTrue();
 * expect(predicate("Hello world")).toBeFalse();
 * ```
 */
export const minLen = (count: number): predicate.Predicate<string> =>
  value => value.length >= count;

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `value` is length equal to a pre-defined `count`.
 * ```
 * import { len } from "perlica/Predicate/String"
 *
 * const predicate = len(5);
 *
 * expect(predicate("Hello")).toBeTrue();
 * expect(predicate("Hi")).toBeFalse();
 * expect(predicate("Hello world")).toBeFalse();
 * ```
 */
export const len = (count: number): predicate.Predicate<string> => value => value.length === count;
