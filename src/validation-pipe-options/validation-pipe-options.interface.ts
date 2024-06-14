/* eslint-disable prettier/prettier */
import { ValidationOptions } from "class-validator";

export interface ValidationPipeOptions extends ValidationOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: any[]) => any;
}
