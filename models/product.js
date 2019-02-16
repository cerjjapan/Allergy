const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const ProductSchema = new mongoose.Schema({
            productName: { type: String, required: true },
            image: { type: String, required: true },
            comment: { type: String, required: true},
            });
    

        ProductSchema.plugin(passportLocalMongoose);

        module.exports = mongoose.model('Product', ProductSchema);