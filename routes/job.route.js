
const jobController = require("../controllers/job.controller");
const {authJwt} = require("../middleware")

module.exports = (app) =>{


    //CREATE CALL
    app.post("/naukri/api/v1/jobs",[authJwt.verifyToken,authJwt.isAdminOrHr],jobController.create);

    //GET ALL COMPANIES
    app.get("/naukri/api/v1/jobs",[authJwt.verifyToken],jobController.getAllJobs);

    //GET SINGLE COMPANY
    app.get("/naukri/api/v1/jobs/:id",[authJwt.verifyToken],jobController.getOneJob);

    //UPDATE CALL
    app.put("/naukri/api/v1/jobs/:id",[authJwt.verifyToken,authJwt.verifyApplyOrUpdateJob],jobController.updateJob);

    //DELETE CALL
    app.delete("/naukri/api/v1/jobs/:id",[authJwt.verifyToken,authJwt.isAdminOrHr],jobController.deleteJob)
}