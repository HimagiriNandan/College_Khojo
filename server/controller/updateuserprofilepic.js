const User  = require('../Models/userschema');

async function updateProf(req,res){
    const {pic,id}= req.body;

    const user = await User.findById(id);

    if(!user){
        return res.status(404).json({error:true,message: "User not found"});
    }
    user.image = pic;

    await user.save();
    res.status(200).json({error:false,message:"User updated successfully",data:user});
};

module.exports = updateProf;

