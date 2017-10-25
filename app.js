require('dotenv').config();

const   express             = require('express'),
        app                 = express(),
        path                = require('path'),
        bodyParser          = require('body-parser'),
        mongoose            = require('mongoose'),
        flash               = require('connect-flash'),
        passport            = require('passport'),
        LocalStrategy       = require('passport-local'),
        Campground          = require('./models/campground'),
        Comment             = require("./models/comment"),
        User                = require('./models/user'),
        seedDB              = require("./seeds"),
        expressSession      = require('express-session'),
        indexRoutes         = require('./routes/index'),
        campgroundsRoutes   = require('./routes/campgrounds'),
        commentsRoutes      = require('./routes/comments'),
        methodOverride      = require('method-override')

// avoid mongoose console msg 
mongoose.Promise = global.Promise;
//body-parser declaration
app.use(bodyParser.urlencoded({ extended: true }));
//database connection
mongoose.connect('mongodb://localhost/yelp_camp_app_v13', { useMongoClient: true });
//views engine setup
app.set('view engine', 'ejs');
//static assets
const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));
app.use(methodOverride('_method'));
app.use(flash());
//reset DB
// seedDB();
//Passport Configuration
app.use(expressSession({
    secret: 'Extraño mucho a mi Pacho',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    app.locals.moment = require('moment');
    next();
});

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundsRoutes);
app.use('/campgrounds/:id/comments', commentsRoutes);


// Run server
app.listen(3000, 'localhost', function(){
    console.log('YelpCamp Server started');
})