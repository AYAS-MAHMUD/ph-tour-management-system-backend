import { Request, Response } from "express";
import asyncHandler from "../../../utils/asyncHandler";
import { sendResponse } from "../../../utils/sendResponse";
import { authServices } from "./auth.service";

const credentialLogin = asyncHandler(
    async(req:Request, res : Response)=>{
        const users = await authServices.credentialLogin(req.body);
        sendResponse(res, {
            statusCode : 200,
            success : true,
            message : "User Login successfully",
            data : users
        })
        
    }
)


export const authController = {
    credentialLogin,
}