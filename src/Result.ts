/**
 *    |----------------------|------------------|
 *    | Rust methods         | Perlica          |
 *    |----------------------|------------------|
 *    | and                  | and              |
 *    | and_then             | andThen          |
 *    | as_deref             |                  |
 *    | as_deref_mut         |                  |
 *    | as_mut               |                  |
 *    | as_ref               |                  |
 *    | cloned               |                  |
 *    | copied               |                  |
 *    | err                  | err              |
 *    | expect               | expect           |
 *    | expect_err           | expectErr        |
 *    | flatten              | flatten          |
 *    | inspect              | inspect          |
 *    | inspect_err          | inspectErr       |
 *    | into_err             |                  |
 *    | into_ok              |                  |
 *    | is_err               | isErr            |
 *    | is_err_and           | isErrAnd         |
 *    | is_ok                | isOk             |
 *    | is_ok_and            | isOkAnd          |
 *    | iter                 |                  |
 *    | iter_mut             |                  |
 *    | map                  | map              |
 *    | map_err              | mapErr           |
 *    | map_or               | mapOr            |
 *    | map_or_else          | mapOrElse        |
 *    | ok                   | ok               |
 *    | or                   | or               |
 *    | or_else              | orElse           |
 *    | transpose            | transpose        |
 *    | unwrap               | unwrap           |
 *    | unwrap_err           | unwrapErr        |
 *    | unwrap_err_unchecked |                  |
 *    | unwrap_or            | unwrapOr         |
 *    | unwrap_or_default    |                  |
 *    | unwrap_or_else       | unwrapOrElse     |
 *    | unwrap_unchecked     |                  |
 *    |----------------------|------------------|
 */
import { OnceIterator }                    from "./Iterator";
import { isNone, none, some, type Option } from "./Option";

export type OkType<R> = R extends Result<infer T, any> ? T : any;

export type ErrType<R> = R extends Result<any, infer E> ? E : any;

export interface ResultTrait<T, E> {
  /**
   * Returns `res` if `this` is `Ok`, otherwise returns `Err`.
   *
   * # Examples
   * ```ts
   * import { err, ok } from "perlica/Result";
   *
   * const a = ok(4);
   * const b = err("new error");
   * expect(a.and(b)).toEqual(err("new error"));
   *
   * const a = err("old error");
   * const b = ok(4);
   * expect(a.and(b)).toEqual(err("old error"));
   *
   * const a = err("old error");
   * const b = err("new error");
   * expect(a.and(b)).toEqual(err("old error"));
   *
   * const a = ok(4);
   * const b = ok(12);
   * expect(a.and(b)).toEqual(ok(12));
   * ```
   * See also the **[Result.and](https://doc.rust-lang.org/std/result/enum.Result.html#method.and)**
   */
  and<U, T, E>(this: Result<T, E>, res: Result<U, E>): Result<U, E>;

  /**
   * Returns `f` call if `this` is `Ok`, otherwise returns `Err`.
   *
   * # Examples
   * ```ts
   * import { err, ok } from "perlica/Result";
   *
   * const string_to_number = (num: string): Result<number, Error> => {
   *   const v = Number(num);
   *   return isNaN(v) ? err(Error("Not a Number")) : ok(v);
   * };
   *
   * expect(ok("4").andThen(string_to_number)).toEqual(ok(4));
   * expect(ok("hello").andThen(string_to_number)).toEqual(err(Error("Not a Number")));
   * expect(err(Error("old error")).andThen(string_to_number)).toEqual(err(Error("old error")));
   * ```
   * See also the **[Result.and_then](https://doc.rust-lang.org/std/result/enum.Result.html#method.and_then)**
   */
  andThen<U, T, E>(this: Result<T, E>, f: (v: T) => Result<U, E>): Result<U, E>;

  err<T, E>(this: Result<T, E>): Option<E>;

