import { model, Schema } from "mongoose";
import { UserDocument } from "./user.model";


export interface AccountDocument{
    _id: Schema.Types.ObjectId;
    userId: UserDocument['_id'];
    balance: number;
    createdAt?: Date;
    upadatedAt?: Date;
}

const accountSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance:{
        type: Number,
        required: true
    } 
}, 
{
    timestamps: true
})


const AccountModel = model<AccountDocument>('Account', accountSchema);

export default AccountModel;