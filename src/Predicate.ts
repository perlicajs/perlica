/**
 * Any predicate from this module
 */
export interface Predicate<T> {
  (value: T): boolean;
}

/**
 * Returns `Predicate` with negates result.
 *
 * ```ts
 * import { not, isNumber } from "perlica/Predicate"
 *
 * const isNotNumber = not(isNumber);
 *
 * expect(isNotNumber(4)).toBeFalse();
 * expect(isNotNumber("hello")).toBeTrue();
 * ```
 */
export const not = <T>(self: Predicate<T>): Predicate<T> => value => !self(value);

/**
 * Combines two predicates (`self` and `that`) into a new predicate.
 * Returns `true` if both returns `true`, otherwise returns `false`.
 *
 * ```ts
 * import { and, lt, gt } from "perlica/Predicate"
 *
 * const between5And10 = and(lt(10), gt(5));
 *
 * expect(between5And10(7)).toBeTrue();
 * expect(between5And10(2)).toBeFalse();
 * expect(between5And10(12)).toBeFalse();
 * ```
 */
export const and = <T>(self: Predicate<T>, that: Predicate<T>): Predicate<T> =>
  value => self(value) && that(value);

/**
 * Combines two predicates (`self` and `that`) into a new predicate.
 * Returns `true` if at least one returns `true`, otherwise returns `false`.
 *
 * ```ts
 * import { or, lt, gt } from "perlica/Predicate"
 *
 * const less5OrGreater10 = or(lt(5), gt(10));
 *
 * expect(less5OrGreater10(7)).toBeFalse();
 * expect(less5OrGreater10(2)).toBeTrue();
 * expect(less5OrGreater10(12)).toBeTrue();
 * ```
 */
export const or = <T>(self: Predicate<T>, that: Predicate<T>): Predicate<T> =>
  value => self(value) || that(value);

/**
 * Combining multiple `predicates` into a new predicate.
 * Returns `true` if all returns `true`, otherwise returns `false`.
 *
 * ```ts
 * import { all, lt, gt, isNumber } from "perlica/Predicate"
 *
 * const myNumber = all([isNumber, lt(10), gt(5)]);
 *
 * expect(myNumber(7)).toBeTrue();
 * expect(myNumber(2)).toBeFalse();
 * expect(myNumber(12)).toBeFalse();
 * ```
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
 * ```ts
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
 * ```
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

/**
 * Returns a new predicate.
 * Return true if `that` is equal to a pre-defined `value`.
 *
 * ```ts
 * import { eq } from "perlica/Predicate"
 *
 * const predicate = eq(5);
 *
 * expect(predicate(5)).toBeTrue();
 * expect(predicate(4)).toBeFalse();
 * ```
 */
export const eq = <T>(that: T): Predicate<T> => value => value == that;

/**
 * Returns a new predicate.
 * Return true if `that` is not equal to a pre-defined `value`.
 *
 * ```ts
 * import { ne } from "perlica/Predicate"
 *
 * const predicate = ne(5);
 *
 * expect(predicate(5)).toBeFalse();
 * expect(predicate(4)).toBeTrue();
 * ```
 */
export const ne = <T>(that: T): Predicate<T> => value => value !== that;

/**
 * Returns a new predicate.
 * Return true if `that` is less than a pre-defined `value`.
 * ```
 * import { lt } from "perlica/Predicate"
 *
 * const predicate = lt(4);
 *
 * expect(predicate(5)).toBeFalse();
 * expect(predicate(4)).toBeFalse();
 * expect(predicate(3)).toBeTrue();
 * ```
 */
export const lt = <T>(that: T): Predicate<T> => value => value < that;

/**
 * Returns a new predicate.
 * Return true if `that` is greater than a pre-defined `value`.
 * ```
 * import { gt } from "perlica/Predicate"
 *
 * const predicate = gt(4);
 *
 * expect(predicate(5)).toBeTrue();
 * expect(predicate(4)).toBeFalse();
 * expect(predicate(3)).toBeFalse();
 * ```
 */
export const gt = <T>(that: T): Predicate<T> => value => value > that;

