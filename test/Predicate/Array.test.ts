import { describe, it, expect } from "bun:test";

import {
  isEmpty,
  isNonEmpty,
  len,
  max,
  min,
} from "~/Predicate/Array";

describe("Predicate/Array", () => {
  it("isEmpty", () => {
    expect(isEmpty([4])).toBeFalse();
    expect(isEmpty([])).toBeTrue();
  });

  it("isNonEmpty", () => {
    expect(isNonEmpty([4])).toBeTrue();
    expect(isNonEmpty([])).toBeFalse();
  });

  it("max", () => {
    const predicate = max(4);

    expect(predicate([1, 2, 3, 4])).toBeTrue();
    expect(predicate([1, 2, 3, 4, 5])).toBeFalse();
  });

  it("min", () => {
    const predicate = min(4);

    expect(predicate([1, 2, 3, 4])).toBeTrue();
    expect(predicate([1, 2, 3])).toBeFalse();
  });

  it("len", () => {
    const predicate = len(4);

    expect(predicate([1, 2, 3, 4])).toBeTrue();
    expect(predicate([1, 2])).toBeFalse();
    expect(predicate([1, 2, 3, 4, 5])).toBeFalse();
  });
});
