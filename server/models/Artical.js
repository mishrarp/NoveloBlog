var mongoose = require("mongoose");


//create the ArticalSchema
var ArticalSchema = new mongoose.Schema({
    
    title:{
        type: String,
        required: true
    },
    topic:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    topic_url:{
        type: String,
        required: false
    },
    topic_img:{
        type: String,
        required: true
    },
    topic_video:{
        type: String,
        required: false
    },
    topic_video_length:{
        type: String,
        required: false
    },
    author:{
        type: String,
        required: true
    },
    views:{
        type : String,
        required : true
    },
    comment:{
        type:String,
        required: false
    },
    create_date:{
		type:Date,
		default:Date.now
    }
});

//export the model
module.exports = mongoose.model('artical',ArticalSchema);