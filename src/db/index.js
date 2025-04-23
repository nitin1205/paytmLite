import mongoose from 'mongoose';
import 'dotenv/config';
import User from './user.js';


try {
    await mongoose.connect(process.env.DB);
    console.log('connected to db')
  } catch (error) {
    console.log(error);
  }

  export { User };