  /**
   * Returns the contained value `T` if `this` is `Ok`, otherwise throw exception `msg`.
   *
   * ```ts
   * import { err, ok } from "perlica/Result";
   *
   * const a = ok(4);
   * const b = err("error");
   *
   * expect(a.expect("my error message")).toEqual(4);
   * expect(() => b.expect("my error message")).toThrowError("my error message");
   * ```
   * See also the **[Result.expect](https://doc.rust-lang.org/std/result/enum.Result.html#method.expect)**
   */
  expect<T, E>(this: Result<T, E>, msg: string): T;

  /**
   * Returns the contained value `E` if `this` is `Err`, otherwise throw exception `msg`.
   *
   * ```ts
   * import { err, ok } from "perlica/Result";
   *
   * const a = ok(4);
   * const b = err("error");
   *
   * expect(() => a.expectErr("my error message")).toThrowError("my error message");
   * expect(b.expectErr("my error message")).toEqual("error");
   * ```
   * See also the **[Result.expect_err](https://doc.rust-lang.org/std/result/enum.Result.html#method.expect_err)**
   */
  expectErr<T, E>(this: Result<T, E>, msg: string): E;

  flatten<T, E>(this: Result<Result<T, E>, E>): Result<T, E>;

  inspect: <T, E>(this: Result<T, E>, f: (v: T) => void) => Result<T, E>;

  inspectErr<T, E>(this: Result<T, E>, f: (v: E) => void): Result<T, E>;

  isErr<T, E>(this: Result<T, E>): boolean;

  isErrAnd<T, E>(this: Result<T, E>, f: (v: E) => boolean): boolean;

  isOk<T, E>(this: Result<T, E>): boolean;

  isOkAnd<T, E>(this: Result<T, E>, f: (v: T) => boolean): boolean;

  map<U, T, E>(this: Result<T, E>, f: (v: T) => U): Result<U, E>;

  mapErr<U, T, E>(this: Result<T, E>, f: (v: E) => U): Result<T, U>;

  mapOr<U, T, E>(this: Result<T, E>, def: U, f: (v: T) => U): U;

  mapOrElse<U, T, E>(this: Result<T, E>, def: (v: E) => U, f: (v: T) => U): U;

  ok<T, E>(this: Result<T, E>): Option<T>;

  or<U, T, E>(this: Result<T, E>, f: (v: E) => U): Result<T, U>;

  orElse<U, T, E>(this: Result<T, E>, f: (v: E) => Result<T, U>): Result<T, U>;

  transpose<T, E>(this: Result<Option<T>, E>): Option<Result<T, E>>;

  /**
   * Returns the contained value `Ok`, otherwise throw `Error` exception.
   *
   * ```ts
   * import { err, ok } from "perlica/Result";
   *
   * expect(ok(4).unwrap()).toEqual(4);
   * expect(() => err("error").unwrap()).toThrowError(`called \`Result.unwrap()\` on an \`Err\` value: error`);
   * ```
   * See also the **[Result.unwrap](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap)**
   */
  unwrap<T, E>(this: Result<T, E>): T;

  /**
   * Returns the contained value `Err`, otherwise throw `Error` exception.
   *
   * ```ts
   * import { err, ok } from "perlica/Result";
   *
   * expect(() => ok(4).unwrapErr()).toThrowError(`called \`Result.unwrapErr()\` on an \`Ok\` value: 4`);
   * expect(err("error").unwrapErr()).toEqual("error");
   * ```
   * See also the **[Result.unwrap_err](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap_err)**
   */
  unwrapErr<T, E>(this: Result<T, E>): E;

  /**
   * Returns the contained value `Ok`, otherwise returns `def`.
   *
   * ```ts
   * import { err, ok } from "perlica/Result";
   *
   * expect(ok(4).unwrapOr(10)).toEqual(4);
   * expect(err("error").unwrapOr(10)).toEqual(10);
   * ```
   * See also the **[Result.unwrap_or](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap_or)**
   */
  unwrapOr<T, E>(this: Result<T, E>, def: T): T;

