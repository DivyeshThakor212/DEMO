const express = require('express')
const { db } = require('./config/db')
const dotenv = require('dotenv')
const app = express()
const port = 5000
dotenv.config()



app.get("/",(req,resp) => {
    resp.send("heyyyyyy response")
})

app.listen(port, () =>{
    db()
    console.log(`port is listening on port ${port}`)
})


// Node JS

// index.js >> Root of project
// Middleware >> Act as a bridge between request and response
// Controller >> Main logic
// Routes >> Endpoints or URL
// Models >> Schemas 
// Utils >> Utility function
// Helpers >> 
// Config >> DB configuration
// .env