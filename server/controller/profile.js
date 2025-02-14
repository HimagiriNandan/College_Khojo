const User = require('../models/userschema.js');


async function userprofile(req,res){
    //localhost:8000/user/profile 
    if (req.session.user) {
        // If session exists, send the user data
        const user = await User.findById(req.session.user.id);
        
        return res.status(200).json({
          data : user,
        });
      } 
    else {
        // If no session exists, return an error
        return res.status(401).json({
          message: "User not logged in",
        });
    }
}

module.exports = userprofile;
