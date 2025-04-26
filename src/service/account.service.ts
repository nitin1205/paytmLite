import { FilterQuery } from "mongoose";

import AccountModel, { AccountDocument } from "../models/account.model";

export async function createAccount(userId: string, balance: number) {
    const account =  await AccountModel.create({ userId, balance });

    return account;
}

export async function getAccountBalance(query: FilterQuery<AccountDocument>) {
    return AccountModel.findOne(query).lean();
}