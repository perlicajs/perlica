---
outline: deep
---

# Predicate overview

## Instances

### Predicate

```ts
export interface Predicate<T> {
  (value: T): boolean;
}
```

## Combinators

### not

```ts
export const not = <T>(self: Predicate<T>): Predicate<T>
```

Returns `Predicate<T>` with negates result.

```ts
import { not, isNumber } from "perlica/Predicate"

const isNotNumber = not(isNumber);

expect(isNotNumber(4)).toBeFalse();
expect(isNotNumber("hello")).toBeTrue();
```

---

### and

```ts
export const and = <T>(self: Predicate<T>, that: Predicate<T>): Predicate<T>
```

Combines two predicates (`self` and `that`) into a new `Predicate<T>`.\
Returns `true` if both returns `true`, otherwise returns `false`.

```ts
import { and } from "perlica/Predicate"
import { lt, gt } from "perlica/Predicate/Number"

const between5And10 = and(lt(10), gt(5));

expect(between5And10(7)).toBeTrue();
expect(between5And10(2)).toBeFalse();
expect(between5And10(12)).toBeFalse();
```

---

### or

```ts
export const or = <T>(self: Predicate<T>, that: Predicate<T>): Predicate<T>
```

Combines two predicates (`self` and `that`) into a new `Predicate<T>`.\
Returns `true` if at least one returns `true`, otherwise returns `false`.

```ts
import { or } from "perlica/Predicate"
import { lt, gt} from "perlica/Predicate/Number"

const less5OrGreater10 = or(lt(5), gt(10));

expect(less5OrGreater10(7)).toBeFalse();
expect(less5OrGreater10(2)).toBeTrue();
expect(less5OrGreater10(12)).toBeTrue();
```

---

### all

```ts
export const all = <T>(predicates: Iterable<Predicate<T>>): Predicate<T>
```

Combining multiple `predicates` into a new `Predicate<T>`.\
Returns `true` if all returns `true`, otherwise returns `false`.

```ts
import { all, isNumber } from "perlica/Predicate"
import { lt, gt } from "perlica/Predicate/Number"

const myNumber = all([isNumber, lt(10), gt(5)]);

expect(myNumber(7)).toBeTrue();
expect(myNumber(2)).toBeFalse();
expect(myNumber(12)).toBeFalse();
```

---

### any

```ts
export const any = <T>(predicates: Iterable<Predicate<T>>): Predicate<T> 
```

Combining multiple `predicates` into a new `Predicate<T>`.\
Returns `true` if at least one returns `true`, otherwise returns `false`.

```ts
import { any, isNumber, isString, isBoolean } from "perlica/Predicate"

const isNumberOrStringOrBoolean = any([isNumber, isString, isBoolean]);

expect(isNumberOrStringOrBoolean(4)).toBeTrue();
expect(isNumberOrStringOrBoolean("test")).toBeTrue();
expect(isNumberOrStringOrBoolean(true)).toBeTrue();

expect(isNumberOrStringOrBoolean(null)).toBeFalse();
expect(isNumberOrStringOrBoolean(undefined)).toBeFalse();
expect(isNumberOrStringOrBoolean({})).toBeFalse();
```

### eq

```ts
export const eq = <T>(that: T): Predicate<T>
```

Returns a new `Predicate<T>`.\
Returns `true` if `that` is equal to a pre-defined `value`.

```ts
import { eq } from "perlica/Predicate"

const predicate = eq(5);

expect(predicate(5)).toBeTrue();
expect(predicate(4)).toBeFalse();
```

---

### ne

```ts
export const ne = <T>(that: T): Predicate<T>
```

Returns a new `Predicate<T>`.\
Returns `true` if `that` is not equal to a pre-defined `value`.

```ts
import { ne } from "perlica/Predicate"

const predicate = ne(5);

expect(predicate(5)).toBeFalse();
expect(predicate(4)).toBeTrue();
```

## Guards

### isNull

```ts
export const isNull = (value: unknown): value is null
```

Returns `true` if `value` is `null`, otherwise returns `false`.

