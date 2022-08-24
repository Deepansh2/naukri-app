const mongoose = require("mongoose");

const companySchema = new mongoose.company({
    companyName : {
        type : String,
        required: true
    },
    Description : {
        type:String,
        required : true
    },
    jobsPosted : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref :"job"
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
     
})
module.exports = mongoose.model("company",companySchema)