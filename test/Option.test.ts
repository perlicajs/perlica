import { describe, it, expect } from "bun:test";

import { none, some, bind, type Option } from "~/Option";

import type { Assert } from "./Helpers";

describe("option", () => {
  const optSome = some(1);
  const optNone = none<number>();

  const unionSome = some(1);
  const unionNone = none<number>();

  it("map", () => {
    {
      const a = some(1).map(x => x + 1);
      const b = none().map(_x => "foo");

      expect(a).toEqual(some(2));
      expect(b).toEqual(none());

      type _a = Assert<Option<number>, typeof a>;
      type _b = Assert<Option<string>, typeof b>;
    }
    {
      const a = optSome.map(x => x + 1);
      const b = optNone.map(_x => "foo");

      expect(a).toEqual(some(2));
      expect(b).toEqual(none());

      type _a = Assert<Option<number>, typeof a>;
      type _b = Assert<Option<string>, typeof b>;
    }
    {
      const a = unionSome.map(x => x + 1);
      const b = unionNone.map(_x => "foo");

      expect(a).toEqual(some(2));
      expect(b).toEqual(none());

      type _a = Assert<Option<number>, typeof a>;
      type _b = Assert<Option<string>, typeof b>;
    }
  });

  it("andThen", () => {
    {
      const a = some(1).andThen(x => some(x + 1));
      const b = some(1).andThen(_x => none());
      const c = none().andThen(_x => some("foo"));
      const d = none().andThen(_x => none());

      expect(a).toEqual(some(2));
      expect(b).toEqual(none());
      expect(c).toEqual(none());
      expect(d).toEqual(none());

      type _a = Assert<Option<number>, typeof a>;
      type _b = Assert<Option<never>, typeof b>;
      type _c = Assert<Option<string>, typeof c>;
      type _d = Assert<Option<never>, typeof d>;
    }
    {
      const a = optSome.andThen(x => some(x + 1));
      const b = optSome.andThen(_x => none());
      const c = optNone.andThen(_x => some("foo"));
      const d = optNone.andThen(_x => none());

      expect(a).toEqual(some(2));
      expect(b).toEqual(none());
      expect(c).toEqual(none());
      expect(d).toEqual(none());

      type _a = Assert<Option<number>, typeof a>;
      type _b = Assert<Option<never>, typeof b>;
      type _c = Assert<Option<string>, typeof c>;
      type _d = Assert<Option<never>, typeof d>;
    }
    {
      const a = unionSome.andThen(x => some(x + 1));
      const b = unionSome.andThen(_x => none());
      const c = unionNone.andThen(_x => some("foo"));
      const d = unionNone.andThen(_x => none());

      expect(a).toEqual(some(2));
      expect(b).toEqual(none());
      expect(c).toEqual(none());
      expect(d).toEqual(none());

      type _a = Assert<Option<number>, typeof a>;
      type _b = Assert<Option<never>, typeof b>;
      type _c = Assert<Option<string>, typeof c>;
      type _d = Assert<Option<never>, typeof d>;
    }
  });

  it("unwrap", () => {
    {
      const a = some(1).unwrap();
      const b = () => none().unwrap();

      expect(a).toEqual(1);
      expect(b).toThrow("called `Option.unwrap()` on a `None` value");

      type _a = Assert<number, typeof a>;
      type _b = Assert<() => never, typeof b>;
    }
    {
      const a = optSome.unwrap();
      const b = () => optNone.unwrap();

      expect(a).toEqual(1);
      expect(b).toThrow("called `Option.unwrap()` on a `None` value");

      type _a = Assert<number, typeof a>;
      type _b = Assert<() => number, typeof b>;
    }
    {
      const a = unionSome.unwrap();
      const b = () => unionNone.unwrap();

      expect(a).toEqual(1);
      expect(b).toThrow("called `Option.unwrap()` on a `None` value");

      type _a = Assert<number, typeof a>;
      type _b = Assert<() => number, typeof b>;
    }
  });
  it("bind", () => {
    {
      const a = bind(function* () {
        return yield* some(1);
      }).unwrap();
      const b = () => bind(function* () {
        return yield* none();
      }).unwrap();

      expect(a).toEqual(1);
      expect(b).toThrow("called `Option.unwrap()` on a `None` value");

      type _a = Assert<number, typeof a>;
      type _b = Assert<() => never, typeof b>;
    }
    {
      const a = bind(function* () {
        const a = yield* some(1);
        const b = yield* some({ value: 2 });
        return a + b.value;
      }).unwrap();

      expect(a).toEqual(3);

      type _a = Assert<number, typeof a>;
    }
  });
});
