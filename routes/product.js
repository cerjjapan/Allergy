const express = require('express');
const axios = require('axios');
const router = express.Router();
const Product = require('../models/product');
// var middleware = require("../middleware");

//CREATE - add new product to DB
router.post('/', function(req, res) {
  const productName = req.body.productName;
  const image = req.body.image;
  const comment = req.body.comment;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  // call maps api
  axios
    .post(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDf5MbHbSZWuR-r6GWaWtUMsr5eXoj0ImE`
    )
    .then(data => {
      console.warn({ data });

      const newProduct = {
        productName: productName,
        image: image,
        comment: comment,
        location: {
          address: '',
          latitude: '',
          longitude: ''
        }
      };
      //Create a new Product and save to DB
      Product.create(newProduct, function(err, newlyCreated) {
        if (err) {
          console.error(err);
        } else {
          res.send({ message: 'Product created' });
        }
      });
    });

  // end call maps api
});

// SHOW - Delivers product data to React-native
router.get('/:id', function(req, res) {
  Product.find({ userId: req.params.id }).exec(function(err, foundProducts) {
    if (err) {
      console.error(err);
    } else {
      console.error(foundProducts);
      res.send(foundProducts);
    }
  });
});

//DELETE - Deletes product from database
router.delete('/:id', function(req, res) {
  Product.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.error(err);
    } else {
      res.send({ message: 'Product deleted' });
    }
  });
});

//Update product route
router.put('/:id', function(req, res) {
  //find and update the correct product
  console.error(1, req.body.product);
  Product.findByIdAndUpdate(
    req.params.id,
    req.body.product,
    { new: true },
    function(err, updatedProduct) {
      console.error(2, updatedProduct);
      if (err) {
        console.error(err);
      } else {
        res.send(updatedProduct);
      }
    }
  );
});

module.exports = router;
