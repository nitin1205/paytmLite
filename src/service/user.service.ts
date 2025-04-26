import { omit } from 'lodash'

import UserModel from "../models/user.model";
import { CreateUserInput, UserUpdateInput } from '../schema/user.schema';
import { FilterQuery, UpdateQuery } from 'mongoose';

export async function createUser(input: CreateUserInput['body']) {
    try{
        const user = await UserModel.create(input);
        return omit(user.toJSON(), 'password');
    } catch(error:any){
        throw new Error(error);
    }
};

export async function validatePassword(
    {
        username,
        password
    }: {
        username: string,
        password: string
    }
) {
    const user = await UserModel.findOne({ username }).exec();

    if(!user) return false;

    const isValid = await user.comparePassword(password);

    if(!isValid) return false;

    return omit(user.toJSON(), 'password');
};

export async function upadteUser(query: FilterQuery<UserUpdateInput['body']>,
     update: UpdateQuery<UserUpdateInput['body']>) {
        return UserModel.updateOne(query, update);
}

export async function getUsers(query: any) {
    return UserModel.find(query)
    .select('firstName lastName _id')
    .lean();
}