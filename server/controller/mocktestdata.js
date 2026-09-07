const MockTestSchema = require("../Models/MockTestSchema");

async function mockTestData(req,res){
    const {id} = req.body;
    const test = await MockTestSchema.findById(id);
    if(!test){
        res.status(404).send("Not found");
    }
    res.status(200).send(test);
};

module.exports = mockTestData;

