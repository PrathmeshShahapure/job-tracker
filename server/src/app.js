import express from "express"
import authRouter from "./routes/authRoutes.js"
import applicationsRouter from "./routes/applicationsRouter.js"
import { authMiddleware } from "./middleware/authMiddleware.js"
const app = express()
app.use(express.json())

app.get('/health', (req,res) => { 
    res.json("I am ALIVE")
})

app.use('/api/auth',authRouter)
app.use('/api/applications',authMiddleware,applicationsRouter)
export default app
