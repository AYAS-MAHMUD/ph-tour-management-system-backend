import { Request, Response } from "express";
import asyncHandler from "../../../utils/asyncHandler";
import { userService } from "./user.service";
import { sendResponse } from "../../../utils/sendResponse";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../../config";

// const user = await User.create({name,email,auth : [{provider : 'credential', providerId : email}]})

const createUser = asyncHandler(
    async (req:Request , res : Response)=>{
    // const {name , email} = req.body;
    const user = await userService.createuser(req.body);
    res.status(201).json({
        success : true,
        message : "User created successfully",
        data : user 
    })
    }
)
const updateUser = asyncHandler(
    async (req:Request , res : Response)=>{

    const token = req.headers.authorization as string;
    const decodedtoken = jwt.verify(token,config.jwt_access_secret as string) as JwtPayload;
    const payload = req.body;
    const user = await userService.updateUser(req.params.id as string,payload, decodedtoken);
    res.status(200).json({
        success : true,
        message : "User updated successfully",
        data : user 
    })
    }
)

const getAllUsers = asyncHandler(
    async(req:Request, res : Response)=>{
        const users = await userService.getAllUsers();
        // res.status(200).json({
        //     success : true,
        //     message : "User retrieved successfully",
        //     data : users 
        // })
        sendResponse(res, {
            statusCode : 200,
            success : true,
            message : "User retrieved successfully",
            meta : users.meta,
            data : users.user,
        })
        
    }
)




export const userController = {
    createUser,getAllUsers,updateUser
}