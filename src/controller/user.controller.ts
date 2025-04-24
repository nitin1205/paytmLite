import { RequestHandler, Request, Response } from "express";

import { createUser } from "../service/user.service";
import log from "../utils/logger";
import { createUserInput } from "../schema/user.schema";

export const createUserHandler: RequestHandler = async(req: Request<{}, {}, createUserInput['body'] >, res: Response) => {
    try {
        const user = await createUser(req.body);
        res.status(201).send(user);
        return;
    } catch(error: any) {
        log.error(error.message)
        res.status(409).send(error.message);
        return;
    }
};