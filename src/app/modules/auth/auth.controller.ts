import { Request, Response } from "express";
import asyncHandler from "../../../utils/asyncHandler";
import { sendResponse } from "../../../utils/sendResponse";
import { authServices } from "./auth.service";

const credentialLogin = asyncHandler(
    async(req:Request, res : Response)=>{
        const users = await authServices.credentialLogin(req.body);

        res.cookie("refreshToken",users.refreshToken,{
            httpOnly : true,
            secure : true,

        })
        res.cookie("accessToken",users.accessToken,{
            httpOnly : true,
            secure : true,

        })
        sendResponse(res, {
            statusCode : 200,
            success : true,
            message : "User Login successfully",
            data : users
        })
        
    }
)
const getNewAccessToken = asyncHandler(
    async(req:Request, res : Response)=>{
        const refreshToken = req.cookies.refreshToken;
        const tokenInfo = await authServices.getNewAccessToken(refreshToken);

        sendResponse(res, {
            statusCode : 200,
            success : true,
            message : "User Refresh Token generated successfully",
            data : tokenInfo
        })
        
    }
)


export const authController = {
    credentialLogin,getNewAccessToken
}