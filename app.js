const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});

app.get('/',(req,res)=>{
    res.render('home.ejs');
})
