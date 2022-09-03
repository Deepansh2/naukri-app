const User = require("../models/user.model")
const objectConverter = require("../utils/objectConverter")

exports.findAll = async (req,res) =>{

    const queryObj = {};
    const userTypeQP = req.query.userType
    const userStatusQP = req.query.userStatus
    if(userTypeQP){
        queryObj.userType = userTypeQP
    }
    if(userStatusQP){
        queryObj.userStatus = userStatusQP
    }

    try{
    const users = await User.find()
    res.status(200).send(objectConverter.userResponse(users))
    }catch(err){
        console.log("Some error happened while finding all users",err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}


exports.findByUserId =  async (req,res) =>{

    try{
    const user = await User.find({userId : req.params.id});
    return res.status(200).send(objectConverter.userResponse(user))
    }catch(err){
        console.log("Error while seaching the user ",err.message);
        return res.status(500).send({
            message : "Internal server error"
        })
    }
}


exports.update = async (req,res) =>{

    try{
    const user = await User.findOne({userId : req.params.id});
    user.userType = req.body.userType != undefined ? req.body.userType:user.userType;
    user.userStatus = req.body.userStatus!=undefined?req.body.userStatus:user.userStatus;
    user.name = req.body.name != undefined?req.body.name :user.name
    const updatedUser = await user.save();

    res.status(201).send({
        name : updatedUser.name,
        userId : updatedUser.userId,
        email :updatedUser.email,
        userStatus : updatedUser.userStatus,
        userType : updatedUser.userType
    })
}catch(err){
    console.log("Error while updating the user",err.message);
    res.status(500).send({
        message : "Internal server error"
    })
}
}


