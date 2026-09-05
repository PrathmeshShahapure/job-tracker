import bcrypt from "bcrypt";
import pool from "../../db/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { registerSchema, loginSchema } from "../schema/auth.schema.js";
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { success, error } = registerSchema.safeParse(req.body);

    if (!success) {
      console.log(error.issues[0].message);
      return res.status(400).json({ message: error.issues[0].message });
    }
    const getEmailCount = await pool.query(
      "select * from users where email=$1",
      [email],
    );

    if (getEmailCount.rows.length > 0) {
      console.log("Email alreaady Exist");
      return res.status(400).json({ message: "Email alreaady Exist" });
    }
    const passwordH = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "insert into users(email,password_hash) values($1,$2) RETURNING id ",
      [email, passwordH],
    );

    const token = jwt.sign({ userId: result.rows[0].id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });
    res.status(201).json({
      token,
      message: "Registration is Successfull",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { success, error } = loginSchema.safeParse(req.body);
    if (!success) {
      console.log(error.issues[0].message);
      return res.status(400).json({ message: error.issues[0].message });
    }
    const isUserPresent = await pool.query(
      "select * from users where email=$1",
      [email],
    );
    if (isUserPresent.rows.length == 0) {
      return res.status(400).json({ message: "User not Found" });
    }
    const passwordH = isUserPresent.rows[0].password_hash;
    const isMatch = await bcrypt.compare(password, passwordH);
    if (isMatch === false) { 
      return res.status(400).json({ message: "Wrong Password !!!" });
    }


    const token = jwt.sign(
      { userId: isUserPresent.rows[0].id },
      process.env.JWT_KEY,
      { expiresIn: "1d" },
    );
    res.status(200).json({message:"login Successfull !!!",token})



  } catch (error) {
    console.log(error)
    return res.status(500).json("Something went wrong");
  }
};
