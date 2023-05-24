const express = require('express')
const PORT = process.env.PORT || 8000
const app = express()
const db = require('./src/db/db')
const cors = require('cors')
app.use(cors())
const fileupload = require('express-fileupload')
db()
app.use(express.json())
app.use(fileupload({
    useTempFiles : true
}))

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.use("/api/auth",require("./src/routes/auth"))
app.use("/post",require("./src/routes/post"))

app.listen(PORT,()=>{
    console.log("listening...")
})