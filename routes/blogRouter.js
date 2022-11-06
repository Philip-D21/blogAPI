const express = require("express");
const router = express.Router();


const {    
        createBlog,
        getSingleBlog,
        getAllBlogs,
        updateBlog,
        deleteBlog,
    } = require("../controller/blogController");

    router.post("/",createBlog);

    router.get("/",getAllBlogs);


    router.get("/:blogId",getSingleBlog);
    
    
    router.patch("/:blogId",updateBlog);

    router
    .delete("/:blogId",deleteBlog);

    
    
module.exports = router;