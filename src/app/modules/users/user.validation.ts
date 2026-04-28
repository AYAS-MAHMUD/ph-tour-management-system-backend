import z from "zod";



export const createUserValidation = z.object({
        body : z.object({
                name : z.string().min(2).max(50),
                email : z.string().email(),
                password: z.string().min(8),
                phone : z.string().optional(),
                picture : z.string().optional(),
                address : z.string().max(200,{message : "Address can't excend 200 character"}).optional(),
        })

})