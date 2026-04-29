import jwt,{ JwtPayload, SignOptions } from "jsonwebtoken";
import { config } from "../app/config";


export const generateAccessToken = (payload : JwtPayload)=>{
    const accessToken = jwt.sign(payload,config.jwt_secret as string,{
        expiresIn : config.jwt_expires_in
    } as SignOptions)
    return accessToken;
}