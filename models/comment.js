const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    text: String,
    author: String
});

//Campground Model setup
const Comment = mongoose.model("Comment", commentSchema);

//module return
module.exports = Comment;