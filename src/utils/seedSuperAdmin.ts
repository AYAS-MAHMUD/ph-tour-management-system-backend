import { config } from "../app/config";
import { IAuthProvider, IUser, Role } from "../app/modules/users/user.interface";
import { User } from "../app/modules/users/user.model";

import bcrypt from "bcryptjs";




export const seedSuperAdmin = async ()=>{
    try {
        // check if super admin already exists
        const isSuperAdminExists = await User.findOne({
            email : config.super_admin_email
        })
        if(isSuperAdminExists){
            console.log("✅ Super Admin already exists");
            return;
        }

        const hasedPassword = await bcrypt.hash(config.super_admin_password as string,10);
        const authProvider : IAuthProvider = {
            provider : "credentials",
            providerId : config.super_admin_email as string
        }
        const payload: IUser= {
            name : "Super Admin",
            email : config.super_admin_email as string,
            password : hasedPassword,
            role : Role.SUPER_ADMIN,
            isVarified : true,
            auth : [authProvider]

        }
        // create super admin 
        const superAdmin = await User.create(payload);
        console.log("✅ Super Admin created successfully");
        console.log(superAdmin.email);
        
        
    } catch (error) {
        console.error("❌ Failed to seed super admin:", error);
    }
}






















// // src/seed/superAdmin.ts
// import bcrypt from "bcrypt";
// import { config } from "../app/config";
// import { User } from "../app/modules/users/user.model";



// const seedSuperAdmin = async () => {
//   try {
//     // check if super admin already exists
//     const isSuperAdminExists = await User.findOne({
//       email: config.super_admin_email,
//     });

//     if (isSuperAdminExists) {
//       console.log("✅ Super Admin already exists");
//       return;
//     }

//     // hash password
//     const hashedPassword = await bcrypt.hash(
//       config.super_admin_password,
//       10
//     );

//     // create super admin
//     const superAdmin = await User.create({
//       name: "Super Admin",
//       email: config.super_admin_email,
//       password: hashedPassword,
//       role: "SUPER_ADMIN",
//     });

//     console.log("✅ Super Admin created successfully");
//     console.log(superAdmin.email);
//   } catch (error) {
//     console.error("❌ Failed to seed super admin:", error);
//   }
// };

// export default seedSuperAdmin;