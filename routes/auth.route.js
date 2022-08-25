const authController = require("../controllers/auth.controller")

module.exports = (app) =>{


    app.post("/naukri/api/v1/auth/signup",authController.signup);
    app.post("/naukri/api/v1/auth/signin",authController.signin)
}