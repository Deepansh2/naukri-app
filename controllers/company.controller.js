const Company = require("../models/company.model");


exports.create = (req,res) =>{

    const companyObj = {
        companyName : req.body.companyName,
        description : req.body.description,
        hrs : req.userId,
        jobsPosted : req.userId,
        companyType: req.body.companyType
    }
    await Company.create(companyObj)

}
