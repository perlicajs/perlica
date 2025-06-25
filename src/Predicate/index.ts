// -------------------------------------------------------------------------------------------------
// Instances
// -------------------------------------------------------------------------------------------------

/**
 * Any predicate from this module
 *
 * @category Instances
 */
export interface Predicate<T = unknown> {
  (value: T): boolean;
}

/**
 * Any guard from this module
 *
 * @category Instances
 */
export interface Guard<T, E extends T> {
  (value: T): value is E;
}

// -------------------------------------------------------------------------------------------------
// Combinators
// -------------------------------------------------------------------------------------------------

/**
 * Returns `Predicate` with negates result.
 *
 * @category Combinators
 * @example
 * import { not, isNumber } from "perlica/Predicate"
 *
 * const isNotNumber = not(isNumber);
 *
 * expect(isNotNumber(4)).toBeFalse();
 * expect(isNotNumber("hello")).toBeTrue();
 */
export const not = <T>(self: Predicate<T>): Predicate<T> => value => !self(value);

/**
 * Combines two predicates (`self` and `that`) into a new predicate.
 * Returns `true` if both returns `true`, otherwise returns `false`.
 *
 * @category Combinators
 * @example
 * import { and, lt, gt } from "perlica/Predicate"
 *
 * const between5And10 = and(lt(10), gt(5));
 *
 * expect(between5And10(7)).toBeTrue();
 * expect(between5And10(2)).toBeFalse();
 * expect(between5And10(12)).toBeFalse();
 */
export const and = <T>(self: Predicate<T>, that: Predicate<T>): Predicate<T> =>
  value => self(value) && that(value);

/**
 * Combines two predicates (`self` and `that`) into a new predicate.
 * Returns `true` if at least one returns `true`, otherwise returns `false`.
 *
 * @category Combinators
 * @example
 * import { or, lt, gt } from "perlica/Predicate"
 *
 * const less5OrGreater10 = or(lt(5), gt(10));
 *
 * expect(less5OrGreater10(7)).toBeFalse();
 * expect(less5OrGreater10(2)).toBeTrue();
 * expect(less5OrGreater10(12)).toBeTrue();
 */
export const or = <T>(self: Predicate<T>, that: Predicate<T>): Predicate<T> =>
  value => self(value) || that(value);

/**
 * Combining multiple `predicates` into a new predicate.
 * Returns `true` if all returns `true`, otherwise returns `false`.
 *
 * @category Combinators
 * @example
 * import { all, lt, gt, isNumber } from "perlica/Predicate"
 *
 * const myNumber = all([isNumber, lt(10), gt(5)]);
 *
 * expect(myNumber(7)).toBeTrue();
 * expect(myNumber(2)).toBeFalse();
 * expect(myNumber(12)).toBeFalse();
 */
export const all = <T>(predicates: Iterable<Predicate<T>>): Predicate<T> => {
  return value => {
    for (const p of predicates) {
      if (p(value) === false) {
        return false;
      }
    }
    return true;
  };
};

/**
 * Combining multiple `predicates` into a new predicate.
 * Returns `true` if at least one returns `true`, otherwise returns `false`.
 *
 * @category Combinators
 * @example
 * import { any, isNumber, isString, isBoolean } from "perlica/Predicate"
 *
 * const isNumberOrStringOrBoolean = any([isNumber, isString, isBoolean]);
 *
 * expect(isNumberOrStringOrBoolean(4)).toBeTrue();
 * expect(isNumberOrStringOrBoolean("test")).toBeTrue();
 * expect(isNumberOrStringOrBoolean(true)).toBeTrue();
 *
 * expect(isNumberOrStringOrBoolean(null)).toBeFalse();
 * expect(isNumberOrStringOrBoolean(undefined)).toBeFalse();
 * expect(isNumberOrStringOrBoolean({})).toBeFalse();
 */
export const any = <T>(predicates: Iterable<Predicate<T>>): Predicate<T> => {
  return value => {
    for (const p of predicates) {
      if (p(value) === true) {
        return true;
      }
    }
    return false;
  };
};

