const express =require( "express");
const expressLayouts= require("express-ejs-layouts")
const app= express();
const mongoose= require("mongoose");
const PORT = process.env.PORT || 5000;



//DB config

const db= require("./config/keys").MongoURI;

//vonect to mongo

mongoose.connect(db, {useNewUrlParser: true})
.then(()=> console.log("DB Connected"))
.catch(err => console.log(err))


app.use(express.urlencoded({extended: false}))

//ejs

app.use(expressLayouts);
app.set('view engine', 'ejs');

//router routes

app.use("/", require('./routes/index'))
app.use("/users", require('./routes/users'))
// body parser




app.listen(PORT, console.log(`Server listening on ${PORT}`));