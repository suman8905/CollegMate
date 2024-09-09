const User = require("../models/User");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

exports.auth = async (req, res, next) => {
    try {
        //console.log("Printing token in middleware cokkies", req.cookies);

        const token =
            req.cookies.token ||
            req.body.token || req.headers['authorization']?.split(" ")[1] ;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing",
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            //console.log("Decoded Token:", decoded);
            next();
        } catch (error) {
            console.error("Error verifying token:", error);
            return res.status(401).json({
                message: "Token is invalid",
                success: false,
            });
        }
    } catch (error) {
        console.error("Error in auth middleware:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
};
