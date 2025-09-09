const express = require("express")
const app = express()

app.use(express.urlencoded({extended: false}))
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(function(req, res, next){
    res.locals.errors = []
})

app.get("/", (req, res) => {
    res.render("homepage")

})

app.get("/login", (req, res) =>{
    res.render("login")
})

app.post("/register", (req, res) =>{
    const errors = []

    if(typeof req.body.username !=="string") req.body.username=""
     if(typeof req.body.password !=="string") req.body.password=""

     req.body.username=req.body.username.trim()

     if(!req.body.username) errors.push("You must provide a username")
     if(req.body.username && req.body.username.length > 3 )  errors.push("Username must be more than 3 characters")
     if(req.body.username && req.body.username.length < 10 )  errors.push("Username cannot exceed more than 10 characters")

        if (errors.length) {
            return res.render("homepage", {errors})

        }else {
         
            res.send("thank your for filling out the form")
        }

     
        
         



}) 


app.listen(3000)