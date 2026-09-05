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
    const { company_name, job_title, location, status, applied_at, notes } =
      req.body;
    console.log(userID);

    const result = await pool.query(
      "insert into applications (user_id,company_name,job_title,location,status,applied_at,notes) values($1,$2,$3,$4,$5,$6,$7) returning * ",
      [userID, company_name, job_title, location, status, applied_at, notes],
    );

    res.status(201).json({ data: result.rows[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went Wrong " });
  }
};

export const updateApplications = async (req, res) => {
  try {
    const { id: appId } = req.params;
    const userID = req.user.userId;
    console.log(appId);
    const { company_name, job_title, location, status, applied_at, notes } =
      req.body;
    console.log(userID);

    const isAppIdPresent = await pool.query(
      "select * from applications where id=$1 and user_id=$2",
      [appId,userID],
    );
    if (isAppIdPresent.rowCount == 0) {
      return res
        .status(404)
        .json({ message: "Unable to find the Application" });
    }
    const result = await pool.query(
      "update applications set company_name=$2,job_title=$3,location=$4,status=$5,applied_at=$6,notes=$7  where id=$8 and user_id=$1 returning * ",
      [
        userID,
        company_name,
        job_title,
        location,
        status,
        applied_at,
        notes,
        appId,
      ],
    );

    res.status(200).json({ data: result.rows[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went Wrong " });
  }
};
