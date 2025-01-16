import { describe, it, expect } from "bun:test";

import {
  isEmpty, includes, startsWith, endsWith, isMatch,
  maxLen, minLen, len,
} from "~/Predicate/String";

describe("Predicate/String", () => {
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

  it("maxLen", () => {
    const predicate = maxLen(5);

    expect(predicate("Hello")).toBeTrue();
    expect(predicate("Hello world")).toBeFalse();
  });

  it("minLen", () => {
    const predicate = minLen(5);

    expect(predicate("Hello")).toBeTrue();
    expect(predicate("Hi")).toBeFalse();
  });

  it("len", () => {
    const predicate = len(5);

    expect(predicate("Hello")).toBeTrue();
    expect(predicate("Hi")).toBeFalse();
    expect(predicate("Hello world")).toBeFalse();
  });
});
