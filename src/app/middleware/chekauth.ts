import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";


export const checkauth = (...roles:string[])=> async (req:Request,res : Response, next : NextFunction)=>{

    try {
        const accessToken = req.headers.authorization;
        if(!accessToken){
            throw new Error("No Token Recieved")
        }
        const verifiedToken = jwt.verify(accessToken , config.jwt_secret as string)
        // console.log(verifiedToken)
        if (!roles.includes(((verifiedToken as JwtPayload).role))) {
            throw new Error("Unauthorized Access")
        
        }
        next()
    } catch (error) {
        next(error)
    }
}