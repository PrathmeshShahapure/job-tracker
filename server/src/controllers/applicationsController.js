import pool from "../../db/index.js";
export const getApplications = async (req, res) => {
  try {
    const { search: searchq, sort: sortq, status: statusq, order: orderq, page: pageq, limit: limitq } = req.query;
    console.log(searchq, sortq, pageq, statusq);
    const userID = req.user.userId;
    console.log(userID);

    let Query = `select * from applications where user_id=$1`
    let values=[userID]

    if (searchq) { 
      values.push(`%${searchq}%`);
      Query += ` and ( company_name ilike  $${values.length} 
                 or    job_title ilike  $${values.length})`;
    }

    if (statusq) { 
      values.push(statusq);
      Query += ` and ( status = $${values.length} )`;
    }
    
    const allowedSortColumns = [
      "company_name",
      "job_title",
      "status",
      "applied_at",
      "created_at",
    ];

    if (sortq && allowedSortColumns.includes(sortq)) {
      Query += ` ORDER BY ${sortq}`;
    }

     const page = Number(pageq) || 1;
     const limit = Number(limitq) || 10;

     const offset = (page - 1) * limit;

     Query += `
      LIMIT $${values.length + 1}
      OFFSET $${values.length + 2}
    `;

     values.push(limit, offset);

     console.log(Query);
    console.log(values);
    
    const result = await pool.query(Query, values);
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.log(error)
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
      [appId, userID],
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

export const deleteApplications = async (req, res) => {
  try {
    const { id: appId } = req.params;
    const userID = req.user.userId;
    console.log(appId);
    console.log(userID);
    const isAppPresen = await pool.query(
      "select * from applications where id=$1 and user_id=$2",
      [appId, userID],
    );
    if (isAppPresen.rowCount == 0) {
      return res
        .status(404)
        .json({ message: "Unable to find the Application" });
    }

    const result = await pool.query(
      "delete  from applications where user_id=$1 and id=$2",
      [userID, appId],
    );
    res.status(200).json({ message: "Application Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went Wrong " });
  }
};
