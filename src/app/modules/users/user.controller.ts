import { Request, Response } from "express";
import asyncHandler from "../../../utils/asyncHandler";
// import { User } from "./user.model";
import { userService } from "./user.service";
import { sendResponse } from "../../../utils/sendResponse";



// const user = await User.create({name,email,auth : [{provider : 'credential', providerId : email}]})

const createUser = asyncHandler(
    async (req:Request , res : Response)=>{
    const {name , email} = req.body;
    const user = await userService.createuser(name , email);
    res.status(201).json({
        success : true,
        message : "User created successfully",
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
    createUser,getAllUsers,
}