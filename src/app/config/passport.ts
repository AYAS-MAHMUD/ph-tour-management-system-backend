import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { config } from ".";
import { User } from "../modules/users/user.model";
import { Role } from "../modules/users/user.interface";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";


passport.use(
    new LocalStrategy({
        usernameField : "email",
        passwordField : "password"
    },async(email : string , password : string , done)=>{
        try {
            const user = await User.findOne({email});
            if(!user){
                return done(null , false , {message : "User Not Found"});
            }
            const isPassdMatch = await bcrypt.compare(password as string , user.password as string) 
            if(!isPassdMatch){
                return done(null , false, {message : "Invalid credentials"});
            }

            const isGoogleAuth = user.auth?.some(auth => auth.provider === "google");
            if(isGoogleAuth){
                return done(null , false , {message : "Please login with google account"})
            }

            return done(null, user);
        } catch (error) {
            done(error , false, {message : "An error occurred"});
        }
    })
)


passport.use(
    new GoogleStrategy({
    clientID : config.google_client_id ,
    clientSecret : config.google_client_secret,
    callbackURL : config.google_callback_url,
},async(accessToken : string , refreshToken : string, profile : Profile , done : VerifyCallback)=>{
    try {
        const email = profile.emails?.[0].value;
        if(!email){
            // throw new Error("Email Not found in google profile");
            return done(null, false, {message : "Email Not Found in Google Profile"})
        }

        let user = await User.findOne({email});
        if(!user){
             user = await User.create({
                email,
                name : profile.displayName,
                picture : profile.photos?.[0].value,
                role : Role.USER,
                auth : [{
                    provider : "google",
                    providerId : profile.id
                }]
            })

        }
        return done(null,user)

    } catch (error) {
        done(error, false,{message : "An error occurred while authenticating with Google"});
    }
}))





passport.serializeUser((user : any , done : (err :any , id ?: unknown)=>
    void )=>{
    done(null,user._id);
})

passport.deserializeUser(async(id : string, done : any)=>{
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error , null);
    }
})