/**
 * Returns a new predicate.
 * Return true if `that` is less than or equal to a pre-defined `value`.
 * ```
 * import { le } from "perlica/Predicate"
 *
 * const predicate = le(4);
 *
 * expect(predicate(5)).toBeFalse();
 * expect(predicate(4)).toBeTrue();
 * expect(predicate(3)).toBeTrue();
 * ```
 */
export const le = <T>(that: T): Predicate<T> => value => value <= that;

/**
 * Returns a new predicate.
 * Return true if `that` is greater than or equal to a pre-defined `value`.
 * ```
 * import { ge } from "perlica/Predicate"
 *
 * const predicate = ge(4);
 *
 * expect(predicate(5)).toBeTrue();
 * expect(predicate(4)).toBeTrue();
 * expect(predicate(3)).toBeFalse();
 * ```
 */
export const ge = <T>(that: T): Predicate<T> => value => value >= that;

/**
 * Any typed array
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

/**
 * Returns `true` if `value` is `null`, otherwise returns `false`.
 *
 * ```ts
 * import { isNull } from "perlica/Predicate"
 *
 * expect(isNull(null)).toBeTrue();
 * expect(isNull(undefined)).toBeFalse();
 * expect(isNull(4)).toBeFalse();
 * expect(isNull("hello")).toBeFalse();
 * ```
 */
export const isNull = (value: unknown): value is null => value === null;

/**
 * Returns `true` if `value` is not `null`, otherwise returns `false`.
 *
 * ```ts
 * import { isNotNull } from "perlica/Predicate"
 *
 * expect(isNotNull(null)).toBeFalse();
 * expect(isNotNull(undefined)).toBeTrue();
 * expect(isNotNull(4)).toBeTrue();
 * expect(isNotNull("hello")).toBeTrue();
 * ```
 */
export const isNotNull = (value: unknown): value is null => value !== null;

/**
 * Returns `true` if `value` is `undefined`, otherwise returns `false`.
 *
 * ```ts
 * import { isUndefined } from "perlica/Predicate"
 *
 * expect(isUndefined(null)).toBeFalse();
 * expect(isUndefined(undefined)).toBeTrue();
 * expect(isUndefined(4)).toBeFalse();
 * expect(isUndefined("hello")).toBeFalse();
 * ```
 */
export const isUndefined = (value: unknown): value is undefined => value === undefined;

/**
 * Returns `true` if `value` is not `undefined`, otherwise returns `false`.
 *
 * ```ts
 * import { isNotUndefined } from "perlica/Predicate"
 *
 * expect(isNotUndefined(null)).toBeTrue();
 * expect(isNotUndefined(undefined)).toBeFalse();
 * expect(isNotUndefined(4)).toBeTrue();
 * expect(isNotUndefined("hello")).toBeTrue();
 * ```
 */
export const isNotUndefined = (value: unknown): value is undefined => value !== undefined;

/**
 * Returns `true` if `value` is `true` or `false`, otherwise returns `false`.
 *
 * ```ts
 * import { isBoolean } from "perlica/Predicate"
 *
 * expect(isBoolean(true)).toBeTrue();
 * expect(isBoolean(false)).toBeTrue();
 * expect(isBoolean(null)).toBeFalse();
 * expect(isBoolean(4)).toBeFalse();
 * ```
 */
export const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";

/**
 * Returns `true` if `value` is `number`, otherwise returns `false`.
 *
 * ```ts
 * import { isNumber } from "perlica/Predicate"
 *
 * expect(isNumber(4)).toBeTrue();
 * expect(isNumber(4.4)).toBeTrue();
 *
 * expect(isNumber(null)).toBeFalse();
 * expect(isNumber(true)).toBeFalse();
 * expect(isNumber("hello")).toBeFalse();
 * ```
 */
export const isNumber = (value: unknown): value is number => typeof value === "number";

/**
 * Returns `true` if `value` is `integer`, otherwise returns `false`.
 *
 * ```ts
 * import { isInteger } from "perlica/Predicate"
 *
 * expect(isInteger(4)).toBeTrue();
 * expect(isInteger(4.4)).toBeFalse();
 * ```
 */
export const isInteger = (value: unknown): value is number => Number.isInteger(value);

/**
 * Returns `true` if `value` is `bigint`, otherwise returns `false`.
 *
 * ```ts
 * import { isBigInt } from "perlica/Predicate"
 *
 * expect(isBigInt(4)).toBeFalse();
 * expect(isBigInt(4n)).toBeTrue();
 * ```
 */
