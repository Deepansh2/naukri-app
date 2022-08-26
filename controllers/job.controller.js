const Job = require("../models/job.model")



exports.create = (req,res)  =>{
 // read from the request body and create job object
    const jobObj = {
        title : req.body.title,
        jobStatus : req.body.jobStatus,
        applicants : req.body.userId,// I got it from the access token
        postedBy : req.body.userId,
        description : req.body.description

    }

}