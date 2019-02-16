require('dotenv').load();
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
    //   passport = require('passport'),
    //   LocalStrategy = require('passport-local'),
      methodOverride = require('method-override'),
      Product = require('./models/product');
    //   User = require('./models/user');
// seedDB          = require("./seeds")

//Requiring Routes

const productRoutes = require('./routes/product');
const imageRoutes = require('./routes/image');

app.get('/', (req, res) => {
  res.send({
    here: 'is',
    some: 'cool',
    data: '.'
  });
});

mongoose.connect(
  'mongodb://cerjjapan:JunctionAllergy2019@ds237955.mlab.com:37955/allergy'
);
app.set('view engine', 'ejs');
app.use(express.static('/public'));
// app.use(methodOverride('_method'));



app.enable('trust proxy');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.use("/product", productRoutes);
app.use('/image', imageRoutes);
app.listen(process.env.PORT, process.env.IP, function() {
  console.warn(
    'Allergy Server has started on http://localhost:' + process.env.PORT
  );
});