```ts
import { isNull } from "perlica/Predicate"

expect(isNull(null)).toBeTrue();
expect(isNull(undefined)).toBeFalse();
expect(isNull(4)).toBeFalse();
expect(isNull("hello")).toBeFalse();
```

---

### isNotNull

```ts
export const isNotNull = <T>(value: T): value is Exclude<T, null> 
```

Returns `true` if `value` is not `null`, otherwise returns `false`.

```ts
import { isNotNull } from "perlica/Predicate"

expect(isNotNull(null)).toBeFalse();
expect(isNotNull(undefined)).toBeTrue();
expect(isNotNull(4)).toBeTrue();
expect(isNotNull("hello")).toBeTrue();
```

---

### isUndefined

```ts
export const isUndefined = (value: unknown): value is undefined
```

Returns `true` if `value` is `undefined`, otherwise returns `false`.

```ts
import { isUndefined } from "perlica/Predicate"

expect(isUndefined(null)).toBeFalse();
expect(isUndefined(undefined)).toBeTrue();
expect(isUndefined(4)).toBeFalse();
expect(isUndefined("hello")).toBeFalse();
```

---

### isNotUndefined

```ts
export const isNotUndefined = <T>(value: T): value is Exclude<T, undefined> 
```

Returns `true` if `value` is not `undefined`, otherwise returns `false`.

```ts
import { isNotUndefined } from "perlica/Predicate"

expect(isNotUndefined(null)).toBeTrue();
expect(isNotUndefined(undefined)).toBeFalse();
expect(isNotUndefined(4)).toBeTrue();
expect(isNotUndefined("hello")).toBeTrue();
```

---

### isBoolean

```ts
export const isBoolean = (value: unknown): value is boolean 
```

Returns `true` if `value` is `true` or `false`, otherwise returns `false`.

```ts
import { isBoolean } from "perlica/Predicate"

expect(isBoolean(true)).toBeTrue();
expect(isBoolean(false)).toBeTrue();
expect(isBoolean(null)).toBeFalse();
expect(isBoolean(4)).toBeFalse();
```

---

### isNumber

```ts
export const isNumber = (value: unknown): value is number
```

Returns `true` if `value` is `number`, otherwise returns `false`.

```ts
import { isNumber } from "perlica/Predicate"

expect(isNumber(4)).toBeTrue();
expect(isNumber(4.4)).toBeTrue();

expect(isNumber(null)).toBeFalse();
expect(isNumber(true)).toBeFalse();
expect(isNumber("hello")).toBeFalse();
```

---

### isInteger

```ts
export const isInteger = (value: unknown): value is number 
```

Returns `true` if `value` is `integer`, otherwise returns `false`.

```ts
import { isInteger } from "perlica/Predicate"

expect(isInteger(4)).toBeTrue();
expect(isInteger(4.4)).toBeFalse();
```

---

### isBigInt

```ts
export const isInteger = (value: unknown): value is number 
```

Returns `true` if `value` is `bigint`, otherwise returns `false`.

```ts
import { isBigInt } from "perlica/Predicate"

expect(isBigInt(4)).toBeFalse();
expect(isBigInt(4n)).toBeTrue();
```

---

### isString

```ts
export const isString = (value: unknown): value is string
```

Returns `true` if `value` is `string`, otherwise returns `false`.

```ts
import { isString } from "perlica/Predicate"

expect(isString("hello")).toBeTrue();
expect(isString(4)).toBeFalse();
expect(isString(null)).toBeFalse();
expect(isString(true)).toBeFalse();
```

---

### isFunction

```ts
export const isFunction = (value: unknown): value is Function
```

Returns `true` if `value` is `Function`, otherwise returns `false`.

```ts
import { isFunction } from "perlica/Predicate"

expect(isFunction(isFunction)).toBeTrue();
expect(isFunction("isFunction")).toBeFalse();
```

---

### isSymbol

```ts
export const isSymbol = (value: unknown): value is symbol
```

Returns `true` if `value` is `symbol`, otherwise returns `false`.

```ts
import { isSymbol } from "perlica/Predicate"

expect(isSymbol(Symbol.for("a"))).toBeTrue();
expect(isSymbol("a")).toBeFalse();
```

---

### isTruthy