// -------------------------------------------------------------------------------------------------
// Predicates
// -------------------------------------------------------------------------------------------------

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `that` is equal to a pre-defined `value`.
 *
 * @category Predicates
 * @example
 * import { eq } from "perlica/Predicate"
 *
 * const predicate = eq(5);
 *
 * expect(predicate(5)).toBeTrue();
 * expect(predicate(4)).toBeFalse();
 */
export const eq = <T>(that: T): Predicate<T> => value => value === that;

/**
 * Returns a new `Predicate<T>`.
 * Returns `true` if `that` is not equal to a pre-defined `value`.
 *
 * @category Predicates
 * @example
 * import { ne } from "perlica/Predicate"
 *
 * const predicate = ne(5);
 *
 * expect(predicate(5)).toBeFalse();
 * expect(predicate(4)).toBeTrue();
 */
export const ne = <T>(that: T): Predicate<T> => value => value !== that;

/**
 * Returns `true` if `value` is not `symbol`, otherwise returns `false`.
 *
 * @category predicate
 * @example
 * import { isTruthy } from "perlica/Predicate"
 *
 * expect(isTruthy(1)).toBeTrue();
 * expect(isTruthy("a")).toBeTrue();
 *
 * expect(isTruthy(0)).toBeFalse();
 * expect(isTruthy("")).toBeFalse();
 */
export const isTruthy: Predicate = (value: unknown): boolean => !!value;

// -------------------------------------------------------------------------------------------------
// Guards
// -------------------------------------------------------------------------------------------------

/**
 * Returns `true` if `value` is `null`, otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { isNull } from "perlica/Predicate"
 *
 * expect(isNull(null)).toBeTrue();
 * expect(isNull(undefined)).toBeFalse();
 * expect(isNull(4)).toBeFalse();
 * expect(isNull("hello")).toBeFalse();
 */
export const isNull: Guard<unknown, null> = (value: unknown): value is null => value === null;

/**
 * Returns `true` if `value` is not `null`, otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { isNotNull } from "perlica/Predicate"
 *
 * expect(isNotNull(null)).toBeFalse();
 * expect(isNotNull(undefined)).toBeTrue();
 * expect(isNotNull(4)).toBeTrue();
 * expect(isNotNull("hello")).toBeTrue();
 */
export const isNotNull = <T>(value: T): value is Exclude<T, null> => value !== null;

/**
 * Returns `true` if `value` is `undefined`, otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { isUndefined } from "perlica/Predicate"
 *
 * expect(isUndefined(null)).toBeFalse();
 * expect(isUndefined(undefined)).toBeTrue();
 * expect(isUndefined(4)).toBeFalse();
 * expect(isUndefined("hello")).toBeFalse();
 */
export const isUndefined: Guard<unknown, undefined> = (value: unknown): value is undefined =>
  value === undefined;

/**
 * Returns `true` if `value` is not `undefined`, otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { isNotUndefined } from "perlica/Predicate"
 *
 * expect(isNotUndefined(null)).toBeTrue();
 * expect(isNotUndefined(undefined)).toBeFalse();
 * expect(isNotUndefined(4)).toBeTrue();
 * expect(isNotUndefined("hello")).toBeTrue();
 */
export const isNotUndefined = <T>(value: T): value is Exclude<T, undefined> =>
  value !== undefined;

/**
 * Returns `true` if `value` is `true` or `false`, otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { isBoolean } from "perlica/Predicate"
 *
 * expect(isBoolean(true)).toBeTrue();
 * expect(isBoolean(false)).toBeTrue();
 * expect(isBoolean(null)).toBeFalse();
 * expect(isBoolean(4)).toBeFalse();
 */
export const isBoolean: Guard<unknown, boolean> = (value: unknown): value is boolean =>
  typeof value === "boolean";

/**
 * Returns `true` if `value` is `number`, otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { isNumber } from "perlica/Predicate"
 *
 * expect(isNumber(4)).toBeTrue();
 * expect(isNumber(4.4)).toBeTrue();
 *
 * expect(isNumber(null)).toBeFalse();
 * expect(isNumber(true)).toBeFalse();
 * expect(isNumber("hello")).toBeFalse();
 */
export const isNumber: Guard<unknown, number> = (value: unknown): value is number =>
  typeof value === "number";

