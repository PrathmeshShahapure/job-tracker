import pool from "../../db/index.js";
export const getApplications = async (req, res) => {
  try {
    const userID = req.user.userId;
    console.log(userID);

    const result = await pool.query(
      "select * from applications where user_id=$1",
      [userID],
    );

    res.status(200).json({ data: result.rows });
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong " });
  }
};

export const createApplications = async (req, res) => {
  try {
      const userID = req.user.userId;
      const { company_name,job_title,location,status,applied_at,notes} =req.body;
    console.log(userID);

    const result = await pool.query(
      "insert into applications (user_id,company_name,job_title,location,status,applied_at,notes) values($1,$2,$3,$4,$5,$6,$7) returning * ",
      [userID, company_name, job_title, location, status, applied_at, notes],
    );

    res.status(201).json({ data: result.rows[0] });
  } catch (error) {
      console.log(error)
    return res.status(500).json({ message: "Something went Wrong " });
  }
};