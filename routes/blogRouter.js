const express = require("express");
const router = express.Router();


const {    
        getBlog,
        getAllBlogs,

    } = require("../controller/blogController");


    router.get("/", getAllBlogs)
    router.get("/:blogId",getBlog);

    
    
module.exports = router;