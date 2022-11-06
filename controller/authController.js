const User = require("../model/user");
const jwt = require("jsonwebtoken");
//const localStrategy = require("passport-local").Strategy

const signup = async(req,res) => {
    const { first_name, last_name,email,password} = req.body;
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        throw new CustomError.BadRequestError(`email already existed`)
    }
    let user = new User({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email:req.body.email,
        password:req.body.password,
    });
    user = await user.save();

 //jwt authentication
    const payload = { _id: user._id, email: user.email };
    const token = jwt.sign(payload, process.JWT_SECRET, {
        expiresIn: "1h",
    });
    user.password = undefined;
    res.status(StatusCodes.OK).json({ 
         token,
          user, 
    });
}



const login = async(req,res) =>{

    const { email, password } = req.body;
    if(!email || !password){
        throw new CustomError.BadRequestError("Please provide an email and password ")
    }
    const user = await User.findOne({email})
    if(!user){
        throw new CustomError.UnauthenticatedError(" Invalid Credentials")
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new customError.unauthenticatedError("Invalid credentials");
    }
    const payload = { _id: user._id, email: user.email };
    const token = jwt.sign(payload, process.JWT_SECRET, {
        expiresIn: "1h",
    });
    user.password = undefined;
    res.status(StatusCodes.OK).json({ 
         token,
          user, 
    });
};


const profile = async(req,res)=>{
    console.log(req.user);
    res.status(StatusCodes.OK).json({
   message:"Welcome to your profile"})
}

const logout = async(req,res)=> {
     res.cookie("token","logout",{
        httpOnly:true,
        expires: new Date(Date.now() + 1000 )
     });
     res.status(StatusCodes.OK).json({ message:"user logged out" }); 

};



module.exports = {
    signup,
    login,
    profile,
    logout,
    
}