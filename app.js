require('dotenv').load();
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  methodOverride = require('method-override'),
  // Product = require('./models/product'),
  // Comment = require('./models/comment'),
  User = require('./models/user');
// seedDB          = require("./seeds")

//Requiring Routes
// const loginRoutes = require('./routes/login');

app.get('/', (req, res) => {
  res.send({
    here: 'is',
    some: 'cool',
    data: '.'
  });
});

mongoose.connect('mongodb://localhost/allergyApp');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

app.locals.moment = require('moment');

//  PASSPORT CONFIGURATION
app.use(
  require('express-session')({
    secret: 'Blade Runner is the best movie!',
    resave: false,
    saveUninitialized: false
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.use("/", indexRoutes);
// app.use("/campgrounds", campgroundRoutes);
// app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
  console.warn(
    'Allergy Server has started on http://localhost:' + process.env.PORT
  );
});
