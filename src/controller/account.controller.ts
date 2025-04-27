import {  Request, Response, RequestHandler } from "express";

import { fundTransfer, getAccountBalance } from "../service/account.service";
import { TransferSchemaInput } from "../schema/account.schema";

export const getAccountBalanceHandler: RequestHandler = async(req: Request, res: Response): Promise<void> => {
    const userId = req.userId;
    const UserAccount = await getAccountBalance({ userId });

    res.status(200).json({ balance: UserAccount?.balance });
} 

export const fundTransferHandler: RequestHandler = async(req: Request<{}, {}, TransferSchemaInput['body']>, res: Response): Promise<void> => {
    const result = await fundTransfer({ ...req.body, userId: req?.userId  as unknown as string });
    if(result.senderAccountNotFound) {
        res.status(400).json({ message: `Sender's account not found` });
        return;
    }

    if(result.lowFunds) {
        res.status(400).json({ message: 'Insufficient funds'});
        return;
    }

    if(result.invalidReceiverAccount) {
        res.status(400).json({ message: 'Invalid account' });
        return;
    }

    if(result.success) {
        res.status(200).json({ message: 'Transfer successfull' })
        return
    }

    if(!result.success && !result.invalidReceiverAccount && !result.lowFunds && !result.senderAccountNotFound) {
        res.status(500).json({ message: 'Transaction failed' });
        return;
    }
} 