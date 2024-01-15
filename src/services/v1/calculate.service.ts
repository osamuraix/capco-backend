export enum OperationSign {
  PLUS = "plus",
  MINUS = "minus",
  MULTIPLY = "multiply",
  DIVIDE = "divide",
  PERCENTAGE = "percentage",
}

export interface ICalculateRequest {
  first: number;
  second?: number;
}

export interface ICalculate extends ICalculateRequest {
  sign: OperationSign;
}

export function calculate({
  first,
  second = 0,
  sign,
}: ICalculate): number | null {
  let secondCond = second;
  // let secondCond = second === null ? first : second;

  switch (sign) {
    case OperationSign.PLUS:
      return first + secondCond;
    case OperationSign.MINUS:
      return first - secondCond;
    case OperationSign.MULTIPLY:
      return first * secondCond;
    case OperationSign.DIVIDE:
      if (secondCond === 0) {
        throw new Error("Division by zero is not allowed.");
      }
      return first / secondCond;
    case OperationSign.PERCENTAGE:
      return first / 100;
    default:
      throw new Error("Invalid operation sign.");
  }
}