  /**
   * Returns the contained value `Ok`, otherwise `def` call.
   *
   * ```ts
   * import { err, ok } from "perlica/Result";
   *
   * const len = (s: string) => s.length;
   *
   * expect(ok(4).unwrapOrElse(len)).toEqual(4);
   * expect(err("error").unwrapOrElse(len)).toEqual(5);
   * ```
   * See also the **[Result.unwrap_or_else](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap_or_else)**
   */
  unwrapOrElse<T, E>(this: Result<T, E>, def: (v: E) => T): T;

  [Symbol.iterator](this: Result<T, E>): OnceIterator<Result<T, E>, T>;
}

/**
 * Returns `that` if `self` is `Ok`, otherwise returns `self`.
 *
 * ```ts
 * import * as R from "perlica/Result";
 *
 * const a = R.ok(4);
 * const b = R.err("new error");
 * expect(R.and(a, b)).toEqual(R.err("new error"));
 *
 * const a = R.err("old error");
 * const b = R.ok(4);
 * expect(R.and(a, b)).toEqual(R.err("old error"));
 *
 * const a = R.err("old error");
 * const b = R.err("new error");
 * expect(R.and(a, b)).toEqual(R.err("old error"));
 *
 * const a = R.ok(4);
 * const b = R.ok(12);
 * expect(R.and(a, b)).toEqual(R.ok(12));
 * ```
 * See also the **[Result.and](https://doc.rust-lang.org/std/result/enum.Result.html#method.and)**
 */
export const and = <U, T, E>(self: Result<T, E>, that: Result<U, E>): Result<U, E> =>
  self.and(that);

/**
 * Returns `f` call if `self` is `Ok`, otherwise returns `self`.
 *
 * ```ts
 * import * as R from "perlica/Result";
 *
 * const string_to_number = (num: string): R.Result<number, Error> => {
 *   const v = Number(num);
 *   return isNaN(v) ? R.err(Error("Not a Number")) : R.ok(v);
 * };
 *
 * expect(R.andThen(R.ok("4"), string_to_number)).toEqual(R.ok(4));
 * expect(R.andThen(R.ok("hello"), string_to_number)).toEqual(R.err(Error("Not a Number")));
 * expect(R.andThen(R.err(Error("old error")), string_to_number)).toEqual(R.err(Error("old error")));
 * ```
 * See also the **[Result.and_then](https://doc.rust-lang.org/std/result/enum.Result.html#method.and_then)**
 */
export const andThen = <U, T, E>(self: Result<T, E>, f: (v: T) => Result<U, E>): Result<U, E> =>
  self.andThen(f);

/**
 * Returns the contained value `T` if `self` is `Ok`, otherwise throw exception `msg`.
 *
 * ```ts
 * import * as R from "perlica/Result";
 *
 * expect(R.expect(R.ok(4), "my error message")).toEqual(4);
 * expect(() => R.expect(R.err("error"), "my error message")).toThrowError("my error message");
 * ```
 * See also the **[Result.expect](https://doc.rust-lang.org/std/result/enum.Result.html#method.expect)**
 */
export const expect = <T, E>(self: Result<T, E>, msg: string): T => self.expect(msg);

/**
 * Returns the contained value `E` if `self` is `Err`, otherwise throw exception `msg`.
 *
 * ```ts
 * import * as R from "perlica/Result";
 *
 * expect(() => R.expectErr(R.ok(4), "my error message")).toThrowError("my error message");
 * expect(R.expectErr(R.err("error"), "my error message")).toEqual("error");
 * ```
 * See also the **[Result.expect_err](https://doc.rust-lang.org/std/result/enum.Result.html#method.expect_err)**
 */
export const expectErr = <T, E>(self: Result<T, E>, msg: string): E => self.expectErr(msg);

export const isOk = <T, E>(r: Result<T, E>): r is Ok<T> => r.tag === "ok";

export const isErr = <T, E>(r: Result<T, E>): r is Err<E> => r.tag === "err";

