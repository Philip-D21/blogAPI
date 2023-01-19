//const { response } = require("express");
const Blog = require("../model/blog");
const User = require("../model/user");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");



const getAllBlogs = async(req, res, next) => {
    const filterQuery = {}
    const sortQuery = {}

    // Filter/search params
    const author = req.query.author
    const title = req.query.title
    const tags = req.query.tags

    // Order/sorting params
    const read_count = req.query.read_count
    const reading_time = req.query.reading_time
    const timestamp = req.query.timestamp

    // Handle possible filters
    title ? (filterQuery.title = { $regex: title, $options: "i" }) : null
    tags ? (filterQuery.tags = { $all: tags.split(",") }) : null
    if (author) {
        // Search for name of author
        const user = await User.findOne({
            full_name: { $regex: author, $options: "i" }
        }).exec()

        // If found, add id of author to filter query
        if (user) filterQuery.author = user._id
    }


    // Handle sort params
    const allowedSortValues = ["asc", "desc", "ascending", "descending", 1, -1]
    allowedSortValues.includes(read_count) ? (sortQuery.read_count = read_count) : null
    allowedSortValues.includes(reading_time) ? (sortQuery.reading_time = reading_time) : null
    allowedSortValues.includes(timestamp) ? (sortQuery.timestamp = timestamp) : null


    try {
        const publishedBlogs = await Blog
            .find({ state: "published" })
            .populate("author", "full_name email -_id")
            .find(filterQuery)
            .sort(sortQuery)
            .exec()

        // Handle pagination
        const pageSize = +req.query.pageSize || 20
        const page = +req.query.page || 1
        const start = (page - 1) * pageSize
        const end = page * pageSize

        const pagedBlogs = publishedBlogs.slice(start, end)

        res.send({
            message: "Successful",
            matches: publishedBlogs.length,
            page,
            pageSize,
            blogs: pagedBlogs
        })

    } catch (err) {
        next(err)
    }

}

const getBlog = async (req,res) => {
    const id = req.params.id

    try {
        const blog = await Blog
            .findOne({ _id: id, state: "published" })
            .populate("author", "full_name email -_id")
            .exec()

        if (!blog) return res.status(404).send({ message: "Blog does not exist" })

        // Increment read count of blog by one
        blog.read_count++
        await blog.save()

        res.send(blog)

    } catch (err) {
        next(err)
    }
};


const updateBlog = async (req,res) => {
     const { id: blogId } = req.params;

     const blog = await Blog.findOneAndUpdate({
        _id:blogId, 
     },
     req.body, 
         {
        new: true,
        runValidators: true,
     }
     )
     if(!blog){
         throw new CustomError.NotFoundError(`No blog with id: ${userId}`)
     }
     res.status(StatusCodes.Ok).json({
         message:"updated successfully",
         data: blog
     })
};


const deleteBlog = async (req,res) => {
     const { id: blogId } = req.params

     const blog = await Blog.findOne({ id: blogId });

    if(!blog){
        throw new CustomError.NotFoundError(`No user with id: ${userId}`)
     }

     await blog.remove();

     res.status(StatusCodes.OK).json({ 
         message: "blog deleted"
    })
};



module.exports = {
    getAllBlogs,
    getBlog,
}
