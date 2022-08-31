const userController = require("../controllers/user.controller")
const {authJwt} = require("../middleware")

module.exports = (app) =>{


    app.get("/naukri/api/v1/users",[authJwt.verifyToken,authJwt.isAdmin],userController.findAll);

    app.get("/naukri/api/v1/users/:id",[authJwt.verifyToken,authJwt.isValidUserIdInReqParam,authJwt.isAdminOrHr],userController.findByUserId);

    app.put("/naukri/api/v1/users/:id",[authJwt.verifyToken,authJwt.isValidUserIdInReqParam,authJwt.isAdminOrHr],userController.update)
}