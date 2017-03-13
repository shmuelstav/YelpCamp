/**
 * Created by shmuel on 3/13/2017.
 */



var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cats');

var Cats = mongoose.Schema({
    name: String,
    age: Number
});

var Cat = mongoose.model('Cat',Cats );

var kitty = new Cat({
    name: 'Zildjian',
    age: 14
});

kitty.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('meow');
    }
});

//dfvrtbtbyt