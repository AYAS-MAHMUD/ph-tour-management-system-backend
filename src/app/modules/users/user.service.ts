
import { IAuthProvider, IUser } from "./user.interface";
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
export const userService = {
    createuser,getAllUsers,
}