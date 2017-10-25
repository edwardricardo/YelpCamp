const mongoose = require('mongoose');

//Campground Schema setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    location: String,
    lat: Number,
    lng: Number,
    image: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
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