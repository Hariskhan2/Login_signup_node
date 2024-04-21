const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const  passport = require("passport");

require('./config/passport')(passport)
const PORT = process.env.PORT || 5000;

//DB config

const db = require("./config/keys").MongoURI;

//vonect to mongo

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// Body[arser]
app.use(express.urlencoded({ extended: false }));

// Express Session

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize())
app.use(passport.session())


app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");

  next();
});
//ejs

app.use(expressLayouts);
app.set("view engine", "ejs");

//router routes

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
// body parser

app.listen(PORT, console.log(`Server listening on ${PORT}`));
