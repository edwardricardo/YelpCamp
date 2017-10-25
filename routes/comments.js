const express = require('express'),
    router = express.Router({mergeParams: true}),
    Campground = require('../models/campground'),
    Comment = require('../models/comment'),
    middleware = require('../middleware/index');

router.get('/new', middleware.isLoggedIn, function (req, res) {
    const campground = Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err)
        } else {
            res.render('comments/new', { campground: campground });
        }
    })

});

router.post('/', middleware.isLoggedIn, function (req, res) {
    const campground = Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(error);
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err)
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save(); 
                    campground.comments.push(comment);
                    campground.save();
                    req.flash('success', 'New comment created.');
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    })
});

router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err || !campground) {
            req.flash('error', 'No Campground found.');
            return req.redirect('back');
        }
        Comment.findById(req.params.comment_id, (err, comment) => {
            if (err) {
                res.redirect('back');
            } else {
                res.render('comments/edit', { comment: comment, campground_id: req.params.id });
            }
        });
    });


    
});

router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment) => {
        if (err) {
            res.redirect('back');
        } else {
            req.flash('success', 'Comment updated.');
            res.redirect('/campgrounds/' + req.params.id);            
        }
    })
});

router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err, comment) => {
        if (err) {
            res.redirect('back');
        } else {
            req.flash('success', `Comment deleted.`);
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

module.exports = router;