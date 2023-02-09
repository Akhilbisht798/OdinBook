const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

// Maybe use FindOrCreate so you save on routes.
const authUser = async (email, password, done) => {
    User.findOne({email: email})
        .then((user) => {
            if (!user) { return done(null, false)};

            if (bcrypt.compare(password, user.password)) {
                return done(null, user);
            }
            else{
                return done(null, false);
            }
        })
        .catch(err => {
            done(err);
        })
};

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((userID, done) => {
    User.findOne({_id: userID}).then(user => {
        return done(null, user);
    })
    .catch(err => {
        return done(err, false);
    })
})

module.exports = new LocalStrategy({usernameField: "email"}, authUser);