import { z } from "zod"

export const registerSchema = z.object({ 
    email: z.string().email(),
    password:z.string().min(4,("Password length is too small "))
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().max(4, "Password is not correct")
})