/**
 * Returns `true` if `value` is `integer`, otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { isInteger } from "perlica/Predicate"
 *
 * expect(isInteger(4)).toBeTrue();
 * expect(isInteger(4.4)).toBeFalse();
 */
export const isInteger: Guard<unknown, number> = (value: unknown): value is number =>
  Number.isInteger(value);

/**
 * Returns `true` if `value` is `bigint`, otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { isBigInt } from "perlica/Predicate"
 *
 * expect(isBigInt(4)).toBeFalse();
 * expect(isBigInt(4n)).toBeTrue();
 */
export const isBigInt: Guard<unknown, bigint> = (value: unknown): value is bigint =>
  typeof value === "bigint";

/**
 * Returns `true` if `value` is `string`, otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { isString } from "perlica/Predicate"
 *
 * expect(isString("hello")).toBeTrue();
 * expect(isString(4)).toBeFalse();
 * expect(isString(null)).toBeFalse();
 * expect(isString(true)).toBeFalse();
 */
export const isString: Guard<unknown, string> = (value: unknown): value is string =>
  typeof value === "string";

/**
 * Returns `true` if `value` is `Array`, otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { isArray } from "perlica/Predicate"
 *
 * expect(isArray([])).toBeTrue();
 * expect(isArray(4)).toBeFalse();
 * expect(isArray(null)).toBeFalse();
 * expect(isArray(true)).toBeFalse();
 */
export const isArray: Guard<unknown, Array<unknown>> = (value: unknown): value is Array<unknown> =>
  Array.isArray(value);

/**
 * Returns `true` if `value` is `Function`, otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { isFunction } from "perlica/Predicate"
 *
 * expect(isFunction(isFunction)).toBeTrue();
 * expect(isFunction("isFunction")).toBeFalse();
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction: Guard<unknown, Function> = (value: unknown): value is Function =>
  typeof value === "function";

/**
 * Returns `true` if `value` is `symbol`, otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { isSymbol } from "perlica/Predicate"
 *
 * expect(isSymbol(Symbol.for("a"))).toBeTrue();
 * expect(isSymbol("a")).toBeFalse();
 */
export const isSymbol: Guard<unknown, symbol> = (value: unknown): value is symbol =>
  typeof value === "symbol";

/**
 * Returns `true` if `value` is `Set`, otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { isSet } from "perlica/Predicate"
 *
 * expect(isSet(new Set())).toBeTrue();
 * expect(isSet({})).toBeFalse();
 */
export const isSet: Guard<unknown, Set<unknown>> = (value: unknown): value is Set<unknown> =>
  value instanceof Set;

/**
 * Returns `true` if `value` is `Map`, otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { isMap } from "perlica/Predicate"
 *
 * expect(isMap(new Map())).toBeTrue();
 * expect(isMap({})).toBeFalse();
 */
export const isMap: Guard<unknown, Map<unknown, unknown>>
  = (value: unknown): value is Map<unknown, unknown> =>
    value instanceof Map;

/**
 * Returns `true` if `value` is `RegExp`, otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { isRegExp } from "perlica/Predicate"
 *
 * expect(isRegExp(/4/)).toBeTrue();
 * expect(isRegExp(4)).toBeFalse();
 */
export const isRegExp: Guard<unknown, RegExp> = (value: unknown): value is RegExp =>
  value instanceof RegExp;

/**
 * Returns `true` if `value` is `Error`, otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { isError } from "perlica/Predicate"
 *
 * expect(isError(new Error())).toBeTrue();
 * expect(isError({})).toBeFalse();
 * expect(isError(null)).toBeFalse();
 * expect(isError(undefined)).toBeFalse();
 */
export const isError: Guard<unknown, Error> = (value: unknown): value is Error =>
  value instanceof Error;

/**
 * Returns `true` if `value` is `null` or `undefined`, otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { isNullable } from "perlica/Predicate"
 *
 * expect(isNullable(null)).toBeTrue();
 * expect(isNullable(undefined)).toBeTrue();
 * expect(isNullable(4)).toBeFalse();
 */
