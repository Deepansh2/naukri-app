const companyController = require("../controllers/company.controller");
const {authJwt} = require("../middleware");

module.exports = (app) =>{

    //CREATE CALL
    app.post("/naukri/api/v1/company",[authJwt.verifyToken,authJwt.isAdmin],companyController.addCompany);

    //GET ALL THE COMPANIES
    app.get("/naukri/api/v1/companies",[authJwt.verifyToken],companyController.getAllCompanies);

    //GET SINGLE COMPANY
    app.get("/naukri/api/v1/company/:id",[authJwt.verifyToken],companyController.getOneCompany);

    //UPDATE CALL
    app.put("/naukri/api/v1/companies/:id",[authJwt.verifyToken,authJwt.isAdmin],companyController.updateComapny);

    //DELETE CALL
    app.delete("/naukri/api/v1/companies/:id",[authJwt.verifyToken,authJwt.isAdmin],companyController.deleteCompany)
}