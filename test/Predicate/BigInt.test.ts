import { describe, it, expect } from "bun:test";

import {
  ge, gt, le, lt,
  isNegative, isNonNegative, isNonPositive, isPositive, multipleOf,
} from "~/Predicate/BigInt";

describe("Predicate/BigInt", () => {
  it("isPositive", () => {
    expect(isPositive(0n)).toBeFalse();
    expect(isPositive(4n)).toBeTrue();
    expect(isPositive(-4n)).toBeFalse();
  });

  it("isNonNegative", () => {
    expect(isNonNegative(0n)).toBeTrue();
    expect(isNonNegative(4n)).toBeTrue();
    expect(isNonNegative(-4n)).toBeFalse();
  });

  it("isNegative", () => {
    expect(isNegative(0n)).toBeFalse();
    expect(isNegative(4n)).toBeFalse();
    expect(isNegative(-4n)).toBeTrue();
  });

  it("isNonPositive", () => {
    expect(isNonPositive(0n)).toBeTrue();
    expect(isNonPositive(4n)).toBeFalse();
    expect(isNonPositive(-4n)).toBeTrue();
  });

  it("lt", () => {
    const predicate = lt(4n);

    expect(predicate(5n)).toBeFalse();
    expect(predicate(4n)).toBeFalse();
    expect(predicate(3n)).toBeTrue();
  });

  it("gt", () => {
    const predicate = gt(4n);

    expect(predicate(5n)).toBeTrue();
    expect(predicate(4n)).toBeFalse();
    expect(predicate(3n)).toBeFalse();
  });

  it("le", () => {
    const predicate = le(4n);

    expect(predicate(5n)).toBeFalse();
    expect(predicate(4n)).toBeTrue();
    expect(predicate(3n)).toBeTrue();
  });

  it("ge", () => {
    const predicate = ge(4n);

    expect(predicate(5n)).toBeTrue();
    expect(predicate(4n)).toBeTrue();
    expect(predicate(3n)).toBeFalse();
  });

  it("multipleOf", () => {
    const predicate = multipleOf(2n);

    expect(predicate(4n)).toBeTrue();
    expect(predicate(3n)).toBeFalse();
  });
});
