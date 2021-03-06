const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    createdAt: { type: Date, default: Date.now }
});

//Campground Model setup
const Comment = mongoose.model("Comment", commentSchema);

//module return
module.exports = Comment;