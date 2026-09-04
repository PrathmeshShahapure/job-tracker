import "dotenv/config"
import app from "./app.js";

const PORT = process.env.PORT

app.listen(PORT, () => { 
    console.log(`app is running on port http://localhost:${PORT}`)
})