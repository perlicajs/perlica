import { none, some, type Option } from "../Option";
import { err, ok, type Result }    from "../Result";
import type { Task }               from "./Task";
import { createTask }              from "./Task";

/**
 *    |-----------------------|-------------------|
 *    | Rust methods          | Perlica           |
 *    |-----------------------|-------------------|
 *    | and                   | and               |
 *    | and_then              | flatMap           |
 *    | expect                | expect            |
 *    | filter                | filter            |
 *    | flatten               | flatten           |
 *    | inspect               | inspect           |
 *    | map                   | map               |
 *    | map_or                | mapOr             |
 *    | map_or_else           | mapOrElse         |
 *    | ok_or                 | okOr              |
 *    | ok_or_else            | okOrElse          |
 *    | or                    | or                |
 *    | or_else               | orElse            |
 *    | unwrap                | unwrap            |
 *    | unwrap_or             | unwrapOr          |
 *    | unwrap_or_else        | unwrapOrElse      |
 *    |                       | toResult          |
 *    |                       | of                |
 *    |                       | safeRun           |
 *    |-----------------------|-------------------|
 */

export const of = <T>(value: T): Task<T> => createTask(async () => value);

export const map = <A, B>(f: (a: A) => B) => (task: Task<A>): Task<B> => {
  return createTask(async () => {
    const a = await task.unsafeRun();
    return f(a);
  });
};

export const flatMap = <A, B>(f: (a: A) => Task<B>) => (task: Task<A>): Task<B> => {
  return createTask(async () => {
    const a = await task.unsafeRun();
    const b = f(a);
    return await b.unsafeRun();
  });
};

export const flatten = <T>(task: Task<Task<T>>): Task<T> => {
  return createTask(async () => {
    const inner = await task.unsafeRun();
    return await inner.unsafeRun();
  });
};

export const okOr = <E>(error: E) => <T>(task: Task<T>): Task<Result<T, E>> => {
  return createTask(async () => {
    try {
      const v = await task.unsafeRun();
      return ok(v);
    } catch {
      return err(error);
    }
  });
};

export const okOrElse = <E>(f: () => E) => <T>(task: Task<T>): Task<Result<T, E>> => {
  return createTask(async () => {
    try {
      const v = await task.unsafeRun();
      return ok(v);
    } catch {
      return err(f());
    }
  });
};

export const and = <B>(that: Task<B>) => <A>(task: Task<A>): Task<B> => {
  return createTask(async () => {
    await task.unsafeRun();
    return await that.unsafeRun();
  });
};

export const expect = (msg: string) => <T>(task: Task<T>): Task<T> => {
  return createTask(async () => {
    const v = await task.unsafeRun();
    if (v === null || v === undefined) {
      throw new Error(msg);
    }
    return v;
  });
};

export const filter = <T>(f: (v: T) => boolean) => (task: Task<T>): Task<Option<T>> => {
  return createTask(async () => {
    const v = await task.unsafeRun();
    return f(v) ? some(v) : none();
  });
};

export const inspect = <T>(f: (v: T) => void) => (task: Task<T>): Task<T> => {
  return createTask(async () => {
    const v = await task.unsafeRun();
    f(v);
    return v;
  });
};

export const mapOr = <A, B>(def: B, f: (a: A) => B) => (task: Task<A>): Task<B> => {
  return createTask(async () => {
    try {
      const a = await task.unsafeRun();
      return f(a);
    } catch {
      return def;
    }
  });
};

export const mapOrElse = <A, B>(d: () => B, f: (a: A) => B) => (task: Task<A>): Task<B> => {
  return createTask(async () => {
    try {
      const a = await task.unsafeRun();
      return f(a);
    } catch {
      return d();
    }
  });
};

export const or = <A>(that: Task<A>) => (task: Task<A>): Task<A> => {
  return createTask(async () => {
    try {
      return await task.unsafeRun();
    } catch {
      return await that.unsafeRun();
    }
  });
};

export const orElse = <A>(f: () => Task<A>) => (task: Task<A>): Task<A> => {
  return createTask(async () => {
    try {
      return await task.unsafeRun();
    } catch {
      return await f().unsafeRun();
    }
  });
};

export const unwrap = <T>(task: Task<T>): Task<T> => {
  return createTask(async () => {
    const v = await task.unsafeRun();
    if (v === null || v === undefined) {
      throw new Error(`called \`Task.unwrap()\` on a null value`);
    }
    return v;
  });
};

export const unwrapOr = <A>(def: A) => (task: Task<A>): Task<A> => {
  return createTask(async () => {
    try {
      const a = await task.unsafeRun();
      return a;
    } catch {
      return def;
    }
  });
};

export const unwrapOrElse = <A>(f: () => A) => (task: Task<A>): Task<A> => {
  return createTask(async () => {
    try {
      const a = await task.unsafeRun();
      return a;
    } catch {
      return f();
    }
  });
};

export const toResult = <T>(task: Task<T>): Task<Result<T, unknown>> => {
  return createTask(async () => {
    try {
      const v = await task.unsafeRun();
      return ok(v);
    } catch (e) {
      return err(e);
    }
  });
};

export const safeRun = async <T>(task: Task<T>): Promise<Result<T, unknown>> => {
  try {
    const v = await task.unsafeRun();
    return ok(v);
  } catch (e) {
    return err(e);
  }
};

export const bind = <T extends Task<any>, R>(fn: () => Generator<T, R>): Task<R> => {
  return createTask(async () => {
    const iter = fn();
    let result = iter.next();

    while (true) {
      if (result.done) {
        return result.value;
      }
      result = await result.value
        .map(t => iter.next(t))
        .unsafeRun();
    }
  });
};
