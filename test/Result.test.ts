import { describe, it, expect } from "bun:test";

import { err, ok, type Err, type Ok, type Result } from "~/Result";

import type { Assert } from "./Helpers";

describe("result", () => {
  const resultOk = ok(4) as Result<number, string>;
  const resultErr = err("error") as Result<number, string>;

  const unionOk = ok(4) as Ok<number> | Err<string>;
  const unionErr = err("error") as Ok<number> | Err<string>;

  it("and", () => {
    {
      {
        const a = ok(4);
        const b = err("new error");

        const t = a.and(b);
        expect(t).toEqual(err("new error"));

        type _t = Assert<Result<never, string>, typeof t>;
      }
      {
        const a = err("old error");
        const b = ok(4);

        const t = a.and(b);
        expect(t).toEqual(err("old error"));

        type _t = Assert<Result<number, string>, typeof t>;
      }
      {
        const a = err("old error");
        const b = err("new error");

        const t = a.and(b);
        expect(t).toEqual(err("old error"));

        type _t = Assert<Result<never, string>, typeof t>;
      }
      {
        const a = ok(4);
        const b = ok(12);

        const t = a.and(b);
        expect(t).toEqual(ok(12));

        type _t = Assert<Result<number, never>, typeof t>;
      }
    }
    {
      {
        const t = resultOk.and(resultErr);
        expect(t).toEqual(err("error"));

        type _t = Assert<Result<number, string>, typeof t>;
      }
      {
        const t = resultErr.and(resultOk);
        expect(t).toEqual(err("error"));

        type _t = Assert<Result<number, string>, typeof t>;
      }
      {
        const t = resultErr.and(resultErr);
        expect(t).toEqual(err("error"));

        type _t = Assert<Result<number, string>, typeof t>;
      }
      {
        const t = resultOk.and(resultOk);
        expect(t).toEqual(ok(4));

        type _t = Assert<Result<number, string>, typeof t>;
      }
    }
    {
      {
        const t = unionOk.and(unionErr);
        expect(t).toEqual(err("error"));

        type _t = Assert<Result<number, string>, typeof t>;
      }
      {
        const t = unionErr.and(unionOk);
        expect(t).toEqual(err("error"));

        type _t = Assert<Result<number, string>, typeof t>;
      }
      {
        const t = unionErr.mapErr(_ => "old error").and(unionErr);
        expect(t).toEqual(err("old error"));

        type _t = Assert<Result<number, string>, typeof t>;
      }
      {
        const t = unionOk.map(_ => 12).and(unionOk);
        expect(t).toEqual(ok(4));

        type _t = Assert<Result<number, string>, typeof t>;
      }
    }
  });

  it("andThen", () => {
    {
      {
        const a = ok(4);
        const b = err("new error");

        const t = a.andThen(_ => b);
        expect(t).toEqual(err("new error"));

        type _t = Assert<Result<never, string>, typeof t>;
      }
      {
        const a = err("old error");
        const b = ok(4);

        const t = a.andThen(_ => b);
        expect(t).toEqual(err("old error"));

        type _t = Assert<Result<number, string>, typeof t>;
      }
      {
        const a = err("old error");
        const b = err("new error");

        const t = a.andThen(_ => b);
        expect(t).toEqual(err("old error"));

        type _t = Assert<Result<never, string>, typeof t>;
      }
      {
        const a = ok(4);
        const b = ok(12);

        const t = a.andThen(_ => b);
        expect(t).toEqual(ok(12));

        type _t = Assert<Result<number, never>, typeof t>;
      }
    }
    {
      {
        const t = resultOk.andThen(_ => resultErr);
        expect(t).toEqual(err("error"));

        type _t = Assert<Result<number, string>, typeof t>;
      }
      {
        const t = resultErr.andThen(_ => resultOk);
        expect(t).toEqual(err("error"));

        type _t = Assert<Result<number, string>, typeof t>;
      }
      {
        const t = resultErr.andThen(_ => resultErr);
        expect(t).toEqual(err("error"));

        type _t = Assert<Result<number, string>, typeof t>;
      }
      {
        const t = resultOk.andThen(_ => resultOk);
        expect(t).toEqual(ok(4));

        type _t = Assert<Result<number, string>, typeof t>;
      }
    }
    {
      {
        const t = unionOk.andThen(_ => unionErr);
        expect(t).toEqual(err("error"));

        type _t = Assert<Result<number, string>, typeof t>;
      }
      {
        const t = unionErr.andThen(_ => unionOk);
        expect(t).toEqual(err("error"));

        type _t = Assert<Result<number, string>, typeof t>;
      }
      {
        const t = unionErr.mapErr(_ => "old error").andThen(_ => unionErr);
        expect(t).toEqual(err("old error"));

        type _t = Assert<Result<number, string>, typeof t>;
      }
      {
        const t = unionOk.map(_ => 12).andThen(_ => unionOk);
        expect(t).toEqual(ok(4));

        type _t = Assert<Result<number, string>, typeof t>;
      }
    }
    {
      const string_to_number = (num: string): Result<number, Error> => {
        const v = Number(num);
        return isNaN(v) ? err(Error("Not a Number")) : ok(v);
      };

      const t1 = ok("4").andThen(string_to_number);
      const t2 = ok("hello").andThen(string_to_number);
      const t3 = err(Error("old error")).andThen(string_to_number);

      expect(t1).toEqual(ok(4));
      expect(t2).toEqual(err(Error("Not a Number")));
      expect(t3).toEqual(err(Error("old error")));

      type _t1 = Assert<Result<number, Error>, typeof t1>;
      type _t2 = Assert<Result<number, Error>, typeof t2>;
      type _t3 = Assert<Result<number, Error>, typeof t3>;
    }
  });

  it("expect", () => {
    {
      const a = ok(4);
      const b = err("error");

      const t = a.expect("my error message");

      expect(t).toEqual(4);
      expect(() => b.expect("my error message")).toThrowError("my error message");

      type _t = Assert<number, typeof t>;
    }
    {
      const t = resultOk.expect("my error message");

      expect(t).toEqual(4);
      expect(() => resultErr.expect("my error message")).toThrowError("my error message");

      type _t = Assert<number, typeof t>;
    }
    {
      const t = unionOk.expect("my error message");

      expect(t).toEqual(4);
      expect(() => unionErr.expect("my error message")).toThrowError("my error message");

      type _t = Assert<number, typeof t>;
    }
  });

  it("expectErr", () => {
    {
      const a = ok(4);
      const b = err("error");

      const t = b.expectErr("my error message");

      expect(() => a.expectErr("my error message")).toThrowError("my error message");
      expect(t).toEqual("error");

      type _t = Assert<string, typeof t>;
    }
    {
      const t = resultErr.expectErr("my error message");

      expect(() => resultOk.expectErr("my error message")).toThrowError("my error message");
      expect(t).toEqual("error");

      type _t = Assert<string, typeof t>;
    }
    {
      const t = unionErr.expectErr("my error message");

      expect(() => unionOk.expectErr("my error message")).toThrowError("my error message");
      expect(t).toEqual("error");

      type _t = Assert<string, typeof t>;
    }
  });
});