/**
 * Returns the contained value `Ok`, otherwise throw `Error` exception.
 *
 * ```ts
 * import * as R from "perlica/Result";
 *
 * expect(R.unwrap(R.ok(4))).toEqual(4);
 * expect(() => R.unwrap(R.err("error"))).toThrowError(`called \`Result.unwrap()\` on an \`Err\` value: error`);
 * ```
 * See also the **[Result.unwrap](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap)**
 */
export const unwrap = <T, E>(self: Result<T, E>): T => self.unwrap();

/**
 * Returns the contained value `Err`, otherwise throw `Error` exception.
 *
 * ```ts
 * import * as R from "perlica/Result";
 *
 * expect(() => R.unwrapErr(R.ok(4))).toThrowError(`called \`Result.unwrapErr()\` on an \`Ok\` value: 4`);
 * expect(R.unwrapErr(R.err("error"))).toEqual("error");
 * ```
 * See also the **[Result.unwrap_err](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap_err)**
 */
export const unwrapErr = <T, E>(self: Result<T, E>): E => self.unwrapErr();

/**
 * Returns the contained value `Ok`, otherwise returns `def`.
 *
 * ```ts
 * import * as R from "perlica/Result";
 *
 * expect(R.unwrapOr(R.ok(4), 10)).toEqual(4);
 * expect(R.unwrapOr(R.err("error"), 10)).toEqual(10);
 * ```
 * See also the **[Result.unwrap_or](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap_or)**
 */
export const unwrapOr = <T, E>(self: Result<T, E>, def: T): T => self.unwrapOr(def);

/**
 * Returns the contained value `Ok`, otherwise `def` call.
 *
 * ```ts
 * import * as R from "perlica/Result";
 *
 * const len = (s: string) => s.length;
 *
 * expect(R.unwrapOrElse(R.ok(4), len)).toEqual(4);
 * expect(R.unwrapOrElse(R.err("error"), len)).toEqual(5);
 * ```
 * See also the **[Result.unwrap_or_else](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap_or_else)**
 */
export const unwrapOrElse = <T, E>(self: Result<T, E>, def: (v: E) => T): T =>
  self.unwrapOrElse(def);

export const fromNullable = <T, E>(self: T, f: () => E): Result<T, E> =>
  self == null ? err(f()) : ok(self);

export const fromOption = <T, E>(self: Option<T>, f: () => E): Result<T, E> => self.okOr(f());

export const tryCatch = <T, E>(f: () => T): Result<T, E> => {
  try {
    return ok(f());
  } catch (e) {
    return err(e as E);
  }
};

export const tryPromise = async <T, E>(v: Promise<T>): Promise<Result<T, E>> =>
  v.then(s => ok(s)).catch(f => err(f));

export const bind: Bind = fn => {
  const iter = fn();
  let result = iter.next();

  while (true) {
    if (result.done) {
      return ok(result.value);
    }

    if (isOk(result.value)) {
      result = iter.next(result.value.value);
    } else {
      return result.value;
    }
  }
};

export const ok = <T, E = never>(v: T): Result<T, E> => {
  const a = Object.create(ResultProto<T, E>());
  a.value = v;
  a.tag = "ok";
  return a;
};

export const err = <E, T = never>(v: E): Result<T, E> => {
  const a = Object.create(ResultProto<T, E>());
  a.value = v;
  a.tag = "err";
  return a;
};

export interface Ok<T> extends ResultTrait<T, never> {
  tag:   "ok";
  value: T;
}

export interface Err<E> extends ResultTrait<never, E> {
  tag:   "err";
  value: E;
}

export type Result<T, E> = Ok<T> | Err<E>;

