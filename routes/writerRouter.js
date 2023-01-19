const express = require("express");
const router = express.Router();

const { createBlog, getUserBlog, editBlog, deleteBlog, publishBlog } = require("../controller/writerController")

// Create a new blog
router.post("/blog", createBlog)

// Get all blogs by the logged in user
router.get("/blog", getUserBlog)

// Publish a blog
router.patch("/publish/:id", publishBlog)

// Edit a blog
router.patch("/edit/:id", editBlog)

// Delete a blog
router.delete("/blog/:id", deleteBlog)

module.exports = router;