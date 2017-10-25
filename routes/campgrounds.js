const express = require('express'),
    router = express.Router({mergeParams: true}),
    Campground = require('../models/campground'),
    Comment = require('../models/campground'),
    middleware = require('../middleware/index'),
    geocoder = require('geocoder');

//INDEX - show all campgrounds
router.get("/", function (req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds, page: 'campgrounds' });
        }
    });
});

//show form new
router.get('/new', middleware.isLoggedIn, function (req, res) {
    res.render('campgrounds/new');
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function (req, res) {
    // get data from form and add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    const price = req.body.price;

    geocoder.geocode(req.body.location, function (err, data) {

        const lat = data.results[0].geometry.location.lat;
        const lng = data.results[0].geometry.location.lng;
        const location = data.results[0].formatted_address;
        
        const newCampground = { name: name, image: image, description: desc, price: price, author: author, location: location, lat: lat, lng: lng };
    
        // Create a new campground and save to DB
        Campground.create(newCampground, function (err, newlyCreated) {
            if (err) {
                console.log(err);
            } else {
                //redirect back to campgrounds page
                req.flash('success', `Campground '${newlyCreated.name}' successfully created!`);
                res.redirect("/campgrounds");
            }
        });
    });
});

//show one
router.get('/:id', function (req, res) {
    const campground = Campground.findById(req.params.id).populate('comments').exec(function (err, campground) {
        if (err || !campground) {
            console.log(err);
            req.flash('error', 'Campground not found.');
            res.redirect('back');
        } else {
            res.render('campgrounds/show', { campground: campground });
        }
    });
});

//edit
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            res.redirect('/campgrounds');            
        }else{
            res.render('campgrounds/edit', {campground: campground});
        }
    });
});

//update
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    geocoder.geocode(req.body.location, function (err, data) {
        const lat = data.results[0].geometry.location.lat;
        const lng = data.results[0].geometry.location.lng;
        const location = data.results[0].formatted_address;
        const newData = { name: req.body.name, image: req.body.image, description: req.body.description, price: req.body.price, location: location, lat: lat, lng: lng };
        Campground.findByIdAndUpdate(req.params.id, newData, function (err, campground) {
            if (err) {
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                req.flash('success', `Campground '${campground.name}' successfully updated!`);
                res.redirect("/campgrounds/" + campground._id);
            }
        });
    });
});

//delete
router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err, campground) => {
        if (err) {
            res.redirect('/campgrounds/' + req.params.id);
        }else{
            req.flash('error', `Campground '${campground.name}' successfully deleted!`);
            res.redirect('/campgrounds');
        }
    });
});

module.exports = router;