```ts
export const isTruthy = (value: unknown): boolean
```

Returns `true` if `value` is not `symbol`, otherwise returns `false`.

```ts
import { isTruthy } from "perlica/Predicate"

expect(isTruthy(1)).toBeTrue();
expect(isTruthy("a")).toBeTrue();

expect(isTruthy(0)).toBeFalse();
expect(isTruthy("")).toBeFalse();
```

---

### isSet

```ts
export const isSet = (value: unknown): value is Set<unknown>
```

Returns `true` if `value` is `Set`, otherwise returns `false`.

```ts
import { isSet } from "perlica/Predicate"

expect(isSet(new Set())).toBeTrue();
expect(isSet({})).toBeFalse();
```

---

### isMap

```ts
export const isMap = (value: unknown): value is Map<unknown, unknown>
```

Returns `true` if `value` is `Map`, otherwise returns `false`.

```ts
import { isMap } from "perlica/Predicate"

expect(isMap(new Map())).toBeTrue();
expect(isMap({})).toBeFalse();
```

---

### isError

```ts
export const isError = (value: unknown): value is Error
```

Returns `true` if `value` is `Error`, otherwise returns `false`.

```ts
import { isError } from "perlica/Predicate"

expect(isError(new Error())).toBeTrue();
expect(isError({})).toBeFalse();
expect(isError(null)).toBeFalse();
expect(isError(undefined)).toBeFalse();
```

---

### isNullable

```ts
export const isNullable = <T>(value: T): value is Extract<T, null | undefined> 
```

Returns `true` if `value` is `null` or `undefined`, otherwise returns `false`.

```ts
import { isNullable } from "perlica/Predicate"

expect(isNullable(null)).toBeTrue();
expect(isNullable(undefined)).toBeTrue();
expect(isNullable(4)).toBeFalse();
```

---

### isNotNullable

```ts
export const isNotNullable = <T>(value: T): value is NonNullable<T>
```

Returns `true` if `value` is not `null` and not `undefined`, otherwise returns `false`.

```ts
import { isNotNullable } from "perlica/Predicate"

expect(isNotNullable(null)).toBeFalse();
expect(isNotNullable(undefined)).toBeFalse();
expect(isNotNullable(4)).toBeTrue();
```

---

### isPromise

```ts
export const isPromise = (value: unknown): value is Promise<unknown>
```

Returns `true` if `value` is `Promise`, otherwise returns `false`.

```ts
import { IsPromise } from "perlica/Predicate"

expect(IsPromise(Promise.resolve(4))).toBeTrue();
expect(IsPromise(4)).toBeFalse();
```

---

### isRegExp

```ts
export const isRegExp = (value: unknown): value is RegExp
```

Returns `true` if `value` is `RegExp`, otherwise returns `false`.

```ts
import { isRegExp } from "perlica/Predicate"

expect(isRegExp(/4/)).toBeTrue();
expect(isRegExp(4)).toBeFalse();
```

---

### isDate

```ts
export const isDate = (value: unknown): value is Date
```

Returns `true` if `value` is `Date`, otherwise returns `false`.

```ts
import { isDate } from "perlica/Predicate"

expect(isDate(new Date())).toBeTrue();
expect(isDate({})).toBeFalse();
```

---

### isRecordOrArray

```ts
export const isRecordOrArray = (value: unknown): value is { [x: PropertyKey]: unknown } 
```

Returns `true` if `value` is `record` or `array`, otherwise returns `false`.

```ts
import { isRecordOrArray } from "perlica/Predicate"

expect(isRecordOrArray({})).toBeTrue();
expect(isRecordOrArray([])).toBeTrue();

expect(isRecordOrArray(null)).toBeFalse();
expect(isRecordOrArray(undefined)).toBeFalse();
expect(isRecordOrArray(4)).toBeFalse();
```

---

### isObject

```ts
export const isObject = (value: unknown): value is object
```

Returns `true` if `value` is `object` (`record`, `array`, `function`), otherwise returns `false`.

