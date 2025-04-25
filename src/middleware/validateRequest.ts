import { AnyZodObject } from "zod"; 
import { Request, Response, NextFunction } from "express";

import log from "../utils/logger";

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
        return;
    } catch(error: any) {
        log.error(`Request Validation failed  ErrMsg:- ${error}`);
        res.status(400).send(error.issues[0].message);
        return;
    }
}