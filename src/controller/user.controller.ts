import { RequestHandler, Request, Response  } from "express";

import { createUser, getUsers, upadteUser, validatePassword } from "../service/user.service";
import log from "../utils/logger";
import { CreateUserInput, UserSignInInput, UserUpdateInput } from "../schema/user.schema";
import { signJwt } from "../utils/jwt.utils";
import env from "../utils/env.utils";
import { createAccount } from "../service/account.service";

export const createUserHandler: RequestHandler = async(req: Request<{}, {}, CreateUserInput['body'] >, res: Response) => {
    try {
        const user = await createUser(req.body);
        await createAccount(user?._id as unknown as string, 1 + Math.random() * 10000);
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

export const userSignInHandler: RequestHandler = async(req: Request<{}, {}, UserSignInInput['body']>, res: Response): Promise<void> => {
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

export const updateUserHandler: RequestHandler = async(req: Request<{}, {}, UserUpdateInput['body']>, res: Response): Promise<void> => {
    const userId = req.userId;
    await upadteUser({ _id: userId }, { ...req.body })

    res.status(200).json({ 	message: 'Updated successfully' });
    return;
}

export const getUsersHandler: RequestHandler = async(req: Request, res: Response): Promise<void> => {
    const filter = req.query.filter as string;
    const query = filter ? {
        $or : [
            { firstName: { $regex: filter, $options: 'i' } },
            { lastName: { $regex: filter, $options: 'i' } }
        ]
    }
    : {};

    const users = await getUsers(query);

    res.status(200).json({ users });

    return;
}