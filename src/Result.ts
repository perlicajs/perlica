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
 *    |                      | andPromise       |
 *    |                      | andFuture        |
 *    |                      | andThenFuture    |
 *    |                      | andThenPromise   |
 *    |                      | orPromise        |
 *    |                      | orFuture         |
 *    |                      | orElseFuture     |
 *    |                      | orElsePromise    |
 *    |----------------------|------------------|
 */

import { future, tryPromise, type Future } from "./Future";
import { isNone, none, some, type Option } from "./Option";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OkType<R> = R extends Result<infer T, any> ? T : any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ErrType<R> = R extends Result<any, infer E> ? E : any;

export interface ResultTrait {
  and<U, T, E>(this: Result<T, E>, f: (v: T) => U): Result<U, E>;

  andThen<U, T, E>(this: Result<T, E>, f: (v: T) => Result<U, E>): Result<U, E>;

  err<T, E>(this: Result<T, E>): Option<E>;

  expect<T, E>(this: Result<T, E>, msg: string): T;

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

  unwrap<T, E>(this: Result<T, E>): T;

  unwrapErr<T, E>(this: Result<T, E>): E;

  unwrapOr<T, E>(this: Result<T, E>, def: T): T;

  unwrapOrElse<T, E>(this: Result<T, E>, def: (v: E) => T): T;

  andPromise<T, E, U>(this: Result<T, E>, v: Promise<U>): Future<U, E>;

  andFuture<T, E, U>(this: Result<T, E>, v: Future<U, E>): Future<U, E>;

  andThenFuture<T, E, U>(this: Result<T, E>, f: (v: T) => Future<U, E>): Future<U, E>;

  andThenPromise<T, E, U>(this: Result<T, E>, f: (v: T) => Promise<U>): Future<U, E>;

  orPromise<U, T, E>(this: Result<T, E>, v: Promise<T>): Future<T, U>;

  orFuture<U, T, E>(this: Result<T, E>, v: Future<T, U>): Future<T, U>;

  orElseFuture<U, T, E>(this: Result<T, E>, f: (v: E) => Future<T, U>): Future<T, U>;

  orElsePromise<U, T, E>(this: Result<T, E>, f: (v: E) => Promise<T>): Future<T, U>;
}

export const isOk = <T, E>(r: Result<T, E>): r is Ok<T> => r.tag === "ok";

export const isErr = <T, E>(r: Result<T, E>): r is Err<E> => r.tag === "err";

export interface Ok<T> extends ResultTrait {
  tag:   "ok";
  value: T;
}

export interface Err<E> extends ResultTrait {
  tag:   "err";
  value: E;
}

export type Result<T, E> = Ok<T> | Err<E>;

export const ResultProto = {
  and<U, T, E>(this: Result<T, E>, f: (v: T) => U): Result<U, E> {
    return isOk(this) ? ok(f(this.value)) : err(this.value);
  },

  andThen<T, E, U>(this: Result<T, E>, f: (v: T) => Result<U, E>): Result<U, E> {
    return isOk(this) ? f(this.value) : err(this.value);
  },

  err<T, E>(this: Result<T, E>): Option<E> {
    return isErr(this) ? some(this.value) : none;
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
    return isOk(this) ? some(this.value) : none;
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
        ? none
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
      throw new Error(`called \`Result.unwrap()\` on an \`Ok\` value: ${String(this.value)}`);
    }
  },

  unwrapOr<T, E>(this: Result<T, E>, def: T): T {
    if (isOk(this)) {
      return this.value;
    } else {
      return def;
    }
  },

  unwrapOrElse<T, E>(this: Result<T, E>, def: (v: E) => T): T {
    if (isOk(this)) {
      return this.value;
    } else {
      return def(this.value);
    }
  },

  andPromise<T, E, U>(this: Result<T, E>, v: Promise<U>): Future<U, E> {
    return isOk(this) ? tryPromise(v) : future<U, E>(this);
  },

  andFuture<T, E, U>(this: Result<T, E>, v: Future<U, E>): Future<U, E> {
    return isOk(this) ? v : future<U, E>(this);
  },

  andThenPromise<T, E, U>(this: Result<T, E>, f: (v: T) => Promise<U>): Future<U, E> {
    return isOk(this) ? tryPromise(f(this.value)) : future<U, E>(this);
  },

  andThenFuture<T, E, U>(this: Result<T, E>, f: (v: T) => Future<U, E>): Future<U, E> {
    return isOk(this) ? f(this.value) : future<U, E>(this);
  },

  orPromise<U, T, E>(this: Result<T, E>, v: Promise<T>): Future<T, U> {
    return isErr(this) ? tryPromise(v) : future<T, U>(this);
  },

  orFuture<U, T, E>(this: Result<T, E>, v: Future<T, U>): Future<T, U> {
    return isErr(this) ? v : future<T, U>(this);
  },

  orElseFuture<U, T, E>(this: Result<T, E>, f: (v: E) => Future<T, U>): Future<T, U> {
    return isErr(this) ? f(this.value) : future<T, U>(this);
  },

  orElsePromise<U, T, E>(this: Result<T, E>, f: (v: E) => Promise<T>): Future<T, U> {
    return isErr(this) ? tryPromise(f(this.value)) : future<T, U>(this);
  },
} satisfies ResultTrait;

export const fromNullable = <T, E>(v: T, f: () => E): Result<T, E> => v == null ? err(f()) : ok(v);

export const fromOption = <T, E>(v: Option<T>, f: () => E): Result<T, E> => v.okOr(f());

export const tryCatch = <T, E>(f: () => T): Result<T, E> => {
  try {
    return ok(f());
  } catch (e) {
    return err(e as E);
  }
};

export const ok = <T = never, E = never>(v: T): Result<T, E> => {
  const a = Object.create(ResultProto);
  a.value = v;
  a.tag = "ok";
  return a;
};

export const err = <T = never, E = never>(v: E): Result<T, E> => {
  const a = Object.create(ResultProto);
  a.value = v;
  a.tag = "err";
  return a;
};
