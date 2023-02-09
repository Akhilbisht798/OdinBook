const passport = require('passport');
const User = require('../model/User');
const FacebookStrategy = require('passport-facebook').Strategy;

// Later Can merge both email and fb Id if have either of one already.
module.exports = new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ["id", "displayName", "email", "profile_pic"]
}, async (accessToken, refreshToken, profile, cb) => {
    User.findOne({fbId: profile.id})
        .then((user) => {
            if (user) {
                return cb(null, user);
            }

            detail = {
                fbId: profile.id,
                username: profile.displayName,
                email: profile.email,
                profilePic: profile.profile_pic,
            };
            const newUser = User(detail);
            newUser.save()
                .then(data => {return cb(null, data)})
                .catch(err => {return cb(err, false)});
        })
        .catch(err => {return cb(err, false)})
})

passport.serializeUser((user, done) => done(null, user.fbId));
passport.deserializeUser((userID, done) => {
    User.findOne({fbId: userID}).then(user => {
        return done(null, user);
    })
    .catch(err => {
        return done(err, false);
    })
})