const Job = require("../models/job.model")



exports.create = async (req,res)  =>{
 // read from the request body and create job object
    const jobObj = {
        title : req.body.title,
        jobStatus : req.body.jobStatus,
        company : req.userId,
        postedBy : req.userId, // I got it from the access token
        description : req.body.description

    }
    await Job.create(jobObj)


}