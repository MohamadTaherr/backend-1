const express = require("express")
const db = require("better-sqlite3")("ourApps.db")
db.pragma("journal_mode = WAL")

//database
const createTables = db.transaction(() =>{
db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username STRING NOT NULL UNIQUE,
    password STRING NOT NULL
    )
    `
     ).run()
})

createTables()

const app = express()

app.use(express.urlencoded({extended: false}))
app.set("view engine", "ejs")
app.use(express.static("public"))

app.use(function(req, res, next){
    res.locals.errors = []
    next()
})

app.get("/", (req, res) => {
    res.render("homepage")

})

app.get("/login", (req, res) =>{
    res.render("login")
})

app.post("/register", (req, res) => {
    const errors = []

    if(typeof req.body.username !=="string") req.body.username=""
     if(typeof req.body.password !=="string") req.body.password=""

     req.body.username=req.body.username.trim()

     if(!req.body.username) errors.push("You must provide a username")
     if(req.body.username && req.body.username.length > 3 )  errors.push("Username must be more than 3 characters")
     if(req.body.username && req.body.username.length < 10 )  errors.push("Username cannot exceed more than 10 characters")

     if(!req.body.password) errors.push("You must provide a Password")
     if(req.body.password && req.body.password.length > 8 )  errors.push("Password must be more than 8 characters")
      

        if (errors.length) {
            return res.render("homepage", {errors})

        }

        //save the new user into database
       const ourStatement = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)")
       ourStatement.run(req.body.username, req.body.password) 
      
       //log the user by giving them a cookie

       res.send("thank you")
}) 


app.listen(3000)