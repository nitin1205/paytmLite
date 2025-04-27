import { number, object, string, TypeOf } from "zod";

export const TransferSchema = object({
   body: object({
    to: string(),
    amount: number().positive()
   })
});

export type TransferSchemaInput = TypeOf<typeof TransferSchema>;