const authController = require("../controllers/auth.controller")
const {verifySignUp} = require("../middleware")

module.exports = (app) =>{


    app.post("/naukri/api/v1/auth/signup",[verifySignUp.verifySignUpReqBody],authController.signup);
    app.post("/naukri/api/v1/auth/signin",[verifySignUp.verifySignInReqBody],authController.signin)
}