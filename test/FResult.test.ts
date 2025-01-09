import { describe, it, expect } from "bun:test";

import * as R from "~/Result";

import type { Assert } from "./Helpers";

describe("result", () => {
  it("and", () => {
    {
      {
        const a = R.ok(4);
        const b = R.err("new error");

        const t = R.and(a, b);
        expect(t).toEqual(R.err("new error"));

        type _t = Assert<R.Result<never, string>, typeof t>;
      }
      {
        const a = R.err("old error");
        const b = R.ok(4);

        const t = R.and(a, b);
        expect(t).toEqual(R.err("old error"));

        type _t = Assert<R.Result<number, string>, typeof t>;
      }
      {
        const a = R.err("old error");
        const b = R.err("new error");

        const t = R.and(a, b);
        expect(t).toEqual(R.err("old error"));

        type _t = Assert<R.Result<never, string>, typeof t>;
      }
      {
        const a = R.ok(4);
        const b = R.ok(12);

        const t = R.and(a, b);
        expect(t).toEqual(R.ok(12));

        type _t = Assert<R.Result<number, never>, typeof t>;
      }
    }
  });

  it("andThen", () => {
    {
      const string_to_number = (num: string): R.Result<number, Error> => {
        const v = Number(num);
        return isNaN(v) ? R.err(Error("Not a Number")) : R.ok(v);
      };

      const t1 = R.andThen(R.ok("4"), string_to_number);
      const t2 = R.andThen(R.ok("hello"), string_to_number);
      const t3 = R.andThen(R.err(Error("old error")), string_to_number);

      expect(t1).toEqual(R.ok(4));
      expect(t2).toEqual(R.err(Error("Not a Number")));
      expect(t3).toEqual(R.err(Error("old error")));

      type _t1 = Assert<R.Result<number, Error>, typeof t1>;
      type _t2 = Assert<R.Result<number, Error>, typeof t2>;
      type _t3 = Assert<R.Result<number, Error>, typeof t3>;
    }
  });

  it("expect", () => {
    {
      const a = R.ok(4);
      const b = R.err("error");

      const t = R.expect(a, "my error message");

      expect(t).toEqual(4);
      expect(() => R.expect(b, "my error message")).toThrowError("my error message");

      type _t = Assert<number, typeof t>;
    }
  });

  it("expectErr", () => {
    {
      const a = R.ok(4);
      const b = R.err("error");

      const t = R.expectErr(b, "my error message");

      expect(() => R.expectErr(a, "my error message")).toThrowError("my error message");
      expect(t).toEqual("error");

      type _t = Assert<string, typeof t>;
    }
  });

  it("bind", () => {
    {
      const a = R.bind(function* () {
        return yield* R.ok(1);
      }).unwrap();

      const b = () => R.bind(function* () {
        return yield* R.err(1);
      }).unwrap();

      expect(a).toEqual(1);
      expect(b).toThrow(`called \`Result.unwrap()\` on an \`Err\` value: 1`);

      type _a = Assert<number, typeof a>;
      type _b = Assert<() => never, typeof b>;
    }
    {
      const a = R.bind(function* () {
        const a = yield* R.ok(1);
        const b = yield* R.ok({ num: 1 });
        return a + b.num;
      }).unwrap();

      expect(a).toEqual(2);

      type _a = Assert<number, typeof a>;
    }
    {
      const a = R.bind(function* () {
        const a = yield* R.ok(1);
        const b = yield* R.err("error");
        return a + b;
      });

      expect(a.value).toEqual("error");

      type _a = Assert<R.Result<number, string>, typeof a>;
    }
    {
      const a = R.bind(function* () {
        const a = yield* R.ok(1);
        const b = yield* R.err("error");
        const c = yield* R.err(22);
        return a + b + c;
      });

      expect(a.value).toEqual("error");

      type _a = Assert<R.Result<number, string | number>, typeof a>;
    }
  });
});
