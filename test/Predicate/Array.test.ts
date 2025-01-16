import { describe, it, expect } from "bun:test";

import {
  isEmpty,
  isNonEmpty,
  len,
  maxLen,
  minLen,
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

  it("maxLen", () => {
    const predicate = maxLen(4);

    expect(predicate([1, 2, 3, 4])).toBeTrue();
    expect(predicate([1, 2, 3, 4, 5])).toBeFalse();
  });

  it("minLen", () => {
    const predicate = minLen(4);

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
