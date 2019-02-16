const express = require('express');
const router = express.Router({ mergeParams: true });
const multer = require('multer');

router.post('/upload', (req, res) => {
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
    console.warn({ imgUrl });
    res.send(imgUrl);
  });
});

module.exports = router;
