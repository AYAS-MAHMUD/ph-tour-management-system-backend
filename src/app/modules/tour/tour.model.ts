import { model, Schema } from "mongoose";
import { ITour, ITourType } from "./tour.interface";
import slugify  from "slugify";

const tourTypeSchema = new Schema<ITourType>({
    name : {type : String , required : true, unique : true}
},{
timestamps : true
})

export const TourType = model<ITourType>("TourType",tourTypeSchema);


const tourSchema = new Schema<ITour>({
    title : {type : String, required : true},
    slug : {type : String, unique : true},
    description : {type : String},
    image: {type : [String] , default : []},
    location : {type : String},
    costFrom: {type : Number},
    startDate : {type : Date},
    endDate : {type : Date},
    includes: {type : [String] , default : []},
    excludes: {type : [String] , default : []},
    itinerary: {type : [String] , default : []},
    tourPlan : {type : [String] , default : []},
    maxGuests : {type : Number},
    minAge : {type : Number},
    division : {
        type : Schema.Types.ObjectId,
        ref : "Division",
        required : true
    },
    tourType : {
        type : Schema.Types.ObjectId,
        ref : "TourType",
        required : true
    }
},{
    timestamps : true,
    versionKey : false
})


tourSchema.pre("save",function(){
    this.slug = slugify(this.title,{
        lower : true,
        strict : true
    })
})
export const Tour = model<ITour>("Tour",tourSchema)