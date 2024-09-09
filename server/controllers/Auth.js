const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();
exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        //validate details 
        if (!firstName || !lastName || !email || !password) {
            return res.status(403).json({
                success: "false",
                message: "Please fill all the necessary Details"
            })
        }

        //check user alreayd exist

        const exitstingUser = await User.findOne({ email })
        if (exitstingUser) {
            return res.status(400).json({
                success: "false",
                message: "User already exist with this mail id",
            })
        }

        // encypt the password

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,

        })
        return res.status(200).json({
            success: "true",
            message: "User created Successfully",
        })

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered, Please try again",
        })
    }
}
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(403).json({
          success: "false",
          message: "Please fill all the details",
        });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({
          success: "false",
          message: "User is not Registered with Us Please SignUp to Continue"
        });
      }
  
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { email: user.email, id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );
  
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        };
  
        user.token = token;
        user.password = undefined;
  
       // console.log('Setting cookie:', token); // Log token
        res.cookie("token", token, options).status(200).json({
          success: true,
          token,
          user,
          message: `User Login Success`,
        });
      } else {
        return res.status(401).json({
          success: "false",
          message: "Password is incorrect",
        });
      }
    } catch (error) {
      console.error("Login error:", error); // Log error
      return res.status(500).json({
        success: false,
        message: `Login Failure Please Try Again`,
      });
    }
  };
  