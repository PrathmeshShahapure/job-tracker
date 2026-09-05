import pool from "../../db/index.js";
export const getApplications = async (req, res) => { 
    try {
          const userID = req.user.userId;
          console.log(userID);

          const result = await pool.query(
            "select * from applications where user_id=$1",
            [userID],
          );

        res.status(200).json({data:result.rows});
    } catch (error) {
                 return   res.status(500).json({ message: "Something went Wrong " });
    }
  
}