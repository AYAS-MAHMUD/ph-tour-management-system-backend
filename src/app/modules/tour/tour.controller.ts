import { Request, Response } from "express";
import asyncHandler from "../../../utils/asyncHandler";
import { tourService } from "./tour.service";



const createTourType  = asyncHandler(
        async(req : Request, res : Response )=>{
        const result = await tourService.createTourType(req.body);
        // console.log(result)
        res.status(201).json({
            success : true,
            message : "createTourType create successfully",
            data : result

        })
    }
)

const getAllTourType  = asyncHandler(
        async(req : Request, res : Response )=>{
        const result = await tourService.getAllTourType();
        res.status(201).json({
            success : true,
            message : "getAll Tour types successfully",
            data : result

        })
    }
)
const updateTourType  = asyncHandler(
        async(req : Request, res : Response )=>{
        const result = await tourService.updateTourType(req.params.id as string , req.body);
        res.status(201).json({
            success : true,
            message : "Update tour type successfully",
            data : result

        })
    }
)
const deleteTourType  = asyncHandler(
        async(req : Request, res : Response )=>{
            const {id} = req.params as {id : string}
        const result = await tourService.deleteTourType(id);
        res.status(201).json({
            success : true,
            message : "delete Tour types successfully",
            data : result

        })
    }
)



// TOUR API HERE
const createTour  = asyncHandler(
        async(req : Request, res : Response )=>{
        const result = await tourService.createTour(req.body);
        // console.log(result)
        res.status(201).json({
            success : true,
            message : "Tour create successfully",
            data : result

        })
    }
)
const getAllTour  = asyncHandler(
        async(req : Request, res : Response )=>{
            const query = req.query;
        const result = await tourService.getAllTour(query as  Record<string,string>);
        // console.log(result)
        res.status(201).json({
            success : true,
            message : "Tour Reterive successfully",
            data : result

        })
    }
)
const updateTour  = asyncHandler(
        async(req : Request, res : Response )=>{
        const {id} = req.params as {id : string}
        const result = await tourService.updateTour(id,req.body);
        // console.log(result)
        res.status(201).json({
            success : true,
            message : "Tour Reterive successfully",
            data : result

        })
    }
)
const deleteTour  = asyncHandler(
        async(req : Request, res : Response )=>{
        const {id} = req.params as {id : string}
        const result = await tourService.deleteTour(id);
        // console.log(result)
        res.status(201).json({
            success : true,
            message : "Tour Delete successfully",
            data : result

        })
    }
)

export const TourController = {
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType,


    createTour,
    getAllTour,
    updateTour,
    deleteTour

}