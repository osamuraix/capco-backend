import { IsNumber, IsOptional } from "class-validator";

import { ICalculateRequest } from "@services/v1";

export default class CalculatorRequest implements ICalculateRequest {
  @IsNumber()
  first: number;

  @IsOptional()
  @IsNumber()
  second?: number;
}
