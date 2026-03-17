import { describe, it, expect } from "bun:test";

import {
  Task,
  createTask,
  of,
  flatten,
  and,
  expect as expectTask,
  mapOr,
  mapOrElse,
  okOr,
  okOrElse,
  or,
  orElse,
  unwrap,
  unwrapOr,
  unwrapOrElse,
  toResult,
  safeRun,
  bind,
} from "~/Task";
import { some, none, type Option } from "~/Option";
import { ok, err, type Result }    from "~/Result";

import type { Assert } from "./Helpers";

describe("task", () => {
  const taskOk = createTask(async () => 4);
  const taskErr = createTask(async () => {
    throw new Error("task error");
    return 2;
  });

  describe("constructor", () => {
    it("creates a Task", async () => {
      const task = new Task(() => Promise.resolve(42));
      const result = await task.unsafeRun();
      expect(result).toEqual(42);

      type _t = Assert<Task<number>, typeof task>;
    });
  });

  describe("createTask", () => {
    it("creates a Task from a function", async () => {
      const task = createTask(() => Promise.resolve(42));
      const result = await task.unsafeRun();
      expect(result).toEqual(42);

      type _t = Assert<Task<number>, typeof task>;
    });
  });

  describe("of", () => {
    it("creates a Task from a value", async () => {
      const task = of(42);
      const result = await task.unsafeRun();
      expect(result).toEqual(42);

      type _t = Assert<Task<number>, typeof task>;
    });
  });

  describe("map", () => {
    it("maps a value", async () => {
      {
        const a = of(4).map(x => x + 1);
        const result = await a.unsafeRun();
        expect(result).toEqual(5);

        type _a = Assert<Task<number>, typeof a>;
      }
      {
        const a = taskOk.map(x => x + 1);
        const result = await a.unsafeRun();
        expect(result).toEqual(5);

        type _a = Assert<Task<number>, typeof a>;
      }
    });

    it("maps to a different type", async () => {
      const a = of(4).map(x => `value: ${x}`);
      const result = await a.unsafeRun();
      expect(result).toEqual("value: 4");

      type _a = Assert<Task<string>, typeof a>;
    });
  });

  describe("flatMap", () => {
    it("flatMaps a Task", async () => {
      {
        const a = of(4).flatMap(x => of(x + 1));
        const result = await a.unsafeRun();
        expect(result).toEqual(5);

        type _a = Assert<Task<number>, typeof a>;
      }
      {
        const a = taskOk.flatMap(x => of(x + 1));
        const result = await a.unsafeRun();
        expect(result).toEqual(5);

        type _a = Assert<Task<number>, typeof a>;
      }
    });

    it("flatMaps to a different type", async () => {
      const a = of(4).flatMap(x => of(`value: ${x}`));
      const result = await a.unsafeRun();
      expect(result).toEqual("value: 4");

      type _a = Assert<Task<string>, typeof a>;
    });
  });

  describe("flatten", () => {
    it("flattens using function", async () => {
      const nested = createTask(async () => createTask(async () => 42));
      const a = flatten(nested);
      const result = await a.unsafeRun();
      expect(result).toEqual(42);

      type _a = Assert<Task<number>, typeof a>;
    });
  });

  describe("filter", () => {
    it("filters value with predicate", async () => {
      {
        const a = of(4).filter(x => x > 2);
        const result = await a.unsafeRun();
        expect(result).toEqual(some(4));

        type _a = Assert<Task<Option<number>>, typeof a>;
      }
      {
        const a = of(4).filter(x => x > 10);
        const result = await a.unsafeRun();
        expect(result).toEqual(none());

        type _a = Assert<Task<Option<number>>, typeof a>;
      }
    });

    it("filters using function", async () => {
      const a = taskOk.filter(x => x > 2);
      const result = await a.unsafeRun();
      expect(result).toEqual(some(4));

      type _a = Assert<Task<Option<number>>, typeof a>;
    });
  });

  describe("and", () => {
    it("returns second Task if first succeeds", async () => {
      {
        const a = of(4).and(of(12));
        const result = await a.unsafeRun();
        expect(result).toEqual(12);

        type _a = Assert<Task<number>, typeof a>;
      }
      {
        const a = and(of(12))(taskOk);
        const result = await a.unsafeRun();
        expect(result).toEqual(12);

        type _a = Assert<Task<number>, typeof a>;
      }
    });

    it("propagates error from first Task", async () => {
      const a = taskErr.and(of(12));
      try {
        await a.unsafeRun();
        expect.unreachable("should have thrown");
      } catch (e) {
        expect(e).toBeDefined();
      }
    });
  });

  describe("expect", () => {
    it("throws on null", async () => {
      {
        const a = of(4).expect("value is null");
        const result = await a.unsafeRun();
        expect(result).toEqual(4);

        type _a = Assert<Task<number>, typeof a>;
      }
      {
        const a = expectTask("value is null")(createTask(async () => null));
        try {
          await a.unsafeRun();
          expect.unreachable("should have thrown");
        } catch (e) {
          expect((e as Error).message).toEqual("value is null");
        }

        type _a = Assert<Task<null>, typeof a>;
      }
    });

    it("throws on undefined", async () => {
      const a = expectTask("value is undefined")(createTask(async () => undefined));
      try {
        await a.unsafeRun();
        expect.unreachable("should have thrown");
      } catch (e) {
        expect((e as Error).message).toEqual("value is undefined");
      }
    });
  });

  describe("inspect", () => {
    it("inspects value without modifying it", async () => {
      let inspected: number | undefined;
      {
        const a = of(4).inspect(x => {
          inspected = x;
        });
        const result = await a.unsafeRun();
        expect(result).toEqual(4);
        expect(inspected).toEqual(4);

        type _a = Assert<Task<number>, typeof a>;
      }
      {
        inspected = undefined;
        const a = taskOk.inspect(x => {
          inspected = x;
        });
        const result = await a.unsafeRun();
        expect(result).toEqual(4);
        expect(inspected!).toEqual(4);

        type _a = Assert<Task<number>, typeof a>;
      }
    });
  });

  describe("mapOr", () => {
    it("maps value or returns default", async () => {
      {
        const a = of(4).mapOr(10, x => x + 1);
        const result = await a.unsafeRun();
        expect(result).toEqual(5);

        type _a = Assert<Task<number>, typeof a>;
      }
      {
        const a = taskOk.mapOr(10, x => x + 1);
        const result = await a.unsafeRun();
        expect(result).toEqual(5);

        type _a = Assert<Task<number>, typeof a>;
      }
    });

    it("returns default on error", async () => {
      const a = mapOr(10, _x => 5)(taskErr);
      const result = await a.unsafeRun();
      expect(result).toEqual(10);
    });
  });

  describe("mapOrElse", () => {
    it("maps value or returns default from function", async () => {
      {
        const a = of(4).mapOrElse(() => 10, x => x + 1);
        const result = await a.unsafeRun();
        expect(result).toEqual(5);

        type _a = Assert<Task<number>, typeof a>;
      }
      {
        const a = taskOk.mapOrElse(() => 10, x => x + 1);
        const result = await a.unsafeRun();
        expect(result).toEqual(5);

        type _a = Assert<Task<number>, typeof a>;
      }
    });

    it("returns default from function on error", async () => {
      const a = mapOrElse(() => 100, _x => 5)(taskErr);
      const result = await a.unsafeRun();
      expect(result).toEqual(100);
    });
  });

  describe("okOr", () => {
    it("converts to Result with ok", async () => {
      {
        const a = of(4).okOr("error");
        const result = await a.unsafeRun();
        expect(result).toEqual(ok(4));

        type _a = Assert<Task<Result<number, string>>, typeof a>;
      }
      {
        const a = okOr("error")(taskOk);
        const result = await a.unsafeRun();
        expect(result).toEqual(ok(4));

        type _a = Assert<Task<Result<number, string>>, typeof a>;
      }
    });

    it("converts to Result with err on error", async () => {
      const a = okOr("custom error")(taskErr);
      const result = await a.unsafeRun();
      expect(result).toEqual(err("custom error"));
    });
  });

  describe("okOrElse", () => {
    it("converts to Result with ok", async () => {
      {
        const a = of(4).okOrElse(() => "error");
        const result = await a.unsafeRun();
        expect(result).toEqual(ok(4));

        type _a = Assert<Task<Result<number, string>>, typeof a>;
      }
      {
        const a = okOrElse(() => "error")(taskOk);
        const result = await a.unsafeRun();
        expect(result).toEqual(ok(4));

        type _a = Assert<Task<Result<number, string>>, typeof a>;
      }
    });

    it("converts to Result with err from function on error", async () => {
      const a = okOrElse(() => "computed error")(taskErr);
      const result = await a.unsafeRun();
      expect(result).toEqual(err("computed error"));
    });
  });

  describe("or", () => {
    it("returns first Task if it succeeds", async () => {
      {
        const a = of(4).or(of(12));
        const result = await a.unsafeRun();
        expect(result).toEqual(4);

        type _a = Assert<Task<number>, typeof a>;
      }
      {
        const a = or(of(12))(taskOk);
        const result = await a.unsafeRun();
        expect(result).toEqual(4);

        type _a = Assert<Task<number>, typeof a>;
      }
    });

    it("returns second Task if first fails", async () => {
      const a = taskErr.or(of(12));
      const result = await a.unsafeRun();
      expect(result).toEqual(12);
    });
  });

  describe("orElse", () => {
    it("returns first Task if it succeeds", async () => {
      {
        const a = of(4).orElse(() => of(12));
        const result = await a.unsafeRun();
        expect(result).toEqual(4);

        type _a = Assert<Task<number>, typeof a>;
      }
      {
        const a = orElse(() => of(12))(taskOk);
        const result = await a.unsafeRun();
        expect(result).toEqual(4);

        type _a = Assert<Task<number>, typeof a>;
      }
    });

    it("returns fallback Task if first fails", async () => {
      const a = orElse(() => of(12))(taskErr);
      const result = await a.unsafeRun();
      expect(result).toEqual(12);
    });
  });

  describe("unwrap", () => {
    it("unwraps non-null value", async () => {
      {
        const a = of(4).unwrap();
        const result = await a.unsafeRun();
        expect(result).toEqual(4);

        type _a = Assert<Task<number>, typeof a>;
      }
      {
        const a = unwrap(taskOk);
        const result = await a.unsafeRun();
        expect(result).toEqual(4);

        type _a = Assert<Task<number>, typeof a>;
      }
    });

    it("throws on null", async () => {
      const a = unwrap(createTask(async () => null));
      try {
        await a.unsafeRun();
        expect.unreachable("should have thrown");
      } catch (e) {
        expect((e as Error).message).toEqual("called `Task.unwrap()` on a null value");
      }
    });

    it("throws on undefined", async () => {
      const a = unwrap(createTask(async () => undefined));
      try {
        await a.unsafeRun();
        expect.unreachable("should have thrown");
      } catch (e) {
        expect((e as Error).message).toEqual("called `Task.unwrap()` on a null value");
      }
    });
  });

  describe("unwrapOr", () => {
    it("unwraps value", async () => {
      {
        const a = of(4).unwrapOr(10);
        const result = await a.unsafeRun();
        expect(result).toEqual(4);

        type _a = Assert<Task<number>, typeof a>;
      }
      {
        const a = unwrapOr(10)(taskOk);
        const result = await a.unsafeRun();
        expect(result).toEqual(4);

        type _a = Assert<Task<number>, typeof a>;
      }
    });

    it("returns default on error", async () => {
      const a = unwrapOr(10)(taskErr);
      const result = await a.unsafeRun();
      expect(result).toEqual(10);
    });
  });

  describe("unwrapOrElse", () => {
    it("unwraps value", async () => {
      {
        const a = of(4).unwrapOrElse(() => 10);
        const result = await a.unsafeRun();
        expect(result).toEqual(4);

        type _a = Assert<Task<number>, typeof a>;
      }
      {
        const a = unwrapOrElse(() => 10)(taskOk);
        const result = await a.unsafeRun();
        expect(result).toEqual(4);

        type _a = Assert<Task<number>, typeof a>;
      }
    });

    it("returns default from function on error", async () => {
      const a = unwrapOrElse(() => 100)(taskErr);
      const result = await a.unsafeRun();
      expect(result).toEqual(100);
    });
  });

  describe("toResult", () => {
    it("converts successful Task to Result", async () => {
      const a = toResult(taskOk);
      const result = await a.unsafeRun();
      expect(result).toEqual(ok(4));

      type _a = Assert<Task<Result<number, unknown>>, typeof a>;
    });

    it("converts failed Task to Result with error", async () => {
      const a = toResult(taskErr);
      const result = await a.unsafeRun();
      expect(result).toEqual(err(new Error("task error")));
    });
  });

  describe("safeRun", () => {
    it("runs successful Task", async () => {
      const result = await safeRun(taskOk);
      expect(result).toEqual(ok(4));
    });

    it("runs failed Task", async () => {
      const result = await safeRun(taskErr);
      expect(result).toEqual(err(new Error("task error")));
    });
  });

  describe("bind", () => {
    it("binds generator function", async () => {
      {
        const a = bind(function* () {
          return yield* of(42);
        });
        const result = await a.unsafeRun();
        expect(result).toEqual(42);

        type _a = Assert<Task<number>, typeof a>;
      }
      {
        const a = bind(function* () {
          const a = yield* of(1);
          const b = yield* of(2);
          return a + b;
        });
        const result = await a.unsafeRun();
        expect(result).toEqual(3);

        type _a = Assert<Task<number>, typeof a>;
      }
    });
  });

  describe("unsafeRun", () => {
    it("runs the Task", async () => {
      const result = await taskOk.unsafeRun();
      expect(result).toEqual(4);
    });

    it("throws on error", async () => {
      try {
        await taskErr.unsafeRun();
        expect.unreachable("should have thrown");
      } catch (e) {
        expect(e).toBeDefined();
      }
    });
  });

  describe("Symbol.iterator", () => {
    it("allows using Task in generator", async () => {
      const result = await bind(function* () {
        const value = yield* taskOk;
        return value + 1;
      }).unsafeRun();
      expect(result).toEqual(5);
    });
  });

  describe("laziness", () => {
    it("does not execute task until unsafeRun is called", async () => {
      let executed = false;
      const task = createTask(async () => {
        executed = true;
        return 42;
      });

      expect(executed).toBeFalse();

      await task.unsafeRun();

      expect(executed).toBeTrue();
    });

    it("does not execute task until unsafeRun is called even after map", async () => {
      let executed = false;
      const task = createTask(async () => {
        executed = true;
        return 42;
      });

      const mapped = task.map(x => x + 1);

      expect(executed).toBeFalse();

      await mapped.unsafeRun();

      expect(executed).toBeTrue();
    });

    it("does not execute task until unsafeRun is called even after flatMap", async () => {
      let executed = false;
      const task = createTask(async () => {
        executed = true;
        return 42;
      });

      const flatMapped = task.flatMap(x => of(x + 1));

      expect(executed).toBeFalse();

      await flatMapped.unsafeRun();

      expect(executed).toBeTrue();
    });
  });

  describe("immutability", () => {
    it("original task is not mutated after map", async () => {
      const task = of(42);
      const mapped = task.map(x => x + 1);

      const originalResult = await task.unsafeRun();
      const mappedResult = await mapped.unsafeRun();

      expect(originalResult).toEqual(42);
      expect(mappedResult).toEqual(43);
    });

    it("original task is not mutated after flatMap", async () => {
      const task = of(42);
      const flatMapped = task.flatMap(x => of(x * 2));

      const originalResult = await task.unsafeRun();
      const flatMappedResult = await flatMapped.unsafeRun();

      expect(originalResult).toEqual(42);
      expect(flatMappedResult).toEqual(84);
    });

    it("can run original task multiple times after transformations", async () => {
      let callCount = 0;
      const task = createTask(async () => {
        callCount++;
        return 42;
      });

      const mapped = task.map(x => x + 1);
      const flatMapped = task.flatMap(x => of(x * 2));

      await task.unsafeRun();
      await mapped.unsafeRun();
      await flatMapped.unsafeRun();

      expect(callCount).toEqual(3);
      expect(await task.unsafeRun()).toEqual(42);
    });

    it("chain of transformations does not mutate original", async () => {
      const task = of(10);

      const step1 = task.map(x => x + 1);
      const step2 = step1.map(x => x * 2);
      const step3 = step2.flatMap(x => of(x - 5));

      expect(await task.unsafeRun()).toEqual(10);
      expect(await step1.unsafeRun()).toEqual(11);
      expect(await step2.unsafeRun()).toEqual(22);
      expect(await step3.unsafeRun()).toEqual(17);
    });
  });
});
