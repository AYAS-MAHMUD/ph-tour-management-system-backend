import { generateAccessToken } from "../../../utils/jwt";
import { IUser } from "../users/user.interface"
import { User } from "../users/user.model";
import bcrypt from "bcryptjs";
const credentialLogin = async (payload : Partial<IUser>)=>{
    const {email , password} = payload;
    const isEmailExit = await User.findOne({email});
    if(!isEmailExit){
        throw new Error("User Not Found");
    }
    const isPassdMatch = await bcrypt.compare(password as string , isEmailExit.password as string)
    if(!isPassdMatch){
        throw new Error("Invalid Credentials");
    }
    const jwtPayload = {
        userId : isEmailExit._id,
        email : isEmailExit.email,
        role : isEmailExit.role
    }
    const accessToken = generateAccessToken(jwtPayload)
    return {accessToken};
}


export const authServices = {
    credentialLogin,
}