export const ResultProto = <T, E>(): ResultTrait<T, E> => ({
  and<U, T, E>(this: Result<T, E>, res: Result<U, E>): Result<U, E> {
    return isOk(this) ? res : err(this.value);
  },

  andThen<T, E, U>(this: Result<T, E>, f: (v: T) => Result<U, E>): Result<U, E> {
    return isOk(this) ? f(this.value) : err(this.value);
  },

  err<T, E>(this: Result<T, E>): Option<E> {
    return isErr(this) ? some(this.value) : none();
  },

  expect<T, E>(this: Result<T, E>, msg: string): T {
    if (isOk(this)) {
      return this.value;
    } else {
      throw new Error(msg);
    }
  },

  expectErr<T, E>(this: Result<T, E>, msg: string): E {
    if (isErr(this)) {
      return this.value;
    } else {
      throw new Error(msg);
    }
  },

  flatten<T, E>(this: Result<Result<T, E>, E>): Result<T, E> {
    return this.andThen(v => v);
  },

  inspect<T, E>(this: Result<T, E>, f: (v: T) => void): Result<T, E> {
    if (isOk(this)) {
      f(this.value);
      return ok(this.value);
    } else {
      return err(this.value);
    }
  },

  inspectErr<T, E>(this: Result<T, E>, f: (v: E) => void): Result<T, E> {
    if (isErr(this)) {
      f(this.value);
      return err(this.value);
    } else {
      return ok(this.value);
    }
  },

  isErr<T, E>(this: Result<T, E>): boolean {
    return isErr(this);
  },

  isErrAnd<T, E>(this: Result<T, E>, f: (v: E) => boolean): boolean {
    return isErr(this) && f(this.value);
  },

  isOk<T, E>(this: Result<T, E>): boolean {
    return isOk(this);
  },

  isOkAnd<T, E>(this: Result<T, E>, f: (v: T) => boolean): boolean {
    return isOk(this) && f(this.value);
  },

  map<T, E, U>(this: Result<T, E>, f: (v: T) => U): Result<U, E> {
    return isOk(this) ? ok(f(this.value)) : err(this.value);
  },

  mapErr<T, E, U>(this: Result<T, E>, f: (v: E) => U): Result<T, U> {
    return isErr(this) ? err(f(this.value)) : ok(this.value);
  },

  mapOr<U, T, E>(this: Result<T, E>, def: U, f: (v: T) => U): U {
    return isOk(this) ? f(this.value) : def;
  },

  mapOrElse<U, T, E>(this: Result<T, E>, def: (v: E) => U, f: (v: T) => U): U {
    return isOk(this) ? f(this.value) : def(this.value);
  },

  ok<T, E>(this: Result<T, E>): Option<T> {
    return isOk(this) ? some(this.value) : none();
  },

  or<U, T, E>(this: Result<T, E>, f: (v: E) => U): Result<T, U> {
    return isErr(this) ? err(f(this.value)) : ok(this.value);
  },

  orElse<T, E, U>(this: Result<T, E>, f: (v: E) => Result<T, U>): Result<T, U> {
    return isErr(this) ? f(this.value) : ok(this.value);
  },

  transpose<T, E>(this: Result<Option<T>, E>): Option<Result<T, E>> {
    return isErr(this)
      ? some(err(this.value))
      : isNone(this.value)
        ? none()
        : some(ok(this.value.value));
  },

  unwrap<T, E>(this: Result<T, E>): T {
    if (isOk(this)) {
      return this.value;
    } else {
      throw new Error(`called \`Result.unwrap()\` on an \`Err\` value: ${String(this.value)}`);
    }
  },

  unwrapErr<T, E>(this: Result<T, E>): E {
    if (isErr(this)) {
      return this.value;
    } else {
      throw new Error(`called \`Result.unwrapErr()\` on an \`Ok\` value: ${String(this.value)}`);
    }
  },

  unwrapOr<T, E>(this: Result<T, E>, def: T): T {
    return isOk(this) ? this.value : def;
  },

  unwrapOrElse<T, E>(this: Result<T, E>, def: (v: E) => T): T {
    return isOk(this) ? this.value : def(this.value);
  },

  [Symbol.iterator]() {
    return new OnceIterator(this);
  },
});

interface Bind {
  <T extends Result<any, any>, R>(
    fn: () => Generator<T, R>,
  ): Result<
    R,
    T extends Err<infer E> ? E : never
  >;
}
