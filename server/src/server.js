import "dotenv/config"
import app from "./app.js";
import { textConnection } from "../db/index.js";

const PORT = process.env.PORT
textConnection();
app.listen(PORT, () => { 
    console.log(`app is running on port http://localhost:${PORT}`)
})