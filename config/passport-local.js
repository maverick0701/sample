const { Passport } = require("passport");
const passport = require("passport");

const localStratergy = require("passport-local");

const User = require("../models/user");

//authenticating the user

passport.use(
  new localStratergy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      //find a user and establish identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("Error in finding user --> Passport");
          return done(err);
        }

        if (!user || user.password != password) {
          console.log("Invalid Username/Password");
          return done(null, false);
        }
        console.log("user found");
        return done(null, user);
      });
    }
  )
);

//setting user into cookie after authentication

passport.serializeUser(function (user, done) {
  console.log("serialize user");
  done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  console.log("deserialize user");
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user --> Passport");
      return done(err);
    }
    return done(null, user);
  });
});

// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // if the user is signed in, then pass on the request to the next function(controller's action)
  console.log("check auth");
  if (req.isAuthenticated()) {
    return next();
  }

  // if the user is not signed in
  return res.json(401, {
    data: {
      message: "please sign in",
    },
  });
};

module.exports = Passport;
