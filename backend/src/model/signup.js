const mongoose = require('mongoose')
const validator = require('validator')

const schema = new mongoose.Schema({
    name  :{
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        validate(v){
            if(!validator.isEmail(v)){
                throw new Error('Please Enter Valid Email...')
            }
        }
    },
    password : {
        type : String,
        required : true,
    },
    profilePic : {
        type : String,
    }
})
const User = new mongoose.model('users',schema)

module.exports = User