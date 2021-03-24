const express = require("express");
const app = express();
const port = 8200;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const db = require("./config/mongoose");
const passport = require("passport");
const passportLocal = require("./config/passport-local");
app.use(express.urlencoded());

app.use(
  session({
    name: "sample",
    // TODO change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes"));
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err},*******,dirname is `);
  }

  console.log(`Server is running on port: ${port}`);
});
