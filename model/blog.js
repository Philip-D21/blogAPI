const mongoose = require("mongoose");
const User = require("../model/user");

const blogSchema = new mongoose.Schema({
    title :{
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type:String,
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    state: {
        type: String,
        enum: ["draft", "published"],
        default: "draft"
    },
    read_count:{
        type: Number,
        default: 0,
        min: 0,
    },
    reading_time: {
        type: Number,
        required: true,
    },
    tags:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    timestamp:{
        type: Date,
        default: Date.now,
        imutable: true
    },
    last_modified:{
        type: Date,
        default: Date.now,
    }
})

blogSchema.index({ tags: 1});



module.exports = mongoose.model("Blog", blogSchema);
