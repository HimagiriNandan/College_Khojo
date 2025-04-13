const express = require("express");
const Book = require("../Models/Books"); // Import the schema

const router = express.Router();

// Fetch all books
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        console.log(books);
        res.json(books);
    } catch (error) {
        console.error(" Error fetching books:", error);
        res.status(500).json({ message: "Error fetching books" });
    }
});

module.exports = router;
