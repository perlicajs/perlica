---
outline: deep
---

# Result

## Overview

```ts
type Result<T, E> = Ok<T> | Err<E>
```

See also the **[Result](https://doc.rust-lang.org/std/result/index.html)**

## Methods

### and

```ts
and<U, T, E>(this: Result<T, E>, res: Result<U, E>): Result<U, E>
```

Returns `res` if `this` is `Ok`, otherwise returns `Err`.

```ts
import { err, ok } from "perlica/Result";

const a = ok(4);
const b = err("new error");
expect(a.and(b)).toEqual(err("new error"));

const a = err("old error");
const b = ok(4);
expect(a.and(b)).toEqual(err("old error"));

const a = err("old error");
const b = err("new error");
expect(a.and(b)).toEqual(err("old error"));

const a = ok(4);
const b = ok(12);
expect(a.and(b)).toEqual(ok(12));
```

See also the **[Result.and](https://doc.rust-lang.org/std/result/enum.Result.html#method.and)**

---

### andThen

```ts
andThen<U, T, E>(this: Result<T, E>, f: (v: T) => Result<U, E>): Result<U, E>
```

Returns `f` call if `this` is `Ok`, otherwise returns `Err`.

```ts
import { err, ok } from "perlica/Result";

const string_to_number = (num: string): Result<number, Error> => {
  const v = Number(num);
  return isNaN(v) ? err(Error("Not a Number")) : ok(v);
};

expect(ok("4").andThen(string_to_number)).toEqual(ok(4));
expect(ok("hello").andThen(string_to_number)).toEqual(err(Error("Not a Number")));
expect(err(Error("old error")).andThen(string_to_number)).toEqual(err(Error("old error")));
```

See also the **[Result.and_then](https://doc.rust-lang.org/std/result/enum.Result.html#method.and_then)**

---

### expect

```ts
expect<T, E>(this: Result<T, E>, msg: string): T
```

Returns the contained value `T` if `this` is `Ok`, otherwise throw exception value `E`.

```ts
import { err, ok } from "perlica/Result";

const a = ok(4);
const b = err("error");

expect(a.expect("my error message")).toEqual(4);
expect(() => b.expect("my error message")).toThrowError("my error message");
```

See also the **[Result.expect](https://doc.rust-lang.org/std/result/enum.Result.html#method.expect)**

---

### expectErr

```ts
expectErr<T, E>(this: Result<T, E>, msg: string): E
```

Returns the contained value `E` if `this` is `Err`, otherwise throw exception `msg`.

```ts
import { err, ok } from "perlica/Result";

const a = ok(4);
const b = err("error");

expect(() => a.expectErr("my error message")).toThrowError("my error message");
expect(t).toEqual("error");
```

See also the **[Result.expect_err](https://doc.rust-lang.org/std/result/enum.Result.html#method.expect_err)**

---

### unwrap

```ts
unwrap<T, E>(this: Result<T, E>): T
```

Returns the contained value `Ok`, otherwise throw `Error` exception.

```ts
import { err, ok } from "perlica/Result";

expect(ok(4).unwrap()).toEqual(4);
expect(() => err("error").unwrap()).toThrowError(`called \`Result.unwrap()\` on an \`Err\` value: error`);
```

See also the **[Result.unwrap](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap)**

---

### unwrapErr

```ts
unwrapErr<T, E>(this: Result<T, E>): E
```

Returns the contained value `Err`, otherwise throw `Error` exception.

```ts
import { err, ok } from "perlica/Result";

expect(() => ok(4).unwrapErr()).toThrowError(`called \`Result.unwrapErr()\` on an \`Ok\` value: 4`);
expect(err("error").unwrapErr()).toEqual("error");
```

See also the **[Result.unwrap_err](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap_err)**

---

### unwrapOr

```ts
unwrapOr<T, E>(this: Result<T, E>, def: T): T
```

Returns the contained value `Ok`, otherwise returns `def`.

```ts
import { err, ok } from "perlica/Result";

expect(ok(4).unwrapOr(10)).toEqual(4);
expect(err("error").unwrapOr(10)).toEqual(10);
```

See also the **[Result.unwrap_or](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap_or)**

---

### unwrapOrElse

```ts
unwrapOrElse<T, E>(this: Result<T, E>, def: (v: E) => T): T
```

Returns the contained value `Ok`, otherwise `def` call.

```ts
import { err, ok } from "perlica/Result";

const len = (s: string) => s.length;

expect(ok(4).unwrapOrElse(len)).toEqual(4);
expect(err("error").unwrapOrElse(len)).toEqual(5);
```

See also the **[Result.unwrap_or_else](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap_or_else)**

## Functions

### and

```ts
export const and = <U, T, E>(res1: Result<T, E>, res2: Result<U, E>): Result<U, E>
```

Returns `res2` if `res1` is `Ok`, otherwise returns `res1`.

```ts
import * as R from "perlica/Result";

const a = R.ok(4);
const b = R.err("new error");
expect(R.and(a, b)).toEqual(R.err("new error"));

const a = R.err("old error");
const b = R.ok(4);
expect(R.and(a, b)).toEqual(R.err("old error"));

const a = R.err("old error");
const b = R.err("new error");
expect(R.and(a, b)).toEqual(R.err("old error"));

const a = R.ok(4);
const b = R.ok(12);
expect(R.and(a, b)).toEqual(R.ok(12));
```

See also the **[Result.and](https://doc.rust-lang.org/std/result/enum.Result.html#method.and)**

---

### andThen

```ts
export const andThen = <U, T, E>(res1: Result<T, E>, f: (v: T) => Result<U, E>): Result<U, E>
```

Returns `f` call if `res1` is `Ok`, otherwise returns `res1`.

```ts
import * as R from "perlica/Result";

const string_to_number = (num: string): R.Result<number, Error> => {
  const v = Number(num);
  return isNaN(v) ? R.err(Error("Not a Number")) : R.ok(v);
};

expect(R.andThen(R.ok("4"), string_to_number)).toEqual(R.ok(4));
expect(R.andThen(R.ok("hello"), string_to_number)).toEqual(R.err(Error("Not a Number")));
expect(R.andThen(R.err(Error("old error")), string_to_number)).toEqual(R.err(Error("old error")));
```

See also the **[Result.and_then](https://doc.rust-lang.org/std/result/enum.Result.html#method.and_then)**

---

### expect

```ts
export const expect = <T, E>(res: Result<T, E>, msg: string): T
```

Returns the contained value `T` if `res` is `Ok`, otherwise throw exception `msg`.

```ts
import * as R from "perlica/Result";

const a = R.ok(4);
const b = R.err("error");

expect(R.expect(a, "my error message")).toEqual(4);
expect(() => R.expect(b, "my error message")).toThrowError("my error message");
```

See also the **[Result.expect](https://doc.rust-lang.org/std/result/enum.Result.html#method.expect)**

---

### expectErr

```ts
export const expectErr = <T, E>(res: Result<T, E>, msg: string): E
```

Returns the contained value `E` if `res` is `Err`, otherwise throw exception `msg`.

```ts
import * as R from "perlica/Result";

const a = R.ok(4);
const b = R.err("error");

expect(() => R.expectErr(a, "my error message")).toThrowError("my error message");
expect(R.expectErr(b, "my error message")).toEqual("error");
```

See also the **[Result.expect_err](https://doc.rust-lang.org/std/result/enum.Result.html#method.expect_err)**

---

### unwrap

```ts
export const unwrap = <T, E>(self: Result<T, E>): T
```

Returns the contained value `Ok`, otherwise throw `Error` exception.

```ts
import * as R from "perlica/Result";

expect(R.unwrap(R.ok(4))).toEqual(4);
expect(() => R.unwrap(R.err("error"))).toThrowError(`called \`Result.unwrap()\` on an \`Err\` value: error`);
```

See also the **[Result.unwrap](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap)**

---

### unwrapErr

```ts
export const unwrapErr = <T, E>(self: Result<T, E>): E
```

Returns the contained value `Err`, otherwise throw `Error` exception.

```ts
import * as R from "perlica/Result";

expect(() => R.unwrapErr(R.ok(4))).toThrowError(`called \`Result.unwrapErr()\` on an \`Ok\` value: 4`);
expect(R.unwrapErr(R.err("error"))).toEqual("error");
```

See also the **[Result.unwrap_err](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap_err)**

---

### unwrapOr

```ts
export const unwrapOr = <T, E>(self: Result<T, E>, def: T): T
```

Returns the contained value `Ok`, otherwise returns `def`.

```ts
import * as R from "perlica/Result";

expect(R.unwrapOr(R.ok(4), 10)).toEqual(4);
expect(R.unwrapOr(R.err("error"), 10)).toEqual(10);
```

See also the **[Result.unwrap_or](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap_or)**

---

### unwrapOrElse

```ts
export const unwrapOrElse = <T, E>(self: Result<T, E>, def: (v: E) => T): T
```

Returns the contained value `Ok`, otherwise `def` call.

```ts
import * as R from "perlica/Result";

const len = (s: string) => s.length;

expect(R.unwrapOrElse(R.ok(4), len)).toEqual(4);
expect(R.unwrapOrElse(R.err("error"), len)).toEqual(5);
```

See also the **[Result.unwrap_or_else](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap_or_else)**