const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwt_secret = process.env.JWT_SECRET;


exports.authMiddleware = (req,res,next)=> {
    const token = req.header("x-auth-token");

    if(!token){
        return res.status(401).json({message: "No token , authorization denied"});
    }

    try {
        const decoded = jwt.verify(token,jwt_secret);
        req.user = decoded.user;
        // req.user = "66ffbcc690631bc30d9d6784";
        next();
    } catch (error) {
        res.status(401).json({message: "Token is not valid"});
    }
}