```ts
import { isObject } from "perlica/Predicate"

expect(isObject({})).toBeTrue();
expect(isObject([])).toBeTrue();
expect(isObject(() => {})).toBeTrue();

expect(isObject(null)).toBeFalse();
expect(isObject(undefined)).toBeFalse();
expect(isObject(4)).toBeFalse();
```

---

### hasProperty

```ts
export const hasProperty = <P extends PropertyKey>(
  value: unknown, property: P,
): value is { [K in P]: unknown }
```

Returns `true` if `value` is object and containing a `property` key, otherwise returns `false`.

```ts
import { hasProperty } from "perlica/Predicate"

expect(hasProperty({}, "test")).toBeFalse();
expect(hasProperty("test", "test")).toBeFalse();
expect(hasProperty({ test: 4 }, "test")).toBeTrue();
```

---

### isIterable

```ts
export const isIterable = (value: unknown): value is Iterable<unknown>
```

Returns `true` if `value` is object and containing a `Symbol.iterator` key, otherwise returns `false`.

```ts
import { isIterable } from "perlica/Predicate"

expect(isIterable([])).toBeTrue();
expect(isIterable({})).toBeFalse();
```

---

### isAsyncIterable

```ts
export const isAsyncIterable = (value: unknown): value is AsyncIterable<unknown>
```

Returns `true` if `value` is object and containing a `Symbol.asyncIterator` key, otherwise returns `false`.

```ts
import { isAsyncIterable } from "perlica/Predicate"

expect(isAsyncIterable({ [Symbol.asyncIterator]() {} })).toBeTrue();
expect(isAsyncIterable({})).toBeFalse();
```

---

### isTypedArray

```ts
export const isTypedArray = (value: unknown): value is TypedArray
```

Returns `true` if `value` is `TypedArray`, otherwise returns `false`.

---

### isInt8Array

```ts
export const isInt8Array = (value: unknown): value is Int8Array
```

Returns `true` if `value` is `Int8Array`, otherwise returns `false`.

---

### isUint8Array

```ts
export const isUint8Array = (value: unknown): value is Uint8Array
```

Returns `true` if `value` is `Uint8Array`, otherwise returns `false`.

---

### isUint8ClampedArray

```ts
export const isUint8ClampedArray = (value: unknown): value is Uint8ClampedArray
```

Returns `true` if `value` is `Uint8ClampedArray`, otherwise returns `false`.

---

### isInt16Array

```ts
export const isInt16Array = (value: unknown): value is Int16Array
```

Returns `true` if `value` is `Int16Array`, otherwise returns `false`.

---

### isUint16Array

```ts
export const isUint16Array = (value: unknown): value is Uint16Array
```

Returns `true` if `value` is `Uint16Array`, otherwise returns `false`.

---

### isInt32Array

```ts
export const isInt32Array = (value: unknown): value is Int32Array
```

Returns `true` if `value` is `Int32Array`, otherwise returns `false`.

---

### isUint32Array

```ts
export const isUint32Array = (value: unknown): value is Uint32Array 
```

Returns `true` if `value` is `Uint32Array`, otherwise returns `false`.

---

### isFloat32Array

```ts
export const isFloat32Array = (value: unknown): value is Float32Array
```

Returns `true` if `value` is `Float32Array`, otherwise returns `false`.

---

### isFloat64Array

```ts
export const isFloat64Array = (value: unknown): value is Float64Array
```

Returns `true` if `value` is `Float64Array`, otherwise returns `false`.

---

### isBigInt64Array

```ts
export const isBigInt64Array = (value: unknown): value is BigInt64Array
```

Returns `true` if `value` is `BigInt64Array`, otherwise returns `false`.

---

### isBigUint64Array

```ts
export const isBigUint64Array = (value: unknown): value is BigUint64Array
```

Returns `true` if `value` is `BigUint64Array`, otherwise returns `false`

## String

### isEmpty

```ts
export const isEmpty = (self: string): self is ""
```

Returns `true` if `self` is empty, otherwise returns `false`.

```ts
import { isEmpty } from "perlica/Predicate/String"

expect(isEmpty("hello")).toBeFalse();
expect(isEmpty("")).toBeTrue();
```

---

### includes

```ts
export const includes = (searchString: string, position?: number): Predicate<string>
```

