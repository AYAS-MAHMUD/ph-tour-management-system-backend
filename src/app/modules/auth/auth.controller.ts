import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../../utils/asyncHandler";
import { sendResponse } from "../../../utils/sendResponse";
import { authServices } from "./auth.service";
import passport from "passport";
import { createUserTokens } from "../../../utils/userTokens";
import { config } from "../../config";

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
const logout = asyncHandler(
    async(req:Request, res : Response)=>{
        res.clearCookie("refreshToken",{
            httpOnly : true,
            secure : false,
            sameSite : "lax"
        });
        res.clearCookie("accessToken",{
            httpOnly : true,
            secure : false,
            sameSite : "lax"
        });
        sendResponse(res, {
            statusCode : 200,
            success : true,
            message : "User logged out successfully",
            data : null
        })
        
    }
)

const resetPassword = asyncHandler(
    async(req : Request, res : Response)=>{
        const decodedToken = req.user;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        // console.log("asdfasdfsdf",decodedToken)
        if(!decodedToken){
            throw new Error("Unauthorized Access");
        }
        const newpasswordinfo = await authServices.resetPassword(oldPassword, newPassword,decodedToken);

        sendResponse(res, {
            statusCode : 200,
            success : true,
            message : "User password reset successfully",
            data : newpasswordinfo
        })
    }
)
const googleLogin = asyncHandler(
    async(req:Request, res : Response , next : NextFunction)=>{
        passport.authenticate("google" , {scope : ["profile","email"]})(req,res,next)
    }
)
const googleLoginCallback = asyncHandler(
    async(req:Request, res : Response)=>{
        const user = req.user;
        console.log("user : ",user)
        if(!user){
            throw new Error("Google Authentication Failed");
        }
        const tokenInfo = createUserTokens(user);
        res.cookie("refreshToken", tokenInfo.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });
        res.cookie("accessToken", tokenInfo.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });
        res.redirect(config.frontend_url as string);
        // sendResponse(res, {
        //     statusCode: 200,
        //     success: true,
        //     message: "Google Login successful",
        //     data: tokenInfo
        // });
    }
)


export const authController = {
    credentialLogin,getNewAccessToken,logout,resetPassword,googleLogin,googleLoginCallback
}