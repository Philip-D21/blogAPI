const { NotBeforeError } = require("jsonwebtoken");
const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT =  require("passport-jwt").ExtractJwt;
const localStrategy = require("passport-local").Strategy;


passport.use(
    "jwt", 
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET||"connect_with_mongodb",
            // jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token")
        
        },
       async (payload,done) => {
            const userId = payload.userId
            if(!userId){
                const err = new Error("UserId is not included in token")
            err.status = 400
            return done(err)
            }
            const user = await User.findById(userId).exec()
           if(!user){
            const err = new Error("UserId is not included in token")
            err.status = 400
            return done(err)
           }
            done(null, {id: userId});
        }
    )
)

function authenticate(req, res, next) {
    passport.authenticate(
        "jwt", 
        {session: false}, 
        (err, user, info, status) => {
            // Return errors from jwt strategy
            if (error) 
            return next(err)
            
            // Return other errors
            if (info) return next(info)

            // Attach the user to the request object
            req.user = user

            // Continue 
            next()
        }


    )(req, res, next)
}

module.export = authenticate;