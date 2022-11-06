const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
    title :{
        type: String,
        required: true,
    },
    description: {
        type:String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    read_count:{
        type: String,
        required: true,
    },
    reading_time: {
        type: String,
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
},
{timestamps: true},
)



module.exports = mongoose.model("Blog", blogSchema);
