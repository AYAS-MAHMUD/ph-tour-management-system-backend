import { model, Schema } from "mongoose";
import { IDivision } from "./division.interface";



const divisionModel = new Schema<IDivision>({
    name : {type : String, required : true , unique : true},
    slug : {type : String , unique : true, required : true},
    thumbnail : {type : String},
    description : {type : String}
},{
    timestamps : true,
    versionKey : false
})



export const Division = model<IDivision>('Division',divisionModel)
