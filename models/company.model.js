const mongoose = require("mongoose");

const companySchema = new mongoose.company({
    companyName : {
        type : String,
        required: true
    },
    description : {
        type:String,
        required : true
    },
    jobsPosted : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref :"job"
    },
    hrs : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "user"
    },
    companyType : {
        type : String,
        required : true
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
}, {versionKey: false });
module.exports = mongoose.model("company",companySchema)