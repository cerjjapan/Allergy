require('dotenv').load();
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  multer = require('multer'),
  // methodOverride = require('method-override'),
  // Product = require('./models/product'),
  // Comment = require('./models/comment'),
  User = require('./models/user');
// seedDB          = require("./seeds")

//Requiring Routes
// const loginRoutes = require('./routes/login');

mongoose.connect(
  'mongodb://cerjjapan:JunctionAllergy2019@ds237955.mlab.com:37955/allergy'
);
app.set('view engine', 'ejs');
app.use(express.static('/public'));
// app.use(methodOverride('_method'));

// app.locals.moment = require('moment');

//  PASSPORT CONFIGURATION
app.use(
  require('express-session')({
    secret: 'Blade Runner is the best movie!',
    resave: false,
    saveUninitialized: false
  })
);

app.enable('trust proxy');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
  res.send({
    here: 'is',
    some: 'cool',
    data: '.'
  });
});

app.post('/uploadPhoto', (req, res) => {
  console.warn({ body: req.body });
  const Storage = multer.diskStorage({
    destination: './public/photos',
    filename(req, file, callback) {
      console.warn({ file });
      callback(null, 'test-photo.jpg');
    }
  });
  console.warn('passed storage...');
  console.warn({ Storage });
  const upload = multer({
    storage: Storage,
    fileFilter: function(req, file, cb) {
      console.warn({ file });
      if (file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
        return res.send({
          error: 'Only .jpg and .jpeg files can be uploaded.'
        });
      }
      cb(null, true);
    }
  }).array('test-photo.jpg', 1);
  console.warn('passed upload...');
  console.warn({ upload });
  upload(req, res, err => {
    console.warn('entered upload function...', { file: req.file, err });
    if (err) {
      return res.send({
        error: 'There was an error uploading your image.'
      });
    }
    console.warn('uploaded or error');
    const imgUrl = 'https://allergynode.herokuapp.com/photos/test-photo.jpg';
    return res.send({ imgUrl: imgUrl });
  });
});

// app.use("/", indexRoutes);
// app.use("/campgrounds", campgroundRoutes);
// app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
  console.warn(
    'Allergy Server has started on http://localhost:' + process.env.PORT
  );
});
