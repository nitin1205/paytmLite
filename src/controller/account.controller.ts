import {  Request, Response, RequestHandler } from "express";

import { getAccountBalance } from "../service/account.service";

export const getAccountBalanceHandler: RequestHandler = async(req: Request, res: Response): Promise<void> => {
    const userId = req.userId;
    const UserAccount = await getAccountBalance({ userId });

    res.status(200).json({ balance: UserAccount?.balance });
} 