const mongoose  = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


const ProductSchema = new mongoose.Schema({
    productname: String,

});

ProductSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Product", ProductSchema);