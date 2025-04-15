import { Router } from "express";
import { User } from "../db/index.js";

import validateInput from "../inputvalidation/signupValidationMiddleware.js";

const router = Router();
router.use(validateInput);

router.post('/signup', async (req, res) => {
    const {username, firstName, lastName, password } = req.body;

    try{
        const user = await User.create({
            username,
            firstName,
            lastName,
            password
        })
        console.log(user);
        res.send('ok');
    } catch(error) {
        console.log(error);

    }
    
});

export default router;