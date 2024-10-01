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
 *    | transpose            |                  |
 *    | unwrap               | unwrap           |
 *    | unwrap_err           | unwrapErr        |
 *    | unwrap_err_unchecked |                  |
 *    | unwrap_or            | unwrapOr         |
 *    | unwrap_or_default    |                  |
 *    | unwrap_or_else       | unwrapOrElse     |
 *    | unwrap_unchecked     |                  |
 *    |----------------------|------------------|
 *    |                      | andPromise       |
 *    |                      | andResult        |
 *    |                      | andThenResult    |
 *    |                      | andThenPromise   |
 *    |                      | orPromise        |
 *    |                      | orResult         |
 *    |                      | orElseResult     |
 *    |                      | orElsePromise    |
 *    |                      | sleep            |
 *    |----------------------|------------------|
 */
import type { Option }          from "./Option";
import { err, ok, type Result } from "./Result";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OkType<R> = R extends Future<infer T, any> ? T : any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ErrType<R> = R extends Future<any, infer E> ? E : any;

export interface FutureTrait {
  and<U, T, E>(this: Future<T, E>, v: Future<U, E>): Future<U, E>;

  andThen<U, T, E>(this: Future<T, E>, f: (v: T) => Future<U, E>): Future<U, E>;

  err<T, E>(this: Future<T, E>): Promise<Option<E>>;

  expect<T, E>(this: Future<T, E>, msg: string): Promise<T>;

  expectErr<T, E>(this: Future<T, E>, msg: string): Promise<E>;

  flatten<T, E>(this: Future<Future<T, E>, E>): Future<T, E>;

  inspect: <T, E>(this: Future<T, E>, f: (v: T) => void) => Future<T, E>;

  inspectErr: <T, E>(this: Future<T, E>, f: (v: E) => void) => Future<T, E>;

  isErr<T, E>(this: Future<T, E>): Promise<boolean>;

  isErrAnd<T, E>(this: Future<T, E>, f: (v: E) => boolean): Promise<boolean>;

  isOk<T, E>(this: Future<T, E>): Promise<boolean>;

  isOkAnd<T, E>(this: Future<T, E>, f: (v: T) => boolean): Promise<boolean>;

  map<U, T, E>(this: Future<T, E>, f: (v: T) => U): Future<U, E>;

  mapErr: <U, T, E>(this: Future<T, E>, f: (v: E) => U) => Future<T, U>;

  mapOr<U, T, E>(this: Future<T, E>, def: U, f: (v: T) => U): Promise<U>;

  mapOrElse<U, T, E>(this: Future<T, E>, def: (v: E) => U, f: (v: T) => U): Promise<U>;

  ok<T, E>(this: Future<T, E>): Promise<Option<T>>;

  or<U, T, E>(this: Future<T, E>, v: Future<T, U>): Future<T, U>;

  orElse<U, T, E>(this: Future<T, E>, f: (v: E) => Future<T, U>): Future<T, U>;

  unwrap<T, E>(this: Future<T, E>): Promise<T>;

  unwrapErr<T, E>(this: Future<T, E>): Promise<E>;

  unwrapOr<T, E>(this: Future<T, E>, def: T): Promise<T>;

  unwrapOrElse<T, E>(this: Future<T, E>, def: (v: E) => T): Promise<T>;

  andResult<U, T, E>(this: Future<T, E>, v: Result<U, E>): Future<U, E>;

  andPromise<U, T, E>(this: Future<T, E>, v: Promise<U>): Future<U, E>;

  andThenResult<U, T, E>(this: Future<T, E>, f: (v: T) => Result<U, E>): Future<U, E>;

  andThenPromise<U, T, E>(this: Future<T, E>, f: (v: T) => Promise<U>): Future<U, E>;

  orPromise<U, T, E>(this: Future<T, E>, v: Promise<T>): Future<T, U>;

  orResult<U, T, E>(this: Future<T, E>, v: Result<T, U>): Future<T, U>;

  orElseResult<U, T, E>(this: Future<T, E>, f: (v: E) => Result<T, U>): Future<T, U>;

  orElsePromise<U, T, E>(this: Future<T, E>, f: (v: E) => Promise<T>): Future<T, U>;

  sleep<T, E>(this: Future<T, E>, delay: number): Future<T, E>;
}

export interface Future<T, E> extends FutureTrait {
  tag:   "future";
  value: Promise<Result<T, E>>;
}

