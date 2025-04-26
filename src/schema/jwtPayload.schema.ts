import { number, object, string } from "zod";

const JwtPayloadSchema = object({
    _id: string(),
    username: string().email(),
    firstName: string(),
    lastName: string(),
    __v: number(),
    iat: number(),
    exp: number()   
});

export default JwtPayloadSchema;