
import { User } from "../models/user.model";
import { users } from "../db/db";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
export const signup = async (req, res) => {

    if (!req.body.email || !req.body.password) {
        //bad request
        return res.status(400).json({
            status: 400,
            error: "Email and password are required"
        });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User(req.body.firstname, req.body.lastname, req.body.email, req.body.password, hashedPassword);

    users.push(user);

    const token = jwt.sign({ email: user.email }, process.env.MY_SECRET, { expiresIn: '2d' });

    return res.status(201).json({
        status: 201,
        message: "User created successfully",
        data: {
            user,
            token
        }

    });

}
