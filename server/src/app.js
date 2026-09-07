import express from "express"
import cors from "cors"
import authRouter from "./routes/authRoutes.js"
import applicationsRouter from "./routes/applicationsRouter.js"
import { authMiddleware } from "./middleware/authMiddleware.js"
//import { errorMiddleware } from "./middleware/errorMiddleware.js";
const app = express()
app.use(cors())
app.use(express.json())

app.get('/health', (req,res) => { 
    res.json("I am ALIVE")
})

app.use('/api/auth',authRouter)
app.use('/api/applications', authMiddleware, applicationsRouter)
//app.use(errorMiddleware)
export default app
