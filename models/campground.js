const mongoose = require('mongoose');

//Campground Schema setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

//Campground Model setup
const Campground = mongoose.model('Campground', campgroundSchema);

//module return
module.exports = Campground;