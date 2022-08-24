const mongoose = require("mongoose");
const constants = require("../utils/constant")

const jobSchema = new mongoose.Schema({
    jobType : {
        type : String,
        required : true
    },
    jobStatus : {
        type : String,
        required : true,
        enum : [constants.jobStatus.closed,constants.jobStatus.open]
    },
    jobDescription : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "user"
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : ()=>{
            return Date.now()
        }
    },
    updatedAt : {
        type : Date,
        default : ()=>{
            return Date.now()
        }
    }

});

module.exports = mongoose.model("job",jobSchema)