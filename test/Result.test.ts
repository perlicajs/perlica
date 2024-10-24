/* eslint-disable @stylistic/yield-star-spacing */
import { describe, it, expect } from "bun:test";

import { err, ok, type Err, type Ok, type Result, bind } from "~/Result";

import type { Assert } from "./Helpers";

describe("result", () => {
  const resultOk = ok(1) as Result<number, string>;
  const resultErr = err(1) as Result<string, number>;

  const unionOk = ok(1) as Ok<number> | Err<string>;
  const unionErr = err(1) as Ok<string> | Err<number>;

  it("map", () => {
    {
      const a = ok(1).map(x => "hi" + x);
      const b = err(1).map(_x => "foo");

      expect(a).toEqual(ok("hi1"));
      expect(b).toEqual(err(1));

      type _a = Assert<Result<string, never>, typeof a>;
      type _b = Assert<Result<string, number>, typeof b>;
    }
    {
      const a = resultOk.map(x => x + 1);
      const b = resultErr.map(_x => "foo");

      expect(a).toEqual(ok(2));
      expect(b).toEqual(err(1));

      type _a = Assert<Result<number, string>, typeof a>;
      type _b = Assert<Result<string, number>, typeof b>;
    }
    {
      const a = unionOk.map(x => x + 1);
      const b = unionErr.map(_x => "foo");

      expect(a).toEqual(ok(2));
      expect(b).toEqual(err(1));

      type _a = Assert<Result<number, string>, typeof a>;
      type _b = Assert<Result<string, number>, typeof b>;
    }
  });

  it("mapErr", () => {
    {
      const a = ok(1).mapErr(x => x + 1);
      const b = err(1).mapErr(x => `foo ${x}`);

      expect(a).toEqual(ok(1));
      expect(b).toEqual(err("foo 1"));

      type _a = Assert<Result<number, number>, typeof a>;
      type _b = Assert<Result<never, string>, typeof b>;
    }
    {
      const a = resultOk.mapErr(_ => 1);
      const b = resultErr.mapErr(x => `foo ${x}`);

      expect(a).toEqual(ok(1));
      expect(b).toEqual(err("foo 1"));

      type _a = Assert<Result<number, number>, typeof a>;
      type _b = Assert<Result<string, string>, typeof b>;
    }
    {
      const a = unionOk.mapErr(_ => 1);
      const b = unionErr.mapErr(x => `foo ${x}`);

      expect(a).toEqual(ok(1));
      expect(b).toEqual(err("foo 1"));

      type _a = Assert<Result<number, number>, typeof a>;
      type _b = Assert<Result<string, string>, typeof b>;
    }
  });

  it("andThen", () => {
    {
      const a = ok(1).andThen(x => ok(`hi ${x}`));
      const b = ok(1).andThen(x => err(x + 4));
      const c = err(1).andThen(x => ok(`hi ${x}`));
      const d = err(1).andThen(_ => err(4));

      expect(a).toEqual(ok("hi 1"));
      expect(b).toEqual(err(5));
      expect(c).toEqual(err(1));
      expect(d).toEqual(err(1));

      type _a = Assert<Result<string, never>, typeof a>;
      type _b = Assert<Result<never, number>, typeof b>;
      type _c = Assert<Result<string, number>, typeof c>;
      type _d = Assert<Result<never, number>, typeof d>;
    }
    {
      const a = resultOk.andThen(x => ok(`hi ${x}`));
      const b = resultOk.andThen(x => err("hi" + x));
      const c = resultErr.andThen(x => ok(`hi ${x}`));
      const d = resultErr.andThen(_ => err(4));

      expect(a).toEqual(ok("hi 1"));
      expect(b).toEqual(err("hi1"));
      expect(c).toEqual(err(1));
      expect(d).toEqual(err(1));

      type _a = Assert<Result<string, string>, typeof a>;
      type _b = Assert<Result<never, string>, typeof b>;
      type _c = Assert<Result<string, number>, typeof c>;
      type _d = Assert<Result<never, number>, typeof d>;
    }
    {
      const a = unionOk.andThen(x => ok(`hi ${x}`));
      const b = unionOk.andThen(x => err("hi" + x));
      const c = unionErr.andThen(x => ok(`hi ${x}`));
      const d = unionErr.andThen(_ => err(4));

      expect(a).toEqual(ok("hi 1"));
      expect(b).toEqual(err("hi1"));
      expect(c).toEqual(err(1));
      expect(d).toEqual(err(1));

      type _a = Assert<Result<string, string>, typeof a>;
      type _b = Assert<Result<never, string>, typeof b>;
      type _c = Assert<Result<string, number>, typeof c>;
      type _d = Assert<Result<never, number>, typeof d>;
    }
  });

  it("orElse", () => {
    {
      const a = ok(1).orElse(_ => ok(4));
      const b = ok(1).orElse(_ => err(4));
      const c = err(1).orElse(x => ok(`hi ${x}`));
      const d = err(1).orElse(_ => err(4));

      expect(a).toEqual(ok(1));
      expect(b).toEqual(ok(1));
      expect(c).toEqual(ok("hi 1"));
      expect(d).toEqual(err(4));

      type _a = Assert<Result<number, never>, typeof a>;
      type _b = Assert<Result<number, number>, typeof b>;
      type _c = Assert<Result<string, never>, typeof c>;
      type _d = Assert<Result<never, number>, typeof d>;
    }
    {
      const a = resultOk.orElse(_ => ok(4));
      const b = resultOk.orElse(_ => err(4));
      const c = resultErr.orElse(x => ok(`hi ${x}`));
      const d = resultErr.orElse(_ => err(4));

      expect(a).toEqual(ok(1));
      expect(b).toEqual(ok(1));
      expect(c).toEqual(ok("hi 1"));
      expect(d).toEqual(err(4));

      type _a = Assert<Result<number, never>, typeof a>;
      type _b = Assert<Result<number, number>, typeof b>;
      type _c = Assert<Result<string, never>, typeof c>;
      type _d = Assert<Result<string, number>, typeof d>;
    }
    {
      const a = unionOk.orElse(_ => ok(4));
      const b = unionOk.orElse(_ => err(4));
      const c = unionErr.orElse(x => ok(`hi ${x}`));
      const d = unionErr.orElse(_ => err(4));

      expect(a).toEqual(ok(1));
      expect(b).toEqual(ok(1));
      expect(c).toEqual(ok("hi 1"));
      expect(d).toEqual(err(4));

      type _a = Assert<Result<number, never>, typeof a>;
      type _b = Assert<Result<number, number>, typeof b>;
      type _c = Assert<Result<string, never>, typeof c>;
      type _d = Assert<Result<string, number>, typeof d>;
    }
  });

  it("unwrap", () => {
    {
      const a = ok(1).unwrap();
      const b = () => err(1).unwrap();

      expect(a).toEqual(1);
      expect(b).toThrow(`called \`Result.unwrap()\` on an \`Err\` value: 1`);

      type _a = Assert<number, typeof a>;
      type _b = Assert<() => never, typeof b>;
    }
    {
      const a = resultOk.unwrap();
      const b = () => resultErr.unwrap();

      expect(a).toEqual(1);
      expect(b).toThrow(`called \`Result.unwrap()\` on an \`Err\` value: 1`);

      type _a = Assert<number, typeof a>;
      type _b = Assert<() => string, typeof b>;
    }
    {
      const a = unionOk.unwrap();
      const b = () => unionErr.unwrap();

      expect(a).toEqual(1);
      expect(b).toThrow(`called \`Result.unwrap()\` on an \`Err\` value: 1`);

      type _a = Assert<number, typeof a>;
      type _b = Assert<() => string, typeof b>;
    }
  });

  it("bind", () => {
    {
      const a = bind(function* () {
        return yield* ok(1);
      }).unwrap();

      const b = () => bind(function* () {
        return yield* err(1);
      }).unwrap();

      expect(a).toEqual(1);
      expect(b).toThrow(`called \`Result.unwrap()\` on an \`Err\` value: 1`);

      type _a = Assert<number, typeof a>;
      type _b = Assert<() => never, typeof b>;
    }
    {
      const a = bind(function* () {
        const a = yield* ok(1);
        const b = yield* ok({ num: 1 });
        return a + b.num;
      }).unwrap();

      expect(a).toEqual(2);

      type _a = Assert<number, typeof a>;
    }
    {
      const a = bind(function* () {
        const a = yield* ok(1);
        const b = yield* err("error");
        return a + b;
      });

      expect(a.value).toEqual("error");

      type _a = Assert<Result<number, string>, typeof a>;
    }
    {
      const a = bind(function* () {
        const a = yield* ok(1);
        const b = yield* err("error");
        const c = yield* err(22);
        return a + b + c;
      });

      expect(a.value).toEqual("error");

      type _a = Assert<Result<number, string | number>, typeof a>;
    }
  });
});
