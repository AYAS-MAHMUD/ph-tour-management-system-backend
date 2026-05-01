import { IDivision } from "./division.interface";
import { Division } from "./division.model"



const CreateDivision =async (payload : Partial<IDivision>)=>{
    const data = await Division.create(payload);
    return data
}
const updateDivision =async (id : string,payload : Partial<IDivision>)=>{
    const data = await Division.findByIdAndUpdate(id, payload, {new : true});
    return data
}
const deleteDivision =async (id : string)=>{
    const data = await Division.findByIdAndDelete(id);
    return data
}
const getAllDivision =async ()=>{
    const data = await Division.find();
    return data
}



export const divisionService = {
    CreateDivision,getAllDivision,updateDivision,deleteDivision
}


// {
//         name : payload.name,
//         slug : payload.slug,
//         thumbnail : payload.thumbnail,
//         description : payload.description
//     }