
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
    const filter = {...query};

    const searchTerm = query.searchTerm || "";
    const sort = query.sort || "-createdAt";
    const field = query.fields || "";
    const select = field.split(",").join(" ");

    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (Number(page) - 1) * Number(limit);
    // delete filter.searchTerm;
    // delete filter.sort;
    const excludeFields = ["searchTerm","sort","fields"];
    excludeFields.forEach(f=>delete filter[f]);


    const searchableField = ["title","description","location"];

    const serchQuery = {
        $or : searchableField.map(f=>({[f] : {$regex : searchTerm, $options : "i" }}))

    }
    const data = await Tour.find(serchQuery).find(filter).sort(sort).select(`${select}`).limit(Number(limit)).skip(Number(skip));
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