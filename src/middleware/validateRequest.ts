import { AnyZodObject } from "zod"; 
import { Request, Response, NextFunction } from "express";

import log from "../utils/logger";

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.firstName);
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
        return;
    } catch(error: any) {
        log.error(`Request Validation failed  ErrMsg:- ${error.message}`);
        res.status(400).send(error.message);
        return;
    }
}