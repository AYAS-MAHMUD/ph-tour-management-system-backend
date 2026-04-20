import { Types } from "mongoose";

export enum Role {
    SUPER_ADMIN = 'super_admin',
    ADMIN = 'admin',
    USER = 'user',
    GUIDE = 'guide'
}
export interface IAuthProvider {
    providerId : string;        // google / credential
    provider : string;
}

export enum isActive {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    BLOCKED = 'BLOCKED'
}
export interface IUser {
    name : string;
    email : string;
    password? : string;
    phone ?: string;
    picture ?: string;
    address ?: string;
    isDeleted ?: boolean;
    isActive ?: boolean;
    isVarified ?: boolean;
    auth : IAuthProvider[];
    role : Role;
    bookings ?: Types.ObjectId[];
    guides ?: Types.ObjectId[];

}