Returns a new `Predicate<T>`.\
Returns `true` if `searchString` appears as a substring of `self`, otherwise returns `false`.

```ts
import { includes } from "perlica/Predicate/String"

const predicate = includes("test");

expect(predicate("Hello test world")).toBeTrue();
expect(predicate("Hello world")).toBeFalse();
```

---

### startsWith

```ts
export const startsWith = (searchString: string, position?: number): Predicate<string>
```

Returns a new `Predicate<T>`.\
Returns `true` if `searchString` starts with a `self`, otherwise returns `false`.

```ts
import { startsWith } from "perlica/Predicate/String"

const predicate = startsWith("test");

expect(predicate("test world")).toBeTrue();
expect(predicate("world")).toBeFalse();
```

---

### endsWith

```ts
export const endsWith = (searchString: string, position?: number): Predicate<string>
```

Returns a new `Predicate<T>`.\
Returns `true` if `searchString` ends with a `self`, otherwise returns `false`.

```ts
import { endsWith } from "perlica/Predicate/String"

const predicate = endsWith("test");

expect(predicate("world test")).toBeTrue();
expect(predicate("world")).toBeFalse();
```

---

### isMatch

```ts
export const isMatch = (regexp: RegExp): Predicate<string>
```

Returns a new `Predicate<T>`.\
Returns `true` if a regular expression (`regexp`) to match `self`, otherwise returns `false`.

```ts
import { isMatch } from "perlica/Predicate/String"

const predicate = isMatch(/Hello.*/);

expect(predicate("Hello world")).toBeTrue();
expect(predicate("Fello world")).toBeFalse();
```

---

### max

```ts
export const max = (count: number): Predicate<string> 
```

Returns a new `Predicate<T>`.\
Returns `true` if `value` is length less or equal to a pre-defined `count`.

```ts
import { max } from "perlica/Predicate/String"

const predicate = max(5);

expect(predicate("Hello")).toBeTrue();
expect(predicate("Hello world")).toBeFalse();
```

---

### min

```ts
export const min = (count: number): Predicate<string> 
```

Returns a new `Predicate<T>`.\
Returns `true` if `value` is length greater or equal to a pre-defined `count`.

```ts
import { min } from "perlica/Predicate/String"

const predicate = min(5);

expect(predicate("Hello")).toBeTrue();
expect(predicate("Hello world")).toBeFalse();
```

---

### len

```ts
export const len = (count: number): Predicate<string>
```

Returns a new `Predicate<T>`.\
Returns `true` if `value` is length equal to a pre-defined `count`.

```ts
import { len } from "perlica/Predicate/String"

const predicate = len(5);

expect(predicate("Hello")).toBeTrue();
expect(predicate("Hi")).toBeFalse();
expect(predicate("Hello world")).toBeFalse();
```

## Array

### isEmpty

```ts
export const isEmpty = <T>(self: T[]): self is []
```

Returns `true` if `self` is empty, otherwise returns `false`.

```ts
import { isEmpty } from "perlica/Predicate/Array"
 *
expect(isEmpty([4])).toBeFalse();
expect(isEmpty([])).toBeTrue();
```

---

### isNonEmpty

```ts
export const isNonEmpty = <T>(self: T[]): self is [T, ...T[]]
```

Returns `true` if `self` is not empty, otherwise returns `false`.

```ts
import { isNonEmpty } from "perlica/Predicate/Array"
 *
expect(isEmpty([4])).toBeTrue();
expect(isEmpty([])).toBeFalse();
```

---

### max

```ts
export const max = <T>(count: number): predicate.Predicate<T[]>
```

Returns a new `Predicate<T>`.\
Returns `true` if `value` is length less or equal to a pre-defined `count`.

```ts
import { max } from "perlica/Predicate/Array"

const predicate = max(5);

expect(predicate([1, 2, 3, 4])).toBeTrue();
expect(predicate([1, 2, 3, 4, 5])).toBeFalse();
```

---

### min

```ts
export const min = <T>(count: number): Predicate<T[]>
```

Returns a new `Predicate<T>`.\
Returns `true` if `value` is length greater or equal to a pre-defined `count`.