export const isNullable = <T>(value: T): value is Extract<T, null | undefined> =>
  isNull(value) || isUndefined(value);

/**
 * Returns `true` if `value` is not `null` and not `undefined`, otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { isNotNullable } from "perlica/Predicate"
 *
 * expect(isNotNullable(null)).toBeFalse();
 * expect(isNotNullable(undefined)).toBeFalse();
 * expect(isNotNullable(4)).toBeTrue();
 */
export const isNotNullable = <T>(value: T): value is NonNullable<T> =>
  isNotNull(value) && isNotUndefined(value);

/**
 * Returns `true` if `value` is `Promise`, otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { IsPromise } from "perlica/Predicate"
 *
 * expect(IsPromise(Promise.resolve(4))).toBeTrue();
 * expect(IsPromise(4)).toBeFalse();
 */
export const isPromise: Guard<unknown, Promise<unknown>>
  = (value: unknown): value is Promise<unknown>  =>
    hasProperty(value, "then") && hasProperty(value, "catch")
    && isFunction(value.then) && isFunction(value.catch);

/**
 * Returns `true` if `value` is `Date`, otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { isDate } from "perlica/Predicate"
 *
 * expect(isDate(new Date())).toBeTrue();
 * expect(isDate({})).toBeFalse();
 */
export const isDate: Guard<unknown, Date> = (value: unknown): value is Date =>
  value instanceof Date;

/**
 * Returns `true` if `value` is `record` or `array`, otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { isRecordOrArray } from "perlica/Predicate"
 *
 * expect(isRecordOrArray({})).toBeTrue();
 * expect(isRecordOrArray([])).toBeTrue();
 *
 * expect(isRecordOrArray(null)).toBeFalse();
 * expect(isRecordOrArray(undefined)).toBeFalse();
 * expect(isRecordOrArray(4)).toBeFalse();
 */
export const isRecordOrArray: Guard<unknown, { [x: PropertyKey]: unknown }>
  = (value: unknown): value is { [x: PropertyKey]: unknown } =>
    typeof value === "object" && isNotNull(value);

/**
 * Returns `true` if `value` is `object` (`record`, `array`, `function`), otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { isObject } from "perlica/Predicate"
 *
 * expect(isObject({})).toBeTrue();
 * expect(isObject([])).toBeTrue();
 * expect(isObject(() => {})).toBeTrue();
 *
 * expect(isObject(null)).toBeFalse();
 * expect(isObject(undefined)).toBeFalse();
 * expect(isObject(4)).toBeFalse();
 */
export const isObject: Guard<unknown, object> = (value: unknown): value is object =>
  isRecordOrArray(value) || isFunction(value);

/**
 * Returns `true` if `value` is object and containing a `property` key, otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { hasProperty } from "perlica/Predicate"
 *
 * expect(hasProperty({}, "test")).toBeFalse();
 * expect(hasProperty("test", "test")).toBeFalse();
 * expect(hasProperty({ test: 4 }, "test")).toBeTrue();
 */
export const hasProperty = <P extends PropertyKey>(
  value: unknown, property: P,
): value is { [K in P]: unknown } =>
  isObject(value) && property in value;

/**
 * Returns `true` if `value` is object and containing a `Symbol.iterator` key, otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { isIterable } from "perlica/Predicate"
 *
 * expect(isIterable([])).toBeTrue();
 * expect(isIterable({})).toBeFalse();
 */
export const isIterable: Guard<unknown, Iterable<unknown>>
  = (value: unknown): value is Iterable<unknown> =>
    hasProperty(value, Symbol.iterator);

/**
 * Returns `true` if `value` is object and containing a `Symbol.asyncIterator` key, otherwise returns `false`.
 *
 * @category Guards
 * @example
 * import { isAsyncIterable } from "perlica/Predicate"
 *
 * expect(isAsyncIterable({ [Symbol.asyncIterator]() {} })).toBeTrue();
 * expect(isAsyncIterable({})).toBeFalse();
 */
export const isAsyncIterable: Guard<unknown, AsyncIterable<unknown>>
  = (value: unknown): value is AsyncIterable<unknown> =>
    hasProperty(value, Symbol.asyncIterator);
