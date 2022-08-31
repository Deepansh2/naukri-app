const Company = require("../models/company.model");


exports.addCompany = async (req,res) =>{

    const companyObj = {
        companyName : req.body.companyName,
        description : req.body.description,
        hrs : req.user.companyId,
        jobsPosted : req.user._id,
        companyType: req.body.companyType
    }
    
    try{
    const company = await Company.create(companyObj);
    console.log(company)
    return res.status(201).send(company);
    }catch(err){
        console.log("Error while adding company",err.message);
        return res.status(500).send({
            message : "Some internal server error"
        })
    }

}

exports.getAllCompanies = async (req,res) =>{

    const companies = await Company.find();
    return res.status(200).send(companies);
}

exports.getOneCompany = async (req,res) =>{
    const company = await Company.findOne({_id:req.params.id});

    return res.status(200).send(company)
}

exports.updateComapny = async (req,res) =>{

    const company = await Company.findOne({_id:req.params.id});
    console.log(company);
    if(company == null){
        return res.status(200).send({
            message : "Company doesn't exist"
        })
    }

    //updating the attributes of save company
    company.companyName = req.body.companyName != undefined ? req.body.companyName : company.companyName;
    company.description = req.body.description != undefined ? req.body.description : company.description;
    company.companyType = req.body.companyType != undefined ? req.body.companyType : company.companyType;
    company.jobsPosted = req.body.jobsPosted != undefined ? req.body.jobsPosted : company.jobsPosted;
    
    const companyUpdated = await company.save();
    // return the updated company
    return res.status(200).send(companyUpdated)
}


exports.deleteCompany = (req,res) =>{

    try{
    const company = await Company.deleteOne({_id:req.params.id});

    res.status(200).send(company)
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal server error"
        })
    }
}