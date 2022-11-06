const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
     first_name :{
        type: String,
        required: true,
     },
     last_name:{
        type:String,
        required: true,
     },
     email: {
        type:String,
        lowercase: true,
        required: true,
        unique: true,
        validate:{
            validator: validator.isEmail,
            message: "Please provide valid email"
        },

     },
     password:{
        type:String,
        required: true,
        min:[ 6,"password not less than 6"],
        max:[8," password not more than 8"]
     },
     createdAt:{
        type: Date,
        default: Date.now()
     }
});

userSchema.pre("save", async function() {
    if (!this.isModified("password")) return;
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt)
});

userSchema.methods.isPasswordCorrect = async function (password) {
    const compare = await bcrypt.compare(password, this.password);
    return compare;
};




module.exports = mongoose.model("User" , userSchema)