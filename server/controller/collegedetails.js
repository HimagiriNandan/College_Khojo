const College = require('../Models/College');

async function collegeDetails(req, res) {
    var {
        percentile = 100, marks = 300, gender = "", location = "",
        page = 1, limit = 5,rank  = 0,examtype = "JEE Mains", tiertype,
        seattype = ""
    } = req.body;
    
    const skip = (page - 1) * limit;  // Calculate the number of items to skip

    percentile = (percentile===-1) ? 100 : percentile;
    marks = (marks===-1) ? 300 : marks;
    rank = (rank===-1) ? 0 : rank;
 
    try {
        // Fetch colleges based on query parameters
        const collegedata = await College.find({
            Marks: {
                $lte: marks,
            },
            Percentile: {
                $lte: percentile,
            },
            "Closing Rank": {
                $gte : rank 
            },
            State: {
                $regex: location ? new RegExp(location, 'i') : '', // Case-insensitive matching
            },
            "Exam Type": {
                $regex: examtype ? new RegExp(examtype, 'i') : '', 
            },
            Tier : {
                $regex: tiertype ? new RegExp(tiertype, 'i') : '', 
            },
            "Seat Type":{
                $regex: seattype ? new RegExp(seattype, 'i') : '', 
            },
            "Gender":{
                $regex : gender ? new RegExp(gender,'i') : ''
            }

        })
        .skip(skip) 
        .limit(limit);

        if (!collegedata || collegedata.length === 0) {
            return res.status(404).json({ message: 'No colleges found matching the criteria' });
        }

        // Calculate total number of pages
        const totalCount = await College.countDocuments({
            Marks: {
                $lte: marks,
            },
            Percentile: {
                $lte: percentile,
            },
            "Closing Rank": {
                $gte : rank 
            },
            State: {
                $regex: location ? new RegExp(location, 'i') : '', // Case-insensitive matching
            },
            "Exam Type": {
                $regex: examtype ? new RegExp(examtype, 'i') : '', // Case-insensitive matching
            },
            Tier : {
                $regex: tiertype ? new RegExp(tiertype, 'i') : '', // Case-insensitive matching
            },
            "Seat Type":{
                $regex: seattype ? new RegExp(seattype, 'i') : '', // Case-insensitive matching
            },
            "Gender":{
                $regex : gender ? new RegExp(gender,'i') : ''
            }

        });

        const totalPages = Math.ceil(totalCount / limit); // Total number of pages

        // Send the result back
        res.json({
            colleges: collegedata,
            totalPages: totalPages,
        });
    } catch (error) {
        // Handle errors
        console.error("Error fetching college data: ", error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = collegeDetails;
