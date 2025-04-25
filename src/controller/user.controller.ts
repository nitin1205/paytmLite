import { RequestHandler, Request, Response } from "express";

import { createUser, validatePassword } from "../service/user.service";
import log from "../utils/logger";
import { createUserInput, userSignInUserInput } from "../schema/user.schema";
import { signJwt } from "../utils/jwt.utils";
import env from "../utils/env.utils";

export const createUserHandler: RequestHandler = async(req: Request<{}, {}, createUserInput['body'] >, res: Response) => {
    try {
        const user = await createUser(req.body);
        const token = signJwt({
            ...user
        }, {
            expiresIn: env.TOKENLIFETIME
        });
        res.status(201).send({user, token});
        return;
    } catch(error: any) {
        log.error(error.message)
        res.status(409).send(error.message);
        return;
    }
};

export const userSignInHandler: RequestHandler = async(req: Request<{}, {}, userSignInUserInput['body']>, res: Response): Promise<void> => {
    const user = await validatePassword(req.body);
    if (!user) {
        res.status(411).send({ messaeg: "Error while logging in" });
        return;
    }

    if(user) {
        const token = signJwt({
            ...user
        }, {
            expiresIn: env.TOKENLIFETIME
        });

        res.json({ token })
        return;
    }
}