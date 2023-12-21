const { mongoose } = require("mongoose");


const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    } ,
    email : {
        type : String,
        required : true,
        lowercase : true,
        minLength : 10,
        unqiue : true
    },
    userName: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : ()=>{
            return Date.now();
        }
    },
    updatedAt : {
        type : Date,
        default : ()=>{
            return Date.now();
        }
    },
   
});

module.exports = mongoose.model("User", UserSchema);