export const isBigInt = (value: unknown): value is bigint => typeof value === "bigint";

/**
 * Returns `true` if `value` is `string`, otherwise returns `false`.
 *
 * ```ts
 * import { isString } from "perlica/Predicate"
 *
 * expect(isString("hello")).toBeTrue();
 * expect(isString(4)).toBeFalse();
 * expect(isString(null)).toBeFalse();
 * expect(isString(true)).toBeFalse();
 * ```
 */
export const isString = (value: unknown): value is string => typeof value === "string";

/**
 * Returns `true` if `self` is empty, otherwise returns `false`.
 *
 * ```ts
 * import { isEmpty } from "perlica/Predicate"
 *
 * expect(isEmpty("hello")).toBeFalse();
 * expect(isEmpty("")).toBeTrue();
 * ```
 */
export const isEmpty = (self: string): self is "" => self.length === 0;

/**
 * Returns a new predicate.
 * Returns `true` if `searchString` appears as a substring of `self`, otherwise returns `false`.
 *
 * ```ts
 * import { includes } from "perlica/Predicate"
 *
 * const predicate = includes("test");
 *
 * expect(predicate("Hello test world")).toBeTrue();
 * expect(predicate("Hello world")).toBeFalse();
 * ```
 */
export const includes = (searchString: string, position?: number): Predicate<string> =>
  value => value.includes(searchString, position);

/**
 * Returns a new predicate.
 * Returns `true` if `searchString` starts with a `self`, otherwise returns `false`.
 *
 * ```ts
 * import { startsWith } from "perlica/Predicate"
 *
 * const predicate = startsWith("test");
 *
 * expect(predicate("test world")).toBeTrue();
 * expect(predicate("world")).toBeFalse();
 * ```
 */
export const startsWith = (searchString: string, position?: number): Predicate<string> =>
  value => value.startsWith(searchString, position);

/**
 * Returns a new predicate.
 * Returns `true` if `searchString` ends with a `self`, otherwise returns `false`.
 *
 * ```ts
 * import { endsWith } from "perlica/Predicate"
 *
 * const predicate = endsWith("test");
 *
 * expect(predicate("world test")).toBeTrue();
 * expect(predicate("world")).toBeFalse();
 * ```
 */
export const endsWith = (searchString: string, position?: number): Predicate<string> =>
  value => value.endsWith(searchString, position);

/**
 * Returns a new predicate.
 * Returns `true` if a regular expression (`regexp`) to match `self`, otherwise returns `false`.
 *
 * ```ts
 * import { isMatch } from "perlica/Predicate"
 *
 * const predicate = isMatch(/Hello.*\/);
 *
 * expect(predicate("Hello world")).toBeTrue();
 * expect(predicate("Fello world")).toBeFalse();
 * ```
 */
export const isMatch = (regexp: RegExp): Predicate<string> =>
  value => isNotNull(value.match(regexp));

/**
 * Returns `true` if `value` is `Function`, otherwise returns `false`.
 *
 * ```ts
 * import { isFunction } from "perlica/Predicate"
 *
 * expect(isFunction(isFunction)).toBeTrue();
 * expect(isFunction("isFunction")).toBeFalse();
 * ```
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (value: unknown): value is Function => typeof value === "function";

/**
 * Returns `true` if `value` is `symbol`, otherwise returns `false`.
 *
 * ```ts
 * import { isSymbol } from "perlica/Predicate"
 *
 * expect(isSymbol(Symbol.for("a"))).toBeTrue();
 * expect(isSymbol("a")).toBeFalse();
 * ```
 */
export const isSymbol = (value: unknown): value is symbol => typeof value === "symbol";

/**
 * Returns `true` if `value` is not `symbol`, otherwise returns `false`.
 *
 * ```ts
 * import { isTruthy } from "perlica/Predicate"
 *
 * expect(isTruthy(1)).toBeTrue();
 * expect(isTruthy("a")).toBeTrue();
 *
 * expect(isTruthy(0)).toBeFalse();
 * expect(isTruthy("")).toBeFalse();
 * ```
 */
export const isTruthy = (value: unknown): boolean => !!value;

