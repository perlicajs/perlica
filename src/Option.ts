/**
 *    |-----------------------|-------------------|
 *    | Rust methods          | Perlica           |
 *    |-----------------------|-------------------|
 *    | and                   | and               |
 *    | and_then              | andThen           |
 *    | as_deref              |                   |
 *    | as_deref_mut          |                   |
 *    | as_mut                |                   |
 *    | as_mut_slice          |                   |
 *    | as_pin_mut            |                   |
 *    | as_pin_ref            |                   |
 *    | as_ref                |                   |
 *    | as_slice              |                   |
 *    | cloned                |                   |
 *    | copied                |                   |
 *    | expect                | expect            |
 *    | filter                | filter            |
 *    | flatten               | flatten           |
 *    | get_or_insert         |                   |
 *    | get_or_insert_default |                   |
 *    | get_or_insert_with    |                   |
 *    | insert                |                   |
 *    | inspect               | inspect           |
 *    | is_none               | isNone            |
 *    | is_none_or            | isNoneOr          |
 *    | is_some               | isSome            |
 *    | is_some_and           | isSomeAnd         |
 *    | iter                  |                   |
 *    | iter_mut              |                   |
 *    | map                   | map               |
 *    | map_or                | mapOr             |
 *    | map_or_else           | mapOrElse         |
 *    | ok_or                 | okOr              |
 *    | ok_or_else            | okOrElse          |
 *    | or                    | or                |
 *    | or_else               | orElse            |
 *    | replace               |                   |
 *    | take                  |                   |
 *    | take_if               |                   |
 *    | transpose             | transpose         |
 *    | unwrap                | unwrap            |
 *    | unwrap_or             | unwrapOr          |
 *    | unwrap_or_default     |                   |
 *    | unwrap_or_else        | unwrapOrElse      |
 *    | unwrap_unchecked      |                   |
 *    | unzip                 |                   |
 *    | xor                   | xor               |
 *    | zip                   |                   |
 *    | zip_with              |                   |
 *    |-----------------------|-------------------|
 *
 */
import { err, isErr, ok, type Result } from "./Result";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SomeType<R> = R extends Option<infer T> ? T : any;

export interface OptionTrait {
  and<U, T>(this: Option<T>, v: Option<U>): Option<U>;

  andThen<U, T>(this: Option<T>, f: (v: T) => Option<U>): Option<U>;

  expect<T>(this: Option<T>, msg: string): T;

  filter<T>(this: Option<T>, f: (v: T) => boolean): Option<T>;

  flatten<T>(this: Option<Option<T>>): Option<T>;

  inspect<T>(this: Option<T>, f: (v: T) => void): Option<T>;

  isNone<T>(this: Option<T>): boolean;

  isNoneOr<T>(this: Option<T>, f: (v: T) => boolean): boolean;

  isSome<T>(this: Option<T>): boolean;

  isSomeAnd<T>(this: Option<T>, f: (v: T) => boolean): boolean;

  map<U, T>(this: Option<T>, f: (v: T) => U): Option<U>;

  mapOr<U, T>(this: Option<T>, def: U, f: (v: T) => U): U;

  mapOrElse<U, T>(this: Option<T>, d: () => U, f: (v: T) => U): U;

  okOr<T, E>(this: Option<T>, v: E): Result<T, E>;

  okOrElse<T, E>(this: Option<T>, f: () => E): Result<T, E>;

  or<T>(this: Option<T>, v: Option<T>): Option<T>;

  orElse<T>(this: Option<T>, f: () => Option<T>): Option<T>;

  transpose<T, E>(this: Option<Result<T, E>>): Result<Option<T>, E>;

  unwrap: <T>(this: Option<T>) => T;

  unwrapOr<T>(this: Option<T>, def: T): T;

  unwrapOrElse<T>(this: Option<T>, def: () => T): T;

  xor<T>(this: Option<T>, v: Option<T>): Option<T>;
}

export const isSome = <T>(r: Option<T>): r is Some<T> => r.tag === "some";

export const isNone = <T>(r: Option<T>): r is None => r.tag === "none";

