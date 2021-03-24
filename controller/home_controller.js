const { user } = require("../config/mongoose");
const User = require("../models/user");

module.exports.signUp = function (req, res) {
  if (req.body.password !== req.body.confirm_password) {
    return res.json(401, {
      data: {
        message: "password and confirm password doesnot match",
      },
    });
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (user) {
      return res.json(402, {
        data: {
          message: "user already exsits",
        },
      });
    } else {
      User.create(
        {
          name: req.body.name,
          password: req.body.password,
          email: req.body.email,
        },
        (err, user) => {
          return res.json(202, {
            data: {
              message: "user created",
            },
          });
        }
      );
    }
  });
};

module.exports.createSession = function (req, res) {
  //TO DO HANDLE SESSION CREATION, AFTER USER SIGNS IN
  let user = req.user;
  user = { email: user.email, name: user.name, id: user.id };
  return res.json(201, {
    data: {
      user: user,
      message: "sign in sucess",
    },
  });
};

module.exports.failiureRedirect = (req, res) => {
  return res.json("402", {
    data: {
      message: "invalid username or password",
    },
  });
};

module.exports.profile = (req, res) => {
  const { name, email } = req.user;
  //   console.log(req.session);
  return res.json(201, {
    data: {
      user: { name, email },
    },
  });
};
