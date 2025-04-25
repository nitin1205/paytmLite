import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
    body: object({
        username: string({
            required_error: 'Username is required'
        }).email('Valid email is required')
        .min(3, 'Username too short -- should be atleast 3 characters')
        .max(30, 'Username too long -- should be atlesat 30 characters'),
        password: string({
            required_error: 'Password is required'
        }).min(6, 'Password too short -- should be atleast 6 characters'),
        firstName: string({
            required_error: 'FirstName is required'
        }).max(50, 'FirstName too long -- should be atmost 50 characters'),
        lastName: string({
            required_error: 'Lastname is required'
        }).max(50, 'Lastname too long -- should be atmost 50 characters')
    }),
});

export type createUserInput = TypeOf<typeof createUserSchema>;

export const userSignInSchema = object({
    body: object({
        username: string({
            required_error: 'Username is required'
        }).email('Invalid Email'),
        password: string({
            required_error: 'Password is required'
        })
    })
});

export type userSignInUserInput = TypeOf<typeof userSignInSchema>