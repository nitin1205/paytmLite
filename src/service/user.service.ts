import { omit } from 'lodash'

import UserModel, { UserInput } from "../models/user.model";

export async function createUser(input: UserInput) {
    try{
        const user = await UserModel.create(input);
        return omit(user.toJSON(), 'password');
    } catch(error:any){
        throw new Error(error);
    }
}

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

    return omit(user.toJSON(), 'password');
};