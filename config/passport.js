<<<<<<< HEAD
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            // Match User
            User.findOne({ email: email})
                .then(user => {
                    if(!user) {
                        return done(null, false, { message: 'That email is not registered'});
                    }
                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, { message: 'Password is incorrect'})
                        }
                    })
                })
                .catch(err => console.log(err))
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {

        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
=======
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            // Match User
            User.findOne({ email: email})
                .then(user => {
                    if(!user) {
                        return done(null, false, { message: 'That email is not registered'});
                    }
                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, { message: 'Password is incorrect'})
                        }
                    })
                })
                .catch(err => console.log(err))
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {

        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
}