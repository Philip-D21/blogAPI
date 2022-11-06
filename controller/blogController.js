//const { response } = require("express");
const Blog = require("../model/blog");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");



const createBlog = async(req,res) => {
    let blog  =  new Blog({
        title:req.body.title,
        description:req.body.description,
        author:req.body.author,
        state: req.body.state,
        read_count: req.body.read_count,
        reading_time: req.body.reading_time,
        tags:  req.body.tags,
        body: req.body.body,
    });
     
blog = await blog.save();
    res.status("Blog Created")
};

const getAllBlogs= async (req,res) => {
    const blog = await Blog.findAll({});
    res.status(StatusCodes.OK).json({
        success:true,
        blog,
    })
}
const getSingleBlog = async (req,res) => {
     const { id } = req.params;
     const blog = await Blog.findBy({author ,title, tags});

     if(!blog){
         throw new CustomError.NotFoundError(`No blog with id: ${id}`)
     }
     res.status(StatusCodes.OK).json({
        success: true,
        blog,
    })
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
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
}