export const FutureProto = {
  and<U, T, E>(this: Future<T, E>, v: Future<U, E>): Future<U, E> {
    return future(this.value.then(res => res.andFuture(v).value));
  },

  andThen<U, T, E>(this: Future<T, E>, f: (v: T) => Future<U, E>): Future<U, E> {
    return future(this.value.then(res => res.andThenFuture(f).value));
  },

  async err<T, E>(this: Future<T, E>): Promise<Option<E>> {
    return this.value.then(res => res.err());
  },

  async expect<T, E>(this: Future<T, E>, msg: string): Promise<T> {
    return this.value.then(res => res.expect(msg));
  },

  async expectErr<T, E>(this: Future<T, E>, msg: string): Promise<E> {
    return this.value.then(res => res.expectErr(msg));
  },

  flatten<T, E>(this: Future<Future<T, E>, E>): Future<T, E> {
    return this.andThen(v => v);
  },

  inspect<T, E>(this: Future<T, E>, f: (v: T) => void): Future<T, E> {
    return future(this.value.then(res => res.inspect(f)));
  },

  inspectErr<T, E>(this: Future<T, E>, f: (v: E) => void): Future<T, E> {
    return future(this.value.then(res => res.inspectErr(f)));
  },

  async isErr<T, E>(this: Future<T, E>): Promise<boolean> {
    return this.value.then(res => res.isErr());
  },

  async isErrAnd<T, E>(this: Future<T, E>, f: (v: E) => boolean): Promise<boolean> {
    return this.value.then(res => res.isErrAnd(f));
  },

  async isOk<T, E>(this: Future<T, E>): Promise<boolean> {
    return this.value.then(res => res.isOk());
  },

  async isOkAnd<T, E>(this: Future<T, E>, f: (v: T) => boolean): Promise<boolean> {
    return this.value.then(res => res.isOkAnd(f));
  },

  map<U, T, E>(this: Future<T, E>, f: (v: T) => U): Future<U, E> {
    return future(this.value.then(res => res.map(f)));
  },

  mapErr<T, E, U>(this: Future<T, E>, f: (v: E) => U): Future<T, U> {
    return future(this.value.then(res => res.mapErr(f)));
  },

  async mapOr<U, T, E>(this: Future<T, E>, def: U, f: (v: T) => U): Promise<U> {
    return this.value.then(res => res.mapOr(def, f));
  },

  async mapOrElse<U, T, E>(this: Future<T, E>, def: (v: E) => U, f: (v: T) => U): Promise<U> {
    return this.value.then(res => res.mapOrElse(def, f));
  },

  async ok<T, E>(this: Future<T, E>): Promise<Option<T>> {
    return this.value.then(res => res.ok());
  },

  or<U, T, E>(this: Future<T, E>, v: Future<T, U>): Future<T, U> {
    return future(this.value.then(res => res.orFuture(v).value));
  },

  orElse<U, T, E>(this: Future<T, E>, f: (v: E) => Future<T, U>): Future<T, U> {
    return future(this.value.then(res => res.orElseFuture(f).value));
  },

  async unwrap<T, E>(this: Future<T, E>): Promise<T> {
    return this.value.then(res => res.unwrap());
  },

  async unwrapErr<T, E>(this: Future<T, E>): Promise<E> {
    return this.value.then(res => res.unwrapErr());
  },

  async unwrapOr<T, E>(this: Future<T, E>, def: T): Promise<T> {
    return this.value.then(res => res.unwrapOr(def));
  },

  async unwrapOrElse<T, E>(this: Future<T, E>, def: (v: E) => T): Promise<T> {
    return this.value.then(res => res.unwrapOrElse(def));
  },

  andPromise<U, T, E>(this: Future<T, E>, v: Promise<U>): Future<U, E> {
    return future(this.value.then(res => res.andPromise(v).value));
  },

  andResult<U, T, E>(this: Future<T, E>, v: Result<U, E>): Future<U, E> {
    return this.and(future(v));
  },

  andThenResult<U, T, E>(this: Future<T, E>, f: (v: T) => Result<U, E>): Future<U, E> {
    return this.andThen(v => future(f(v)));
  },

  andThenPromise<U, T, E>(this: Future<T, E>, f: (v: T) => Promise<U>): Future<U, E> {
    return future(this.value.then(res => res.andThenPromise(f).value));
  },

  orPromise<U, T, E>(this: Future<T, E>, v: Promise<T>): Future<T, U> {
    return future(this.value.then(res => res.orPromise<U, T, E>(v).value));
  },

  orResult<U, T, E>(this: Future<T, E>, v: Result<T, U>): Future<T, U> {
    return this.or(future(v));
  },

  orElseResult<U, T, E>(this: Future<T, E>, f: (v: E) => Result<T, U>): Future<T, U> {
    return this.orElse(e => future(f(e)));
  },

  orElsePromise<U, T, E>(this: Future<T, E>, f: (v: E) => Promise<T>): Future<T, U> {
    return future(this.value.then(res => res.orElsePromise<U, T, E>(f).value));
  },

  sleep<T, E>(this: Future<T, E>, delay: number): Future<T, E> {
    return future(new Promise(res => setTimeout(() => res(this.value), delay)));
  },
};

export const tryTask = <T, E>(f: () => Promise<T>): Future<T, E> => {
  return future(f().then(v => ok(v)).catch(r => err(r)));
};

export const tryPromise = <T, E>(v: Promise<T>): Future<T, E> => {
  return future(v.then(v => ok(v)).catch(r => err(r)));
};

export const future = <T = never, E = never>(
  v: Promise<Result<T, E>> | Result<T, E>,
): Future<T, E> => {
  const a = Object.create(FutureProto);
  a.value = Promise.resolve(v);
  a.tag = "future";
  return a;
};
