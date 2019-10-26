import { Router } from "express";
import { signin, signup } from "../controllers/user.controller";
import { validate } from'../middleware/validate.middleware';

const userRoute = Router();

userRoute.post('/auth/signup', validate, signup);

userRoute.post('/auth/signin',validate, signin);

export default userRoute;