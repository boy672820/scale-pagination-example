export class Money {
  private constructor(private readonly _value: string) {}

  static wons(value: string | number): Money {
    value = value.toString();

    const isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i;
    if (isNumeric.test(value)) {
      return new Money(value);
    }

    throw new Error('Money value is not numeric');
  }

  value = (): string => this._value.toString();

  toEqual = (money: Money): boolean => money._value === this._value;
}
