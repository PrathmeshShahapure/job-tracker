import pg from "pg"
import "dotenv/config"

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export const textConnection = async() => { 
    try {
        await pool.query("select now()")
           console.log("connected Successfully !!!"); 
        
    } catch (error) {
       console.log(error.message) 
    }
}

export default pool;