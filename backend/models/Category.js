//likhna hai abhi isko
const mongoose = require('mongoose');

//define the tag schema

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
        }
    ]
})

//export the category model
module.exports = mongoose.model("Category",categorySchema);