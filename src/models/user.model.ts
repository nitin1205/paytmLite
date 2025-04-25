import { CallbackWithoutResultAndOptionalError, model, Schema, Types } from "mongoose";
import bcrypt from 'bcrypt';

import env from "../utils/env.utils";

interface User{
    password: string;
    firstName: string;
    lastName: string;
    createdAt?: Date;
    updatedAt?: Date; 
}

export interface UserDocument extends User {
    _id: Types.ObjectId;
    isModified(field: string): boolean;
    save(): Promise<UserDocument>;
    comparePassword(candidatePassword: string): Promise<boolean>;  
}

export type UserInput = Omit<UserDocument,
'_id' |
'createdAt' |
'updatedAt' |
'save' |
'isModified' |
'comparePassword'
>

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30 
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

userSchema.pre('save',async function(next: CallbackWithoutResultAndOptionalError) {
    let user = this as unknown as UserDocument;

    if(!user.isModified('password'))  return next();
    
    const salt = await bcrypt.genSalt(env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    return next();
});


userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    let user = this as UserDocument;
    return await bcrypt.compare(candidatePassword, user.password).catch(e => false); 
}; 

const UserModel = model<UserDocument>('User', userSchema);

export default UserModel;