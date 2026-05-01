import { config } from "../app/config";
import { IUser } from "../app/modules/users/user.interface";
import { generateToken } from "./jwt";



export const createUserTokens = (user : Partial<IUser>)=>{
        const jwtPayload = {
        userId : user._id,
        email : user.email,
        role : user.role
    }
    const accessToken = generateToken(jwtPayload,config.jwt_access_secret as string , config.jwt_access_expires_in as string);
    const refreshToken = generateToken(jwtPayload,config.jwt_refresh_secret as string , config.jwt_refresh_expires_in as string);
    return {accessToken, refreshToken}
}