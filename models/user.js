const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
<<<<<<< HEAD
  username: { type: String, required: true },
  password: { type: String, required: true },
  allergies: { type: Array, default: [] }
=======
    username: { type: String, required: true },
    password: { type: String, required: true },
    allergies: { type: Array, default: [] }
>>>>>>> 4ab9f05e3630b44e13145b0fcb0e78f48f98ee59
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
