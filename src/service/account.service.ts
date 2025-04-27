import { FilterQuery, startSession } from "mongoose";

import AccountModel, { AccountDocument } from "../models/account.model";
import log from "../utils/logger";


export async function createAccount(userId: string, balance: number) {
    const account =  await AccountModel.create({ userId, balance });

    return account;
}

export async function getAccountBalance(query: FilterQuery<AccountDocument>) {
    return AccountModel.findOne(query).lean();
}


interface fundTransferReturnObject {
    success: boolean;
    lowFunds:boolean;
    senderAccountNotFound: boolean; 
    invalidReceiverAccount: boolean;
}

export async function fundTransfer({ 
        to,
        amount,
        userId
    }: {
         to: string,
        amount: number
        userId: string
    }
): Promise<fundTransferReturnObject> {
    const session = await startSession();
    session.startTransaction();
    try {
        const senderAccount = await AccountModel.findOne({ userId }).session(session);
        
        if(!senderAccount){
            await session.abortTransaction();
            return {
                success:false,
                lowFunds:false,
                senderAccountNotFound: true,
                invalidReceiverAccount:false
            }
        }

        if(senderAccount.balance < amount) {
            await session.abortTransaction();
            return {
                success: false,
                lowFunds: true,
                senderAccountNotFound: false,
                invalidReceiverAccount:false
            }
        }

        const receiverAccount = await AccountModel.findOne({ userId: to }).session(session);

        if(!receiverAccount) {
            await session.abortTransaction();
            return {
                success: false,
                lowFunds: false,
                senderAccountNotFound: false,
                invalidReceiverAccount:true
            }
        }

        senderAccount.balance -= amount;
        receiverAccount.balance += amount;

        await senderAccount.save({ session });
        await receiverAccount.save({ session });

        await session.commitTransaction()

        return {
            success: true,
            lowFunds: false,
            senderAccountNotFound: false,
            invalidReceiverAccount: false
        }
        
    } catch(error: any) {
        session.abortTransaction();
        log.error(error.message)
        return{
            success: false,
            lowFunds: false,
            senderAccountNotFound: false,
            invalidReceiverAccount: false
        }

    } finally {
        session.endSession();
    }

}