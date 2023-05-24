const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({})

const db = async ()=>{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connection Successful...");
}

module.exports = db