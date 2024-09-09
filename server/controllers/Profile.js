const User = require("../models/User");

exports.getUserDetails = async(req,res)=>{
    try{
        //console.log("print req.user ",req.user);
        const id = req.user.id;
 
        const userDetails = await User.findById(id);
         res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: userDetails,
        })

    }
    catch(error){
        console.log("Printing error in backend api userdetaisl ",error.message);
        return res.status(500).json({
            success:false,
            message:"Error in fetching user details",
        })
    }
}