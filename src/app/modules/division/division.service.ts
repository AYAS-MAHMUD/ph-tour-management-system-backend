import { IDivision } from "./division.interface";
import { Division } from "./division.model"



const CreateDivision =async (payload : Partial<IDivision>)=>{

    const existingDivision = await Division.findOne({name : payload.name});
    if(existingDivision){
        throw new Error("Division with this name already exists")
    }
    const data = await Division.create(payload);
    return data
}
const updateDivision =async (id : string,payload : Partial<IDivision>)=>{
    const existingDivision = await Division.findById(id);
    if(!existingDivision){
        throw new Error("Division not found");
    }
    const data = await Division.findByIdAndUpdate(id, payload, {new : true});
    return data
}
const deleteDivision =async (id : string)=>{
      const existingDivision = await Division.findById(id);
    if(!existingDivision){
        throw new Error("Division not found");
    }
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