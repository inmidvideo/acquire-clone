var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

/*-----------------------------------------------------------------------------
  user schema
-----------------------------------------------------------------------------*/
var User = new mongoose.Schema({}, {collection: 'users'});

/*-----------------------------------------------------------------------------
  export model
-----------------------------------------------------------------------------*/
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);

