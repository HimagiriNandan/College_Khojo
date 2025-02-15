const College = require('../models/College');

async function collegeDetails(req, res) {
    const {
        category = "", percentile = 100, marks = 300, gender = "", location = "",
        page = 1, limit = 5,rank  = 1000000,examtype = "JEE Mains", tiertype
    } = req.body;
    
    const skip = (page - 1) * limit;  // Calculate the number of items to skip

    console.log("Request body: ", req.body);

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
                $lte : rank 
            },
            State: {
                $regex: location ? new RegExp(location, 'i') : '', // Case-insensitive matching
            },
            "Exam Type": {
                $regex: examtype ? new RegExp(examtype, 'i') : '', // Case-insensitive matching
            },
            Tier : {
                $regex: tiertype ? new RegExp(tiertype, 'i') : '', // Case-insensitive matching
            }
        })
        .skip(skip) // Skip the number of items based on page
        .limit(limit); // Limit the number of results returned per page

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
                $lte : rank 
            },
            State: {
                $regex: location ? new RegExp(location, 'i') : '', // Case-insensitive matching
            },
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
