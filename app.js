const express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require("./models/comment"),
    seedDB = require("./seeds")

// avoid mongoose console msg 
mongoose.Promise = global.Promise;

//body-parser declaration
app.use(bodyParser.urlencoded({ extended: true }));

//database connection
mongoose.connect('mongodb://localhost/yelp_camp_app', { useMongoClient: true });

//views engine setup
app.set('view engine', 'ejs');

//static assets
app.use(express.static( __dirname + "/public"));

//reset DB
seedDB();

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
    //get all campgrounds
    const campgrounds = Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log('Error: ' + err);
        } else {
            res.render('campgrounds/index', {campgrounds: campgrounds});
        }
    });
});

app.post('/campgrounds', function(req, res){
    const name = req.body.name;
    const description = req.body.description;
    const image = req.body.image;
    const newCampground = {name: name, description: description, image:image}

    //Create Campgrouns in DB
    Campground.create(newCampground, 
        function (err, campground) {
            if (err) {
                console.log(err);
            } else {
                console.log('New Campground added:');
                console.log(campground);
            }
        });
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function (req, res) {
    res.render('campgrounds/new');
});

app.get('/campgrounds/:id', function(req, res){
    const campground = Campground.findById(req.params.id).populate('comments').exec(function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/show', { campground: campground });
        }
    });
});

app.get('/campgrounds/:id/comments/new', function(req, res){
    const campground = Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err)
        }else{
            res.render('comments/new', {campground: campground});
        }
    })
    
});

app.post('/campgrounds/:id/comments', function(req, res){
    const campground = Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(error);
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if (err){
                    console.log(err)
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    })
});

app.listen(3000, 'localhost', function(){
    console.log('YelpCamp Server started');
})