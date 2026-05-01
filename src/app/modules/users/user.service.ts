
import { JwtPayload } from "jsonwebtoken";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model"
import bcrypt from "bcryptjs";


const createuser = async(payload : Partial<IUser>)=>{
    const {email ,password, ...rest} = payload;
    const isEmailExit = await User.findOne({email});
    if(isEmailExit){
        throw new Error("User Already Exiting");
    }
    const hashedPassword = await bcrypt.hash(password as string,10)
// console.log("hashed ",hashedPassword)
// const isPassdMatch = await bcrypt.compare(password as string, hashedPassword)
// console.log(isPassdMatch)
    const authProvider : IAuthProvider = {provider : "credentials" , providerId : email as string}
    const user = await User.create({
        email,
        password : hashedPassword,
        auth : [authProvider],
        ...rest
    })
    return user;
}
const getAllUsers = async()=>{
    const users = await User.find();
    const meta = await User.countDocuments();
    return {
        user : users,
        meta : {
            total : meta
        }
    };
}


const updateUser = async(userId : string, payload : Partial<IUser>, decodedtoken : JwtPayload)=>{

    /*
       1. Email can't be changed
       2. user will change name , phone , address , picture
       3. Only admin and super admin can change role and isActive status
       4. Password  - re hashing
    */
   if(payload.role){
    if(decodedtoken.role === Role.USER || decodedtoken.role === Role.GUIDE){
        throw new Error("Only Admin and Super Admin can change role")
    }
   }

    if(payload.password){
        const hashedPassword = await bcrypt.hash(payload.password as string, 10);
        payload.password = hashedPassword;
    }

    const updateUserdata = await User.findByIdAndUpdate(userId,payload,{new : true});
    return updateUserdata;

}
export const userService = {
    createuser,getAllUsers,updateUser
}