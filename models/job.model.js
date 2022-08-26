const mongoose = require("mongoose");
const constants = require("../utils/constant")

const jobSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true
    },
    jobStatus : {
        type : String,
        required : true,
        enum : [constants.jobStatus.closed,constants.jobStatus.open]
    },
    description : {
        type : String,
        required : true
    },
    applicants: {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "user"
    },
    postedBy : { // hr or admin
        type : mongoose.SchemaTypes.ObjectId,
        ref : "user"
    },
    company : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "company"
    }
  

},{timestamps : true,versionKey:false});

module.exports = mongoose.model("job",jobSchema)