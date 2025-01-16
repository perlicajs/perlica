import { describe, it, expect } from "bun:test";

import {
  ge, gt, le, lt,
  isFinite, isNegative, isNonNegative, isNonPositive, isPositive, multipleOf,
} from "~/Predicate/Number";

describe("Predicate/Number", () => {
  it("isPositive", () => {
    expect(isPositive(0)).toBeFalse();
    expect(isPositive(4)).toBeTrue();
    expect(isPositive(-4)).toBeFalse();
  });

  it("isNonNegative", () => {
    expect(isNonNegative(0)).toBeTrue();
    expect(isNonNegative(4)).toBeTrue();
    expect(isNonNegative(-4)).toBeFalse();
  });

  it("isNegative", () => {
    expect(isNegative(0)).toBeFalse();
    expect(isNegative(4)).toBeFalse();
    expect(isNegative(-4)).toBeTrue();
  });

  it("isNonPositive", () => {
    expect(isNonPositive(0)).toBeTrue();
    expect(isNonPositive(4)).toBeFalse();
    expect(isNonPositive(-4)).toBeTrue();
  });

  it("isFinite", () => {
    expect(isFinite(4 / 2)).toBeTrue();
    expect(isFinite(4 / 0)).toBeFalse();
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

  it("multipleOf", () => {
    const predicate = multipleOf(2);

    expect(predicate(4)).toBeTrue();
    expect(predicate(3)).toBeFalse();
  });
});
