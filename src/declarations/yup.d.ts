// yup.d.ts
import { NumberSchema } from "yup";

declare module "yup" {
  interface NumberSchema<T = number> {
    moreThanSumOfFields(fields: string[]): this;
  }
}