/**
 * Returns `true` if `value` is `Set`, otherwise returns `false`.
 *
 * ```ts
 * import { isSet } from "perlica/Predicate"
 *
 * expect(isSet(new Set())).toBeTrue();
 * expect(isSet({})).toBeFalse();
 * ```
 */
export const isSet = (value: unknown): value is Set<unknown> => value instanceof Set;

/**
 * Returns `true` if `value` is `Map`, otherwise returns `false`.
 *
 * ```ts
 * import { isMap } from "perlica/Predicate"
 *
 * expect(isMap(new Map())).toBeTrue();
 * expect(isMap({})).toBeFalse();
 * ```
 */
export const isMap = (value: unknown): value is Map<unknown, unknown> => value instanceof Map;

/**
 * Returns `true` if `value` is `Error`, otherwise returns `false`.
 *
 * ```ts
 * import { isError } from "perlica/Predicate"
 *
 * expect(isError(new Error())).toBeTrue();
 * expect(isError({})).toBeFalse();
 * expect(isError(null)).toBeFalse();
 * expect(isError(undefined)).toBeFalse();
 * ```
 */
export const isError = (value: unknown): value is Error => value instanceof Error;

/**
 * Returns `true` if `value` is `null` or `undefined`, otherwise returns `false`.
 *
 * ```ts
 * import { isNullable } from "perlica/Predicate"
 *
 * expect(isNullable(null)).toBeTrue();
 * expect(isNullable(undefined)).toBeTrue();
 * expect(isNullable(4)).toBeFalse();
 * ```
 */
export const isNullable = <T>(value: T): value is Extract<T, null | undefined> =>
  isNull(value) || isUndefined(value);

/**
 * Returns `true` if `value` is not `null` and not `undefined`, otherwise returns `false`.
 *
 * ```ts
 * import { isNotNullable } from "perlica/Predicate"
 *
 * expect(isNotNullable(null)).toBeFalse();
 * expect(isNotNullable(undefined)).toBeFalse();
 * expect(isNotNullable(4)).toBeTrue();
 * ```
 */
export const isNotNullable = <T>(value: T): value is NonNullable<T> =>
  isNotNull(value) && isNotUndefined(value);

/**
 * Returns `true` if `value` is `Promise`, otherwise returns `false`.
 *
 * ```ts
 * import { IsPromise } from "perlica/Predicate"
 *
 * expect(IsPromise(Promise.resolve(4))).toBeTrue();
 * expect(IsPromise(4)).toBeFalse();
 * ```
 */
export const isPromise = (value: unknown): value is Promise<unknown>  => value instanceof Promise;

/**
 * Returns `true` if `value` is `RegExp`, otherwise returns `false`.
 *
 * ```ts
 * import { isRegExp } from "perlica/Predicate"
 *
 * expect(isRegExp(/4/)).toBeTrue();
 * expect(isRegExp(4)).toBeFalse();
 * ```
 */
export const isRegExp = (value: unknown): value is RegExp => value instanceof RegExp;

/**
 * Returns `true` if `value` is `TypedArray`, otherwise returns `false`.
 */
export const isTypedArray = (value: unknown): value is TypedArray => ArrayBuffer.isView(value);

/**
 * Returns `true` if `value` is `Int8Array`, otherwise returns `false`.
 */
export const isInt8Array = (value: unknown): value is Int8Array => value instanceof Int8Array;

/**
 * Returns `true` if `value` is `Uint8Array`, otherwise returns `false`.
 */
export const isUint8Array = (value: unknown): value is Uint8Array => value instanceof Uint8Array;

/**
 * Returns `true` if `value` is `Uint8ClampedArray`, otherwise returns `false`.
 */
export const isUint8ClampedArray = (value: unknown): value is Uint8ClampedArray =>
  value instanceof Uint8ClampedArray;

/**
 * Returns `true` if `value` is `Int16Array`, otherwise returns `false`.
 */
export const isInt16Array = (value: unknown): value is Int16Array => value instanceof Int16Array;

/**
 * Returns `true` if `value` is `Uint16Array`, otherwise returns `false`.
 */
export const isUint16Array = (value: unknown): value is Uint16Array => value instanceof Uint16Array;

/**
 * Returns `true` if `value` is `Int32Array`, otherwise returns `false`.
 */
