import express from "express"

const app = express()
app.use(express.json())

app.get('/health', (req,res) => { 
    res.json("I am ALIVE")
})

export default app
