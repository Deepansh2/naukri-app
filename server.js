const express = require("express");
const app = express();
const serverConfig = require("./configs/server.configs")
const User = require("./models/user.model")
const bcrypt = require("bcryptjs")



const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


const mongoose = require("mongoose")
const dbConfig = require("./configs/db.config");
mongoose.connect(dbConfig.DB_URL)
const db = mongoose.connection;
db.on("Error",()=>{
    console.log("Error while connecting to mongodb");
})
db.once("open",()=>{
    console.log("connected successfully");
    init()
})


async function init(){

    try{
    // let user = await User.findOne({userId:constants.userTypes.admin });
    // if(user){
    //     console.log("Admin is already present");
    //     return;
    await User.collection.drop()
    // }
    const user = await User.create({
        name : "deepanshu",
        userId : "deep01",
        password : bcrypt.hashSync("deepanshu",8),
        email : "deepanshusing54@gmail.com",
        userType : "ADMIN"
    });
    console.log(user)
}catch(err){
    console.log("Error in db initialization",err.message);
}
}



app.listen(serverConfig.PORT,()=>{
    console.log("Server is started at port number",serverConfig.PORT)
})