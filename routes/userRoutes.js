const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Create User
router.post("/users", async (req, res) => {
    try {
        const { name, age, email } = req.body;

        // Ensure required fields are provided
        if (!name || !age || !email) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newUser = new User({ name, age, email });
        await newUser.save();

        res.status(201).json({ message: "User added successfully", user: newUser });
    } catch (err) {
        res.status(500).json({ error: "Failed to add user" });
    }
});

module.exports = router;

// Read Users
router.get("/users", async (req, res) => {
    try {
        let { search, sortBy, order, page, limit } = req.query;

        let query = {}; // Default empty query

        // Search by name (case-insensitive)
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        // Sorting (default: by name)
        const sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === "desc" ? -1 : 1;
        } else {
            sortOptions.name = 1; // Default sorting by name (A-Z)
        }

        // Pagination
        limit = parseInt(limit) || 5; // Default: 5 users per page
        page = parseInt(page) || 1;
        const skip = (page - 1) * limit;

        const users = await User.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit);

        const totalUsers = await User.countDocuments(query);

        res.json({
            users,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: page,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update User
router.put("/users/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } // Ensures it returns the updated document
        );
        if (!updatedUser) return res.status(404).json({ error: "User not found" });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Delete User
router.delete("/users/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
