const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user))

passport.use(new LocalStrategy({usernameField: "email"}, (email, password, done) => {
    User.findOne({email: email})
        .then((user) => {
            if (!user) { return done(null, false, {message: "Could not find User"})};

            if (bcrypt.compare(password, user.password)) {
                return done(null, user);
            }
            else{
                return done(null, false, {message: "Wrong Password"});
            }
        })
        .catch(err => {
            done(err, {message: err});
        })
}));
