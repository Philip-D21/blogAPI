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
        (payload,done) => {
            done(null, payload.user);
        }
    )
)