const Job = require("../models/job.model");
const Company = require("../models/company.model");
const User = require("../models/user.model");




exports.create = async (req,res)  =>{
 // read from the request body and create job object

    // const user = User.findOne({userId:req.userId})
    const jobObj = {
        title : req.body.title,
        jobStatus : req.body.jobStatus,
        companyId : req.user.companyId,
        postedBy : req.user._id, 
        description : req.body.description

    }

    try{
    const company = Company.findOne({_id:Job.companyId});
    if(!company){
        return res.status(200).send({
            message : "company Doesn't exist"
        })
    }
    const job = await Job.create(jobObj);
    console.log(job);

    company.jobsPosted.push(job._id);
    await company.save();

    return res.status(201).send(job)
    }catch(err){
        console.log("Error while dbOperation creating job",err.message);
        return res.status(500).send({
            message: "Internal server error"
        })
    }

}

exports.getAllJobs = async (req,res) =>{

    const jobs = await Job.find({})
    res.status(200).send(jobs)
}


exports.getOneJob = async (req,res) =>{
    
    const job = await Job.findOne({_id:req.params.id});

    if(!job){
        console.log("Failed ! job doesn't exist")
        return res.status(500).send({
            message:"Internal server error"
        })
    }
    res.status(200).send(job)
}

exports.updateJob = async (req,res) =>{

    const job = await Job.findOne({_id:req.params.id});
    
    if(job == null){
        return res.status(200).send({
            message: "Job doesn't exist"
        })
    }
    const user = await User.findOne({userId:req.userId});
    console.log(user,req.userId);

    if(req.query.jobApply){
        return jobApply(req,res,job,user)
    }
    //updating the attributes of the saved company
    job.title = req.body.title != undefined?req.body.title:job.title;
    job.jobStatus = req.body.jobStatus != undefined?req.body.jobStatus:job.jobStatus;
    job.description = req.body.description!=undefined?req.body.description:job.description;
    job.applicants = req.body.applicants !=undefined ?req.body.applicants:job.applicants;

    const jobUpdated = await job.save();
    return res.status(200).send(jobUpdated)

}

let jobApply = async (req,res,job,user) =>{

    try{
    job.applicants.push(user._id) 
    const jobUpdated = await job.save(); // here

    user.jobsApplied.push(job._id);
    const userUpdated = await user.save();

    return res.status(200).send(userUpdated)
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message : "Some Internal Error"
        })
    }
}


exports.deleteJob = (req,res) =>{

    try{

    const job =  await Job.deleteOne({_id:req.params.id});

    res.status(200).send(job)
    }catch(err){
        console.log("Error while deleting the job",err.message);
        return res.status(500).send({
            message : "Some Internal Server Error"
        })
    }

}