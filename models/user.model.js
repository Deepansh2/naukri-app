const mongoose = require("mongoose");

const constants = require("../utils/constant")

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required :true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required :true,
        lowercase : true,
        trim : true, // it will remove the spaces btw the words
        minLength : 10,
        unique : true
    },
    phoneNo :{
        type : Number,
        unique : true
    },
    userType : {
        type : String,
        required : true,
        default : constants.userTypes.student,
        enum : [constants.userTypes.student,constants.userTypes.hr,constants.userTypes.admin]
    },
    userStatus : {
        type : String,
        required : true,
        default : constants.userStatus.approved,
        enum  : [constants.userStatus.approved,constants.userStatus.pending,constants.userStatus.rejected]
    },
    createdAt : {
        type : Date,
        immutable :true,
        default : ()=>{
            return Date.now()
        }
    },
    updatedAt : {
        type : Date,
        default : ()=>{
            return Date.now()
        }
    },
    jobsApplied : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "job"
    },
    companyId : {
        Type : mongoose.SchemaTypes.ObjectId,
        ref : "company"
    }

},{timestamps:true,versionKey:false});

module.exports = mongoose.model("user",userSchema)