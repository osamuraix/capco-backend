import { Body, JsonController, Post } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";

import { OperationSign, calculate } from "@services/v1";
import CalculatorRequest from "./dtos/index.dto";

@JsonController("/v1/calculator", { transformResponse: false })
export class CalculatorController {
  @Post("/plus")
  @OpenAPI({ summary: "plus method" })
  async plus(@Body() request: CalculatorRequest) {
    const result = calculate({ ...request, sign: OperationSign.PLUS });

    return { result };
  }

  @Post("/minus")
  @OpenAPI({ summary: "subtract method" })
  async subtract(@Body() request: CalculatorRequest) {
    const result = calculate({ ...request, sign: OperationSign.MINUS });

    return { result };
  }

  @Post("/multiply")
  @OpenAPI({ summary: "multiply method" })
  async multiply(@Body() request: CalculatorRequest) {
    const result = calculate({ ...request, sign: OperationSign.MULTIPLY });

    return { result };
  }

  @Post("/divide")
  @OpenAPI({ summary: "divide method" })
  async divide(@Body() request: CalculatorRequest) {
    const result = calculate({ ...request, sign: OperationSign.DIVIDE });

    return { result };
  }

  @Post("/percentage")
  @OpenAPI({ summary: "percentage method" })
  async percentage(@Body() request: CalculatorRequest) {
    const result = calculate({ ...request, sign: OperationSign.PERCENTAGE });

    return { result };
  }
}