```ts
import { min } from "perlica/Predicate/Array"

const predicate = min(4);

expect(predicate([1, 2, 3, 4])).toBeTrue();
expect(predicate([1, 2, 3])).toBeFalse();
```

---

### len

```ts
export const len = <T>(count: number): Predicate<T[]> 
```

Returns a new `Predicate<T>`.\
Return `true` if `value` is length equal to a pre-defined `count`.

```ts
import { len } from "perlica/Predicate/Array"

const predicate = len(4);

expect(predicate([1, 2, 3, 4])).toBeTrue();
expect(predicate([1, 2])).toBeFalse();
expect(predicate([1, 2, 3, 4, 5])).toBeFalse();
```

## Number

### isPositive

```ts
export const isPositive = (value: number): boolean
```

Returns `true` if `value > 0`, otherwise returns `false`.

```ts
import { isPositive } from "perlica/Predicate/Number"

expect(isPositive(0)).toBeFalse();
expect(isPositive(4)).toBeTrue();
expect(isPositive(-4)).toBeFalse();
```

---

### isNonNegative

```ts
export const isNonNegative = (value: number): boolean 
```

Returns `true` if `value >= 0`, otherwise returns `false`.

```ts
import { isNonNegative } from "perlica/Predicate/Number"

expect(isNonNegative(0)).toBeTrue();
expect(isNonNegative(4)).toBeTrue();
expect(isNonNegative(-4)).toBeFalse();
```

---

### isNegative

```ts
export const isNegative = (value: number): boolean
```

Returns `true` if `value < 0`, otherwise returns `false`.

```ts
import { isNegative } from "perlica/Predicate/Number"

expect(isNegative(0)).toBeFalse();
expect(isNegative(4)).toBeFalse();
expect(isNegative(-4)).toBeTrue();
```

---

### isNonPositive

```ts
export const isNonPositive = (value: number): boolean
```

Returns `true` if `value <= 0`, otherwise returns `false`.

```ts
import { isNonPositive } from "perlica/Predicate/Number"

expect(isNonPositive(0)).toBeTrue();
expect(isNonPositive(4)).toBeFalse();
expect(isNonPositive(-4)).toBeTrue();
```

---

### isFinite

```ts
export const isFinite = (value: number): boolean
```

Returns `true` if `value` is finite, not `Infinity` or `-Infinity`, otherwise returns `false`.

```ts
import { isFinite } from "perlica/Predicate/Number"

expect(isFinite(4 / 2)).toBeTrue();
expect(isFinite(4 / 0)).toBeFalse();
```

---

### multipleOf

```ts
export const multipleOf = (that: number): Predicate<number> 
```

Returns a new `Predicate<T>`.\
Returns `true` if `value` is evenly divisible by a pre-defined `that`.

```ts
import { multipleOf } from "perlica/Predicate/Number"

const predicate = multipleOf(2);

expect(predicate(4)).toBeTrue();
expect(predicate(3)).toBeFalse();
```

---

### lt

```ts
export const lt = <T>(that: T): Predicate<T>
```

Returns a new `Predicate<T>`.\
Returns `true` if `that` is less than a pre-defined `value`.

```ts
import { lt } from "perlica/Predicate/Number"

const predicate = lt(4);

expect(predicate(5)).toBeFalse();
expect(predicate(4)).toBeFalse();
expect(predicate(3)).toBeTrue();
```

---

### gt

```ts
export const gt = <T>(that: T): Predicate<T>
```

Returns a new `Predicate<T>`.\
Returns `true` if `that` is greater than a pre-defined `value`.

```ts
import { gt } from "perlica/Predicate/Number"

const predicate = gt(4);

expect(predicate(5)).toBeTrue();
expect(predicate(4)).toBeFalse();
expect(predicate(3)).toBeFalse();
```

---

### le

```ts
export const le = <T>(that: T): Predicate<T>
```

Returns a new `Predicate<T>`.\
Returns `true` if `that` is less than or equal to a pre-defined `value`.

```ts
import { le } from "perlica/Predicate/Number"

const predicate = le(4);

expect(predicate(5)).toBeFalse();
expect(predicate(4)).toBeTrue();
expect(predicate(3)).toBeTrue();
```

