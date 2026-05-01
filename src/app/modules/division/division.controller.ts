import { Request, Response } from "express";
import asyncHandler from "../../../utils/asyncHandler";
import { divisionService } from "./division.service";



const CreateDivision = asyncHandler(
    async(req : Request, res : Response )=>{
        const result = await divisionService.CreateDivision(req.body);
        // console.log(result)
        res.status(201).json({
            success : true,
            message : "Division create successfully",
            data : result

        })
    }
)
const updateDivision = asyncHandler(
    async(req : Request, res : Response )=>{
        const {id} = req.params as {id : string};
        const body = req.body;
        const result = await divisionService.updateDivision(id,body);
        // console.log(result)
        res.status(201).json({
            success : true,
            message : "Division update successfully",
            data : result

        })
    }
)
const deleteDivision = asyncHandler(
    async(req : Request, res : Response )=>{
        const {id} = req.params as {id : string};
        const result = await divisionService.deleteDivision(id);
        // console.log(result)
        res.status(201).json({
            success : true,
            message : "Division Deleted successfully",
            data : result

        })
    }
)
const getAllDivision = asyncHandler(
    async(req : Request, res : Response )=>{
        const result = await divisionService.getAllDivision();
        // console.log(result)
        res.status(200).json({
            success : true,
            message : "Division retrived successfully",
            data : result

        })
    }
)



export const divisionController = {
    CreateDivision,getAllDivision,updateDivision,deleteDivision
}