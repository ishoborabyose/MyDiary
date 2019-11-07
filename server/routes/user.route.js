import { Router } from "express";
import { signup, signin } from "../controllers/user.controller";
import { signupSchema, signinSchema } from "../middleware/validate.middleware";

const userRoute = Router();

userRoute.post("/auth/signup", signupSchema, signup);

userRoute.post( "/auth/signin", signinSchema, signin );

export default userRoute;
