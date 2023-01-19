// requiring dotenv file and necessary module
require("dotenv").config()
const express = require("express");
const passport = require("passport")
const bodyParser = require("body-parser");
const { connectDB } = require("./db/connect");

// express app
const app = express();


//Error HandlerMiddleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");


// import the express route
const authRoute = require("./routes/authRouter");
const BlogRoute = require("./routes/blogRouter");
const writerRoute = require("./routes/writerRouter");

//middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
const authenticate = require("./middleware/passport");

// calling passport middleware
//app.use('/user', passport.authenticate('jwt', { session: false }), );

// using the routes 
app.use("/",authRoute);
app.use("/blog",BlogRoute);
app.use('/writer',authenticate,writerRoute);



app.get("/", (req,res) => {
    res.json(`{"message : You're welcome to my blog"}`)
});




//using the middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


// Databases
connectDB();


//listening on server 
const port = process.env.port|| port;

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
});