export const isInt32Array = (value: unknown): value is Int32Array => value instanceof Int32Array;

/**
 * Returns `true` if `value` is `Uint32Array`, otherwise returns `false`.
 */
export const isUint32Array = (value: unknown): value is Uint32Array => value instanceof Uint32Array;

/**
 * Returns `true` if `value` is `Float32Array`, otherwise returns `false`.
 */
export const isFloat32Array = (value: unknown): value is Float32Array =>
  value instanceof Float32Array;

/**
 * Returns `true` if `value` is `Float64Array`, otherwise returns `false`.
 */
export const isFloat64Array = (value: unknown): value is Float64Array =>
  value instanceof Float64Array;

/**
 * Returns `true` if `value` is `BigInt64Array`, otherwise returns `false`.
 */
export const isBigInt64Array = (value: unknown): value is BigInt64Array =>
  value instanceof BigInt64Array;

/**
 * Returns `true` if `value` is `BigUint64Array`, otherwise returns `false`.
 */
export const isBigUint64Array = (value: unknown): value is BigUint64Array =>
  value instanceof BigUint64Array;

/**
 * Returns `true` if `value` is `Date`, otherwise returns `false`.
 *
 * ```ts
 * import { isDate } from "perlica/Predicate"
 *
 * expect(isDate(new Date())).toBeTrue();
 * expect(isDate({})).toBeFalse();
 * ```
 */
export const isDate = (value: unknown): value is Date => value instanceof Date;

/**
 * Returns `true` if `value` is `record` or `array`, otherwise returns `false`.
 *
 * ```ts
 * import { isRecordOrArray } from "perlica/Predicate"
 *
 * expect(isRecordOrArray({})).toBeTrue();
 * expect(isRecordOrArray([])).toBeTrue();
 *
 * expect(isRecordOrArray(null)).toBeFalse();
 * expect(isRecordOrArray(undefined)).toBeFalse();
 * expect(isRecordOrArray(4)).toBeFalse();
 * ```
 */
export const isRecordOrArray = (value: unknown): value is { [x: PropertyKey]: unknown } =>
  typeof value === "object" && isNotNull(value);

/**
 * Returns `true` if `value` is `object` (`record`, `array`, `function`), otherwise returns `false`.
 *
 * ```ts
 * import { isObject } from "perlica/Predicate"
 *
 * expect(isObject({})).toBeTrue();
 * expect(isObject([])).toBeTrue();
 * expect(isObject(() => {})).toBeTrue();
 *
 * expect(isObject(null)).toBeFalse();
 * expect(isObject(undefined)).toBeFalse();
 * expect(isObject(4)).toBeFalse();
 * ```
 */
export const isObject = (value: unknown): value is object =>
  isRecordOrArray(value) || isFunction(value);

/**
 * Returns `true` if `value` is object and containing a `property` key, otherwise returns `false`.
 *
 * ```ts
 * import { hasProperty } from "perlica/Predicate"
 *
 * expect(hasProperty({}, "test")).toBeFalse();
 * expect(hasProperty("test", "test")).toBeFalse();
 * expect(hasProperty({ test: 4 }, "test")).toBeTrue();
 * ```
 */
export const hasProperty = <P extends PropertyKey>(
  value: unknown, property: P,
): value is { [K in P]: unknown } =>
  isObject(value) && property in value;

/**
 * Returns `true` if `value` is object and containing a `Symbol.iterator` key, otherwise returns `false`.
 *
 * ```ts
 * import { isIterable } from "perlica/Predicate"
 *
 * expect(isIterable([])).toBeTrue();
 * expect(isIterable({})).toBeFalse();
 * ```
 */
export const isIterable = (value: unknown): value is Iterable<unknown> =>
  hasProperty(value, Symbol.iterator);

/**
 * Returns `true` if `value` is object and containing a `Symbol.asyncIterator` key, otherwise returns `false`.
 *
 * ```ts
 * import { isAsyncIterable } from "perlica/Predicate"
 *
 * expect(isAsyncIterable({ [Symbol.asyncIterator]() {} })).toBeTrue();
 * expect(isAsyncIterable({})).toBeFalse();
 * ```
 */
export const isAsyncIterable = (value: unknown): value is AsyncIterable<unknown> =>
  hasProperty(value, Symbol.asyncIterator);
