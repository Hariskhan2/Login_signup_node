const express =require( "express");
const expressLayouts= require("express-ejs-layouts")
const app= express();

const PORT = process.env.PORT || 5000;

//ejs

app.use(expressLayouts);
app.set('view engine', 'ejs');

//router routes

app.use("/", require('./routes/index'))
app.use("/users", require('./routes/users'))


app.listen(PORT, console.log(`Server listening on ${PORT}`));