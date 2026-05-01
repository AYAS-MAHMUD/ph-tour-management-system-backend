
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model"





const createTourType = async (payload : ITourType)=>{

    const data = await TourType.create(payload);
    return data;

}
const getAllTourType = async ()=>{

    const data = await TourType.find();
    return data;

}
const updateTourType = async (id: string, payload: Partial<ITourType>)=>{

    const data = await TourType.findByIdAndUpdate(id , payload , {new : true});
    return data;

}
const deleteTourType = async (id : string)=>{
// console.log(id)
    const data = await TourType.findByIdAndDelete(id);
    return data;

}



// TOUR API HERE

const createTour = async (payload : ITour)=>{

    const data = await Tour.create(payload);
    return data;

}

const getAllTour = async (query : Record<string,string>)=>{
    const filter = query;
    const searchTerm = query.searchTerm || "";
    
    const searchableField = ["title","description","location"];
    const serchArray = searchableField.map(f=>({[f] : {$regex : searchTerm, $options : "i" }}));

    const data = await Tour.find({
        // title : {$regex : query.title ? query.title : "", $options : "i"},
        $or : serchArray

    });
    const totalTour = await Tour.countDocuments();
    return {
        data : data,
        meta : {
            total : totalTour
        }
    };

}

const updateTour = async (id : string,payload : Partial<ITour>)=>{
     payload.slug = payload.title?.toLowerCase().split(" ").join("-")
    const data = await Tour.findByIdAndUpdate(id , payload, {new : true});
    return data;

}
const deleteTour = async (id : string)=>{

    const data = await Tour.findByIdAndDelete(id);
    return data;

}



export const tourService = {
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType,


    createTour,
    getAllTour,
    updateTour,
    deleteTour
}