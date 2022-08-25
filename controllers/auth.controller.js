const User = require("../models/user.model")
const constants  = require("../utils/constant")
const bcrypt = require("bcryptjs")
const constants = require("../utils/constant")
const jwt = require("jsonwebtoken")
const authConfig = require("../configs/auth.config")



exports.signup = async (req,res) => {

    if(req.body.userType != constants.userTypes.student){
        req.body.userStatus = constants.userStatus.pending
    }

    const userObj = {
        name : req.body.name,
        userId : req.body.userId,
        password : bcrypt.hashSync(req.body.password,8),
        email : req.body.email,
        userType : req.body.userType,
        userStatus : req.body.userStatus
    }

    try{
    const userCreated = await User.create(userObj)

    const response = {
        name :userCreated.name,
        userId: userCreated.userId,
        email: userCreated.email,
        userType : userCreated.userType,
        userStatus: userCreated.userStatus,
        createdAt : userCreated.createdAt,
        updatedAt : userCreated.updatedAt
    }
    res.status(201).send(response)
}catch(err){
    console.log("Some error happened",err.message);
    res.status(500).send({
        message : "Some internal server error"
    })
}
}

module.signin = (req,res)=>{

    try{

    const user = User.findOne({userId : req.body.userId});

    if(user == null){
        return res.status(400).send({
            message : "Failed ! userId passed doesn't  exist"
        })
    }
    if(user.userStatus == constants.userStatus.pending){
        return res.status(400).send({
            message : "Not yet approved from ADMIN"
        })
    }
    const passwordIsValid = bcrypt.compareSync(req.body.password,user.password);

    if(!passwordIsValid){
        return res.status(401).send({
            message:"Wrong Password"
        })
    }

    const token = jwt.sign({
        id : user.userId
    },authConfig.secret,{
        expiresIn :600
    });
    res.status(200).send({
        name : user.name,
        userId : user.userId,
        email : user.email,
        userType : user.userType,
        userStatus : user.userStatus,
        accessToken : token
    });

}catch(err){
    console.log("Some error happened while signin",err.message);
    return res.status(500).send({
        message : "Internal server error while login"
    })
}

}