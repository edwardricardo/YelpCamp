const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

/*const data = [
    {
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "blah blah blah"
    },
    {
        name: "Desert Mesa",
        image: "https://www.visitnc.com/resimg.php/imgcrop/2/52908/image/800/448/KerrCamping.jpg",
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "blah blah blah"
    }
]*/

const data = [
    { 
        name: 'Medanos de Coro', 
        image: 'http://static.thousandwonders.net/M%C3%A9danos.de.Coro.National.Park.640.8081.jpg', 
        description: 'Bacon ipsum dolor amet leberkas bacon picanha, tenderloin burgdoggen beef ribs pork loin strip steak ham. Porchetta pork rump cow shankle pancetta swine strip steak burgdoggen landjaeger doner. Sirloin andouille pig rump. Drumstick shank ball tip sausage bacon pork loin prosciutto pancetta chicken venison andouille jerky flank ground round. Ham hock corned beef pork chop, pastrami beef ribs pork belly short loin strip steak flank swine spare ribs ham leberkas. Short ribs drumstick salami, andouille cupim ham hock frankfurter chicken.Flank boudin pancetta frankfurter, pastrami doner pork landjaeger ribeye fatback short ribs.Bresaola frankfurter turkey cow. Beef shankle ribeye, andouille corned beef sausage swine prosciutto sirloin salami capicola. Brisket meatloaf pig, porchetta chicken pancetta drumstick.Ham meatball burgdoggen pancetta biltong. Ham hock doner drumstick alcatra pork loin chuck.Turducken pig shankle meatloaf tri- tip.Turkey pancetta chicken meatball venison strip steak pastrami. Ham flank'
    },
    { 
        name: 'Gran Sabana', 
        image: 'https://www.fotopaises.com/Fotos-Paises/t/2007/9/25/4448_1190792688.jpg',
        description: 'Bacon ipsum dolor amet leberkas bacon picanha, tenderloin burgdoggen beef ribs pork loin strip steak ham. Porchetta pork rump cow shankle pancetta swine strip steak burgdoggen landjaeger doner. Sirloin andouille pig rump. Drumstick shank ball tip sausage bacon pork loin prosciutto pancetta chicken venison andouille jerky flank ground round. Ham hock corned beef pork chop, pastrami beef ribs pork belly short loin strip steak flank swine spare ribs ham leberkas. Short ribs drumstick salami, andouille cupim ham hock frankfurter chicken.Flank boudin pancetta frankfurter, pastrami doner pork landjaeger ribeye fatback short ribs.Bresaola frankfurter turkey cow. Beef shankle ribeye, andouille corned beef sausage swine prosciutto sirloin salami capicola. Brisket meatloaf pig, porchetta chicken pancetta drumstick.Ham meatball burgdoggen pancetta biltong. Ham hock doner drumstick alcatra pork loin chuck.Turducken pig shankle meatloaf tri- tip.Turkey pancetta chicken meatball venison strip steak pastrami. Ham flank'
    },
    { 
        name: 'Choroni', 
        image: 'http://runrun.es/wp-content/uploads/2015/04/Choron%C3%AD.jpg',
        description: 'Bacon ipsum dolor amet leberkas bacon picanha, tenderloin burgdoggen beef ribs pork loin strip steak ham. Porchetta pork rump cow shankle pancetta swine strip steak burgdoggen landjaeger doner. Sirloin andouille pig rump. Drumstick shank ball tip sausage bacon pork loin prosciutto pancetta chicken venison andouille jerky flank ground round. Ham hock corned beef pork chop, pastrami beef ribs pork belly short loin strip steak flank swine spare ribs ham leberkas. Short ribs drumstick salami, andouille cupim ham hock frankfurter chicken.Flank boudin pancetta frankfurter, pastrami doner pork landjaeger ribeye fatback short ribs.Bresaola frankfurter turkey cow. Beef shankle ribeye, andouille corned beef sausage swine prosciutto sirloin salami capicola. Brisket meatloaf pig, porchetta chicken pancetta drumstick.Ham meatball burgdoggen pancetta biltong. Ham hock doner drumstick alcatra pork loin chuck.Turducken pig shankle meatloaf tri- tip.Turkey pancetta chicken meatball venison strip steak pastrami. Ham flank'
    }
]

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
        //Remove all comments
        Comment.remove({}, function (err) {
            if (err) {
                console.log(err);
            }
            console.log("removed comments!");
            //add a few campgrounds
            data.forEach(function (seed) {
                Campground.create(seed, function (err, campground) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function (err, comment) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            }
                        );
                    }
                });
            });
        });
    });
}

module.exports = seedDB;