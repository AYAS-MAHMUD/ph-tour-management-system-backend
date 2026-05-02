
import { Router } from "express";
import { TourController } from "./tour.controller";




const router = Router()


router.post("/create-tour-type",TourController.createTourType)
router.get("/tour-types",TourController.getAllTourType)
router.patch("/tour-types/:id",TourController.updateTourType)
router.delete("/tour-types/:id",TourController.deleteTourType)



router.post("/create",TourController.createTour)
router.get("/tour",TourController.getAllTour)
router.patch("/:id",TourController.updateTour)
router.delete("/:id",TourController.deleteTour)

export const tourRouter = router