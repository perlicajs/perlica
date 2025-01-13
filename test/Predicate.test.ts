import { describe, it, expect } from "bun:test";

import {
  not, and, lt, gt, or, all, any, eq, ne, le, ge,
  hasProperty, isNull, isNullable, isNumber, isObject, isPromise, isNotNull, isNotNullable,
  isAsyncIterable, isRecordOrArray,  isRegExp, isSet, isString, isSymbol, isTruthy, isUndefined,
  isBigInt, isBoolean, isDate, isError, isFunction, isInteger, isIterable, isMap,  isNotUndefined,
  isEmpty, includes, startsWith, endsWith, isMatch,
} from "~/Predicate";

describe("Predicate", () => {
  it("not", () => {
    const isNotNumber = not(isNumber);

    expect(isNotNumber(4)).toBeFalse();
    expect(isNotNumber("hello")).toBeTrue();
  });

  it("and", () => {
    const between5And10 = and(lt(10), gt(5));

    expect(between5And10(7)).toBeTrue();
    expect(between5And10(2)).toBeFalse();
    expect(between5And10(12)).toBeFalse();
  });

  it("or", () => {
    const less5OrGreater10 = or(lt(5), gt(10));

    expect(less5OrGreater10(7)).toBeFalse();
    expect(less5OrGreater10(2)).toBeTrue();
    expect(less5OrGreater10(12)).toBeTrue();
  });

  it("all", () => {
    const myNumber = all([isNumber, lt(10), gt(5)]);

    expect(myNumber(7)).toBeTrue();
    expect(myNumber(2)).toBeFalse();
    expect(myNumber(12)).toBeFalse();
  });

  it("any", () => {
    const isNumberOrStringOrBoolean = any([isNumber, isString, isBoolean]);

    expect(isNumberOrStringOrBoolean(4)).toBeTrue();
    expect(isNumberOrStringOrBoolean("test")).toBeTrue();
    expect(isNumberOrStringOrBoolean(true)).toBeTrue();

    expect(isNumberOrStringOrBoolean(null)).toBeFalse();
    expect(isNumberOrStringOrBoolean(undefined)).toBeFalse();
    expect(isNumberOrStringOrBoolean({})).toBeFalse();
  });

  it("eq", () => {
    const predicate = eq(5);

    expect(predicate(5)).toBeTrue();
    expect(predicate(4)).toBeFalse();
  });

  it("ne", () => {
    const predicate = ne(5);

    expect(predicate(5)).toBeFalse();
    expect(predicate(4)).toBeTrue();
  });

  it("lt", () => {
    const predicate = lt(4);

    expect(predicate(5)).toBeFalse();
    expect(predicate(4)).toBeFalse();
    expect(predicate(3)).toBeTrue();
  });

  it("gt", () => {
    const predicate = gt(4);

    expect(predicate(5)).toBeTrue();
    expect(predicate(4)).toBeFalse();
    expect(predicate(3)).toBeFalse();
  });

  it("le", () => {
    const predicate = le(4);

    expect(predicate(5)).toBeFalse();
    expect(predicate(4)).toBeTrue();
    expect(predicate(3)).toBeTrue();
  });

  it("ge", () => {
    const predicate = ge(4);

    expect(predicate(5)).toBeTrue();
    expect(predicate(4)).toBeTrue();
    expect(predicate(3)).toBeFalse();
  });

  it("isNull", () => {
    expect(isNull(null)).toBeTrue();
    expect(isNull(undefined)).toBeFalse();
    expect(isNull(4)).toBeFalse();
    expect(isNull("hello")).toBeFalse();
  });

  it("isNotNull", () => {
    expect(isNotNull(null)).toBeFalse();
    expect(isNotNull(undefined)).toBeTrue();
    expect(isNotNull(4)).toBeTrue();
    expect(isNotNull("hello")).toBeTrue();
  });

  it("isUndefined", () => {
    expect(isUndefined(null)).toBeFalse();
    expect(isUndefined(undefined)).toBeTrue();
    expect(isUndefined(4)).toBeFalse();
    expect(isUndefined("hello")).toBeFalse();
  });

  it("isNotUndefined", () => {
    expect(isNotUndefined(null)).toBeTrue();
    expect(isNotUndefined(undefined)).toBeFalse();
    expect(isNotUndefined(4)).toBeTrue();
    expect(isNotUndefined("hello")).toBeTrue();
  });

  it("isBoolean", () => {
    expect(isBoolean(true)).toBeTrue();
    expect(isBoolean(false)).toBeTrue();
    expect(isBoolean(null)).toBeFalse();
    expect(isBoolean(4)).toBeFalse();
  });

  it("isNumber", () => {
    expect(isNumber(4)).toBeTrue();
    expect(isNumber(4.4)).toBeTrue();

    expect(isNumber(null)).toBeFalse();
    expect(isNumber(true)).toBeFalse();
    expect(isNumber("hello")).toBeFalse();
  });

  it("isInteger", () => {
    expect(isInteger(4)).toBeTrue();
    expect(isInteger(4.4)).toBeFalse();
  });

  it("isBigInt", () => {
    expect(isBigInt(4)).toBeFalse();
    expect(isBigInt(4n)).toBeTrue();
  });

  it("isString", () => {
    expect(isString("hello")).toBeTrue();
    expect(isString(4)).toBeFalse();
    expect(isString(null)).toBeFalse();
    expect(isString(true)).toBeFalse();
  });

  it("isEmpty", () => {
    expect(isEmpty("hello")).toBeFalse();
    expect(isEmpty("")).toBeTrue();
  });

  it("includes", () => {
    const predicate = includes("test");

    expect(predicate("Hello test world")).toBeTrue();
    expect(predicate("Hello world")).toBeFalse();
  });

  it("startsWith", () => {
    const predicate = startsWith("test");

    expect(predicate("test world")).toBeTrue();
    expect(predicate("world")).toBeFalse();
  });

  it("endsWith", () => {
    const predicate = endsWith("test");

    expect(predicate("world test")).toBeTrue();
    expect(predicate("world")).toBeFalse();
  });

  it("isMatch", () => {
    const predicate = isMatch(/Hello*/);

    expect(predicate("Hello world")).toBeTrue();
    expect(predicate("Fello world")).toBeFalse();
  });

  it("isFunction", () => {
    expect(isFunction(isFunction)).toBeTrue();
    expect(isFunction("isFunction")).toBeFalse();
  });

  it("isSymbol", () => {
    expect(isSymbol(Symbol.for("a"))).toBeTrue();
    expect(isSymbol("a")).toBeFalse();
  });

  it("isTruthy", () => {
    expect(isTruthy(1)).toBeTrue();
    expect(isTruthy("a")).toBeTrue();

    expect(isTruthy(0)).toBeFalse();
    expect(isTruthy("")).toBeFalse();
  });

  it("isSet", () => {
    expect(isSet(new Set())).toBeTrue();
    expect(isSet({})).toBeFalse();
  });

  it("isMap", () => {
    expect(isMap(new Map())).toBeTrue();
    expect(isMap({})).toBeFalse();
  });

  it("isNullable", () => {
    expect(isNullable(null)).toBeTrue();
    expect(isNullable(undefined)).toBeTrue();
    expect(isNullable(4)).toBeFalse();
  });

  it("isNotNullable", () => {
    expect(isNotNullable(null)).toBeFalse();
    expect(isNotNullable(undefined)).toBeFalse();
    expect(isNotNullable(4)).toBeTrue();
  });

  it("isError", () => {
    expect(isError(new Error())).toBeTrue();
    expect(isError({})).toBeFalse();
    expect(isError(null)).toBeFalse();
    expect(isError(undefined)).toBeFalse();
  });

  it("isDate", () => {
    expect(isDate(new Date())).toBeTrue();
    expect(isDate({})).toBeFalse();
  });

  it("isPromise", () => {
    expect(isPromise(Promise.resolve(4))).toBeTrue();
    expect(isPromise(4)).toBeFalse();
  });

  it("isRegExp", () => {
    expect(isRegExp(/4/)).toBeTrue();
    expect(isRegExp(4)).toBeFalse();
  });

  it("isRecordOrArray", () => {
    expect(isRecordOrArray({})).toBeTrue();
    expect(isRecordOrArray([])).toBeTrue();

    expect(isRecordOrArray(null)).toBeFalse();
    expect(isRecordOrArray(undefined)).toBeFalse();
    expect(isRecordOrArray(4)).toBeFalse();
  });

  it("isObject", () => {
    expect(isObject({})).toBeTrue();
    expect(isObject([])).toBeTrue();
    expect(isObject(() => {})).toBeTrue();

    expect(isObject(null)).toBeFalse();
    expect(isObject(undefined)).toBeFalse();
    expect(isObject(4)).toBeFalse();
  });

  it("hasProperty", () => {
    expect(hasProperty({}, "test")).toBeFalse();
    expect(hasProperty("test", "test")).toBeFalse();
    expect(hasProperty({ test: 4 }, "test")).toBeTrue();
  });

  it("isIterable", () => {
    expect(isIterable([])).toBeTrue();
    expect(isIterable({})).toBeFalse();
  });

  it("isAsyncIterable", () => {
    expect(isAsyncIterable({ [Symbol.asyncIterator]() {} })).toBeTrue();
    expect(isAsyncIterable({})).toBeFalse();
  });
});