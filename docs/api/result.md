---
outline: deep
---

# Result

## Overview

```ts
type Result<T, E> = Ok<T> | Err<E>
```

## Methods

### and

```ts
and<U, T, E>(this: Result<T, E>, res: Result<U, E>): Result<U, E>
```

Returns `res` if this is `Ok`, otherwise returns `Err`.

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

---

### andThen

```ts
andThen<U, T, E>(this: Result<T, E>, f: (v: T) => Result<U, E>): Result<U, E>
```

Returns `f` call result if this is `Ok`, otherwise returns `Err`.

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

---

## Functions

### and

```ts
export const and = <U, T, E>(res1: Result<T, E>, res2: Result<U, E>): Result<U, E>
```

Returns `res2` if this is `Ok`, otherwise returns res1 `Err`.

```ts
import * as R from "~/Result";

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

---

### andThen

```ts
export const andThen = <U, T, E>(res1: Result<T, E>, f: (v: T) => Result<U, E>): Result<U, E>
```

Returns `f` call result if this is `Ok`, otherwise returns `res1` `Err`.

```ts
import * as R from "~/Result";

const string_to_number = (num: string): R.Result<number, Error> => {
  const v = Number(num);
  return isNaN(v) ? R.err(Error("Not a Number")) : R.ok(v);
};

expect(R.andThen(R.ok("4"), string_to_number)).toEqual(R.ok(4));
expect(R.andThen(R.ok("hello"), string_to_number)).toEqual(R.err(Error("Not a Number")));
expect(R.andThen(R.err(Error("old error")), string_to_number)).toEqual(R.err(Error("old error")));
```