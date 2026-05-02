import { Types } from "mongoose";

export interface ITourType{
    name : string
}

export interface ITour{
    title : string;
    slug : string;
    description? : string;
    image? : string[];
    location ?: string;
    costFrom?:number;
    startDate? : Date;
    endDate ?: Date
    includes?: string[];
    excludes?: string[];
    itinerary?: string[];
    tourPlan : string[];
    maxGuests ?: number;
    minAge ?: number;
    division : Types.ObjectId;
    tourType : Types.ObjectId;

}