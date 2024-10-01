export type Assert<
  Actual,
  Expected extends
  | Equal< Actual, Expected >
  | Mistake< "Got unexpected type", Actual >,
> = Actual;

export type Equal<Left, Right> =
    (
      <X>()=> (X extends Left ? 1 : 2)
    ) extends (
      <X>()=> (X extends Right ? 1 : 2)
    ) ? unknown : never;

declare const MistakeSymbol: unique symbol;

export type Mistake<
  Message extends string,
  Info = never,
> = Message & { [ MistakeSymbol ]: Info };
