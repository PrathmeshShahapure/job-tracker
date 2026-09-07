import { z } from "zod"

export const registerSchema = z.object({ 
    email: z.string().email(),
    password:z.string().min(4,("Password length is too small "))
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().max(4, "Password is not correct")
})

export const appSchema = z.object({
    company_name: z.string(),
job_title:z.string(),
location:z.string(),
status:z.enum(['Applied','Interview','Offer','Rejected','Withdrawn']),
applied_at:z.coerce.date().optional(),
notes:z.string().optional()
})