export interface Some<T> extends OptionTrait {
  value: T;
  tag:   "some";
}

export interface None extends OptionTrait {
  tag: "none";
}

export type Option<T> = Some<T> | None;

export const OptionProto = {
  and<U, T>(this: Option<T>, v: Option<U>): Option<U> {
    return isSome(this) ? v : none;
  },

  andThen<T, U>(this: Option<T>, f: (v: T) => Option<U>): Option<U> {
    return isSome(this) ? f(this.value) : none;
  },

  expect<T>(this: Option<T>, msg: string): T {
    if (isSome(this)) {
      return this.value;
    } else {
      throw new Error(msg);
    }
  },

  filter<T>(this: Option<T>, f: (v: T) => boolean): Option<T> {
    return isNone(this)
      ? none
      : f(this.value) ? this : none;
  },

  flatten<T>(this: Option<Option<T>>): Option<T> {
    return isSome(this) ? this.value : none;
  },

  inspect<T>(this: Option<T>, f: (v: T) => void): Option<T> {
    if (isSome(this)) {
      f(this.value);
      return some(this.value);
    } else {
      return none;
    }
  },

  isNone<T>(this: Option<T>): boolean {
    return isNone(this);
  },

  isNoneOr<T>(this: Option<T>, f: (v: T) => boolean): boolean {
    return isNone(this) || f(this.value);
  },

  isSome<T>(this: Option<T>): boolean {
    return isSome(this);
  },

  isSomeAnd<T>(this: Option<T>, f: (v: T) => boolean): boolean {
    return isNone(this) ? false : f(this.value);
  },

  map<T, U>(this: Option<T>, f: (v: T) => U): Option<U> {
    return isSome(this) ? some(f(this.value)) : none;
  },

  mapOr<U, T>(this: Option<T>, def: U, f: (v: T) => U): U {
    return isSome(this) ? f(this.value) : def;
  },

  mapOrElse<U, T>(this: Option<T>, d: () => U, f: (v: T) => U): U {
    return isSome(this) ? f(this.value) : d();
  },

  okOr<T, E>(this: Option<T>, v: E): Result<T, E> {
    return isSome(this) ? ok(this.value) : err(v);
  },

  okOrElse<T, E>(this: Option<T>, f: () => E): Result<T, E> {
    return isSome(this) ? ok(this.value) : err(f());
  },

  or<T>(this: Option<T>, v: Option<T>): Option<T> {
    return isSome(this) ? this : v;
  },

  orElse<T>(this: Option<T>, f: () => Option<T>): Option<T> {
    return isSome(this) ? this : f();
  },

  transpose<T, E>(this: Option<Result<T, E>>): Result<Option<T>, E> {
    return isNone(this)
      ? ok(none)
      : isErr(this.value)
        ? err(this.value.value)
        : ok(some(this.value.value));
  },

  unwrap<T>(this: Option<T>): T {
    if (isSome(this)) {
      return this.value;
    } else {
      throw new Error("called `Option.unwrap()` on a `None` value");
    }
  },

  unwrapOr<T>(this: Option<T>, def: T): T {
    return isSome(this) ?  this.value : def;
  },

  unwrapOrElse<T>(this: Option<T>, def: () => T): T {
    return isSome(this) ?  this.value : def();
  },

  xor<T>(this: Option<T>, v: Option<T>): Option<T> {
    return isSome(this) && isSome(v)
      ? this
      : isNone(this) && isSome(v)
        ? v
        : none;
  },
};

export const fromNullable = <T>(v: T): Option<NonNullable<T>> =>
  v == null ? none : some(v as NonNullable<T>);

export const fromResult = <T, E>(v: Result<T, E>): Option<T> => v.ok();

export const tryCatch = <T>(f: () => T): Option<T> => {
  try {
    return some(f());
  } catch (_) {
    return none;
  }
};

export const some = <T = never>(v: T): Option<T> => {
  const a = Object.create(OptionProto);
  a.value = v;
  a.tag = "some";
  return a;
};

export const none: None = (() => {
  const a = Object.create(OptionProto);
  a.tag = "none";
  return a;
})();

Object.freeze(none);
