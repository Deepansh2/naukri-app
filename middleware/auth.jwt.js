const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const constants = require("../utils/constant");
const User = require("../models/user.model")

const verifyToken = (req,res,next) =>{
    

    const token = req.headers["x-access-token"];

    if(!token){
        res.status(403).send({
            message : "Probhited ! no token is provided"
        })
    }


    jwt.verify(token,authConfig,(err,decoded)=>{
        if(err){
            res.status(401).send({
                message : "Unauthorized ! "
            })
        }
        req.userId = decoded.id;

        next()
    })


}

const isAdmin = async (req,res,next) =>{

    const user = await User.findOne({userId : req.userId });

    if(user && user.userType == constants.userTypes.admin){
        next()
    }
    else{
        res.status(403).send({
            message : "Only admin users are allowed to access this endpoint"
        })
    }
}

const isValidUserIdInReqParam =async (req,res,next) =>{

    try{
        const user = await User.findOne({userId:req.params.id});
        if(!user){
            res.status(400).send({
                message : "UserId passed doesn't exist"
            })
        }
        next();
    }catch(err){
        console.log("Error while reading the user Info",err.message);
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

const isAdminOrHr = async (req,res,next)  =>{

    //fetching user from the DB using userId
    const callingUser = await User.findOne({userId:req.userId});
    //Check what is the user type
    if(callingUser && (callingUser.userType == constants.userTypes.admin || callingUser.userType == constants.userTypes.hr)){
        next()
    }
    else{
        res.status(403).send({
            message : "Only admin and the hrs are allowed to make this endPoint"
        })
    }
}

const isApplicant = async (req,res,next) =>{
    const user = await User.findOne({userId : req.userId});

    if(user && (user.userType == constants.userTypes.student)){
        next();
    }
    else{
        return res.status(403).send({
            message : "Only registerted users can apply"
        })
    }
} 

const verifyApplyOrUpdateJob = async (req,res,next) =>{
    const user = await User.findOne({userId : req.userId});
    
    if(req.query.jobApply){
        if(user.userType != constants.userTypes.student){
            return res.status(403).send({
                message : "Only registerd users can apply"
            })
        }
    }
    else{
        if(user.userType != constants.userTypes.admin || user.userType != constants.userTypes.hr){
            return res.status(403).send({
                message : "Only ADMIN | HRS can access this endPoint"
            })
        }
    }
    next()
}

const authJwt = {

    verifyToken:verifyToken,
    isAdmin:isAdmin,
    isValidUserIdInReqParam:isValidUserIdInReqParam,
    isAdminOrHr:isAdminOrHr,
    isApplicant :isApplicant, 
    verifyApplyOrUpdateJob :verifyApplyOrUpdateJob 
}

module.exports = authJwt