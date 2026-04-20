import { User } from "./user.model"



const createuser = async(name : string , email : string)=>{
    const user = await User.create({name , email})
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