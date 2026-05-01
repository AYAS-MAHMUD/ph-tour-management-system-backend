import { model, Schema } from "mongoose";
import { IAuthProvider, isActive, IUser, Role } from "./user.interface";

const authProviderSchema = new Schema<IAuthProvider>({
    providerId : {type : String, required : true},
    provider : {type : String, required : true}
        
},{
    _id : false,
    versionKey : false,
    timestamps : false
})

const userSchema = new Schema<IUser>({
    name : {type : String, required : true},
    email : {type : String , required : true, unique : true},
    password : {type : String},
    phone : {type : String},
    address : {type : String},
    picture : {type : String},
    isDeleted : {type : Boolean, default : false},
    isActive : {type : String, enum : Object.values(isActive), default : isActive.ACTIVE},
    isVarified : {type : Boolean, default : false},
    role : {type : String,enum : Object.values(Role), default : Role.USER},

    auth : [authProviderSchema],
    // bookings : [{type : Schema.Types.ObjectId, ref : 'Booking'}],
    // guides : [{type : Schema.Types.ObjectId, ref : 'Guide'}]
},{
    timestamps : true,
    versionKey : false
})


export const User = model<IUser>('User',userSchema)