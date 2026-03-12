import type { Option }  from "~/Option";
import type {  Result } from "../Result";
import {
  and,
  andThen,
  expect,
  filter,
  flatMap,
  inspect,
  map,
  mapOr,
  mapOrElse,
  okOr,
  okOrElse,
  or,
  orElse,
  safeRun,
  unwrap,
  unwrapOr,
  unwrapOrElse,
} from "./functions";
import { OnceIterator } from "~/Iterator";

export class Task<T> {
  readonly type = "Task" as const;

  constructor(private readonly f: () => Promise<T>) {}

  unsafeRun(): Promise<T> {
    return this.f();
  }

  map<B>(f: (a: T) => B): Task<B> {
    return map(f)(this);
  }

  andThen<B>(f: (a: T) => Task<B>): Task<B> {
    return andThen(f)(this);
  }

  flatMap<B>(f: (a: T) => Task<B>): Task<B> {
    return flatMap(f)(this);
  }

  filter(predicate: (arg: T) => boolean): Task<Option<T>> {
    return filter(predicate)(this);
  }

  and<B>(that: Task<B>): Task<B> {
    return and(that)(this);
  }

  expect(msg: string): Task<T> {
    return expect(msg)(this);
  }

  inspect(f: (v: T) => void): Task<T> {
    return inspect(f)(this);
  }

  mapOr<B>(def: B, f: (a: T) => B): Task<B> {
    return mapOr(def, f)(this);
  }

  mapOrElse<B>(d: () => B, f: (a: T) => B): Task<B> {
    return mapOrElse(d, f)(this);
  }

  okOr<E>(error: E): Task<Result<T, E>> {
    return okOr(error)(this);
  }

  okOrElse<E>(f: () => E): Task<Result<T, E>> {
    return okOrElse(f)(this);
  }

  or(that: Task<T>): Task<T> {
    return or(that)(this);
  }

  orElse(f: () => Task<T>): Task<T> {
    return orElse(f)(this);
  }

  unwrap(): Task<T> {
    return unwrap(this);
  }

  unwrapOr(def: T): Task<T> {
    return unwrapOr(def)(this);
  }

  unwrapOrElse(f: () => T): Task<T> {
    return unwrapOrElse(f)(this);
  }

  safeRun(): Promise<Result<T, unknown>> {
    return safeRun(this);
  }

  [Symbol.iterator](): OnceIterator<Task<T>, T> {
    return new OnceIterator(this);
  }
}

export const createTask = <T>(f: () => Promise<T>): Task<T> => {
  return new Task(f);
};