---

### ge

```ts
export const ge = <T>(that: T): Predicate<T>
```

Returns a new `Predicate<T>`.\
Returns `true` if `that` is greater than or equal to a pre-defined `value`.

```ts
import { ge } from "perlica/Predicate/Number"

const predicate = ge(4);

expect(predicate(5)).toBeTrue();
expect(predicate(4)).toBeTrue();
expect(predicate(3)).toBeFalse();
```

## BigInt

### isPositive

```ts
export const isPositive = (value: number): boolean
```

Returns `true` if `value > 0`, otherwise returns `false`.

```ts
import { isPositive } from "perlica/Predicate/BigInt"

expect(isPositive(0n)).toBeFalse();
expect(isPositive(4n)).toBeTrue();
expect(isPositive(-4n)).toBeFalse();
```

---

### isNonNegative

```ts
export const isNonNegative = (value: number): boolean 
```

Returns `true` if `value >= 0`, otherwise returns `false`.

```ts
import { isNonNegative } from "perlica/Predicate/BigInt"

expect(isNonNegative(0n)).toBeTrue();
expect(isNonNegative(4n)).toBeTrue();
expect(isNonNegative(-4n)).toBeFalse();
```

---

### isNegative

```ts
export const isNegative = (value: number): boolean
```

Returns `true` if `value < 0`, otherwise returns `false`.

```ts
import { isNegative } from "perlica/Predicate/BigInt"

expect(isNegative(0n)).toBeFalse();
expect(isNegative(4n)).toBeFalse();
expect(isNegative(-4n)).toBeTrue();
```

---

### isNonPositive

```ts
export const isNonPositive = (value: number): boolean
```

Returns `true` if `value <= 0`, otherwise returns `false`.

```ts
import { isNonPositive } from "perlica/Predicate/BigInt"

expect(isNonPositive(0n)).toBeTrue();
expect(isNonPositive(4n)).toBeFalse();
expect(isNonPositive(-4n)).toBeTrue();
```

---

### multipleOf

```ts
export const multipleOf = (that: number): Predicate<number> 
```

Returns a new `Predicate<T>`.\
Returns `true` if `value` is evenly divisible by a pre-defined `that`.

```ts
import { multipleOf } from "perlica/Predicate/BigInt"

const predicate = multipleOf(2);

expect(predicate(4n)).toBeTrue();
expect(predicate(3n)).toBeFalse();
```

### lt

```ts
export const lt = <T>(that: T): Predicate<T>
```

Returns a new `Predicate<T>`.\
Returns `true` if `that` is less than a pre-defined `value`.

```ts
import { lt } from "perlica/Predicate/BigInt"

const predicate = lt(4);

expect(predicate(5n)).toBeFalse();
expect(predicate(4n)).toBeFalse();
expect(predicate(3n)).toBeTrue();
```

---

### gt

```ts
export const gt = <T>(that: T): Predicate<T>
```

Returns a new `Predicate<T>`.\
Returns `true` if `that` is greater than a pre-defined `value`.

```ts
import { gt } from "perlica/Predicate/BigInt"

const predicate = gt(4);

expect(predicate(5n)).toBeTrue();
expect(predicate(4n)).toBeFalse();
expect(predicate(3n)).toBeFalse();
```

---

### le

```ts
export const le = <T>(that: T): Predicate<T>
```

Returns a new `Predicate<T>`.\
Returns `true` if `that` is less than or equal to a pre-defined `value`.

```ts
import { le } from "perlica/Predicate/BigInt"

const predicate = le(4);

expect(predicate(5n)).toBeFalse();
expect(predicate(4n)).toBeTrue();
expect(predicate(3n)).toBeTrue();
```

---

### ge

```ts
export const ge = <T>(that: T): Predicate<T>
```

Returns a new `Predicate<T>`.\
Returns `true` if `that` is greater than or equal to a pre-defined `value`.

```ts
import { ge } from "perlica/Predicate/BigInt"

const predicate = ge(4);

expect(predicate(5n)).toBeTrue();
expect(predicate(4n)).toBeTrue();
expect(predicate(3n)).toBeFalse();
```
