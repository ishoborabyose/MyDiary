import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
export const getId = (token) =>{
    const userId = jwt.verify( token, process.env.MY_SECRET )
    return userId.id
}
