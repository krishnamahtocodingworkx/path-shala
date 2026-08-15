const mongoose = require("mongoose");

require("dotenv").config();


exports.dbConnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("connection to database successfully")
    }).catch((err)=>{
        console.log("Database connection faild");
        console.error(err);
        process.exit(1);
    })
}