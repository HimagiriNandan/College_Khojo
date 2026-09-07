const User = require("../Models/userschema");

const attempted = async(req,res)=>{
    const { userId } = req.body;

    const user = await User.findById(userId);

    if(!user){
        return res.status(404).json({error:true,message: "User not found"});
    }
    res.status(200).json(user.attempted_mocks.map(mock => {
        return {
            _id: mock._id,
            title: mock.title,
            scoredMarks : mock.scoredMarks
        }
    })
    );
} 


module.exports = attempted;