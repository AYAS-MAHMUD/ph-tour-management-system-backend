import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { config } from ".";
import { User } from "../modules/users/user.model";
import { Role } from "../modules/users/user.interface";



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





passport.serializeUser((user : any , done : (err :any , id ?: unknown)=>void)=>{
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

