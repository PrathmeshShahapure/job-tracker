import jwt from "jsonwebtoken";
import "dotenv/config"
export const authMiddleware = async (req, res, next) => {
    try {
         const authHeader = req.headers.authorization;
         if (!authHeader) {
           return res
             .status(401)
             .json({ message: "Authentication Required !!!" });
         }
         const [sch, token] = authHeader.split(" ");
         if (sch !== "Bearer" || !token) {
           return res.status(401).json({ message: "Invalid Token !!!" });
         }

         const verified = jwt.verify(token, process.env.JWT_KEY);

      
        req.user = verified;
        console.log(req.user);
         next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Invalid or expired token" });
    }
   
}