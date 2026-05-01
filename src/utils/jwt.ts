import jwt,{ JwtPayload, SignOptions } from "jsonwebtoken";
// import { config } from "../app/config";


export const generateToken = (payload : JwtPayload,secret: string,expire : string)=>{
    const accessToken = jwt.sign(payload,secret,{
        expiresIn : expire
    } as SignOptions)
    return accessToken;
}