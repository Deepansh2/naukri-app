const Job = require("../models/job.model")



exports.create = async (req,res)  =>{
 // read from the request body and create job object
    const jobObj = {
        title : req.body.title,
        jobStatus : req.body.jobStatus,
        company : req.user.companyId,
        postedBy : req.user._id, 
        description : req.body.description

    }
    await Job.create(jobObj)


}