
import { createUserTokens } from "../../../utils/userTokens";
import { config } from "../../config";
import { IUser } from "../users/user.interface"
import { User } from "../users/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
    const jwtPayload = createUserTokens(isEmailExit);
    //     userId : isEmailExit._id,
    //     email : isEmailExit.email,
    //     role : isEmailExit.role
    // }
    // const accessToken = generateToken(jwtPayload,config.jwt_access_secret as string , config.jwt_access_expires_in as string);
    // const refreshToken = generateToken(jwtPayload,config.jwt_refresh_secret as string , config.jwt_refresh_expires_in as string);
    // delete isEmailExit.password;
    return {accessToken : jwtPayload.accessToken, refreshToken : jwtPayload.refreshToken, user : isEmailExit};
}


const getNewAccessToken = async (refreshToken : string)=>{
    const verifiedToken = jwt.verify(refreshToken , config.jwt_refresh_secret as string)
    const isUserExit = await User.findOne({email : (verifiedToken as jwt.JwtPayload).email})
    if(!isUserExit){
        throw new Error("User Not Found");
    }
    if(isUserExit.isDeleted){
        throw new Error("User is Deleted");
    }

    const jwtPayload = createUserTokens(isUserExit);
    return {accessToken : jwtPayload.accessToken}

}



export const authServices = {
    credentialLogin,getNewAccessToken
}