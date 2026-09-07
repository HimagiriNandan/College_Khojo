const Mocktest = require("../Models/MockTestSchema");



async function mocktests (req,res){
    const mocktests = await Mocktest.find({},{_id:1,title:1});
    if(!mocktests){
        return res.status(404).json({error:true,message: "Test not found"});
    }
    res.status(200).json({error:false,data:mocktests});
}



module.exports = mocktests;