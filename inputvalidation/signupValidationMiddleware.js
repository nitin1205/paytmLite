
import { z } from 'zod';

const validateInput = (req, res, next) => {
    const validUsername = z.string().email().min(3).max(60).trim();
    const validFirtName = z.string().max(50).trim();
    const validLastName = z.string().max(50).trim();
    const validPassword = z.string().min(8);
    const { username, firtName, lastname, password} = req.body;

    try {
        validUsername.parse(username);
        validFirtName.parse(firtName);
        validLastName.parse(lastname);
        validPassword.parse(password);
        next()
    } catch(error) {
        console.log(error);
        res.status(403).json({ msg: 'Invalid input' });
    }
} 


export default validateInput;