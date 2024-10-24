export class OnceIterator<T, TR> {
  private done: boolean = false;
  constructor(
    private value: T,
  ) {}

  next(value: T): IteratorResult<T, TR> {
    if (this.done) {
      return {
        done:  true,
        value,
      } as unknown as IteratorResult<T, TR>;
    }

    this.done = true;
    return {
      done:  false,
      value: this.value,
    };
  }

  [Symbol.iterator](): Generator<T, TR> {
    return new OnceIterator(this.value) as unknown as Generator<T, TR>;
  }
}
