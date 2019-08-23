const express = require('express');
const User = require('../models/User.js')
const router = express.Router();

// @route GET api/users
// @desc Get all users
// @access Public

router.get('/', (req, res) => {

  User.find()
    .sort({ date: -1 })

    .then(user => {

      res.json(user);

    })

});


// @route POST api/users
// @desc Create user
// @access Public

router.post('/', (req, res) => {

  const newUser = new User({
    name: req.body.name,
    dateOfBirth: req.body.dateOfBirth,
    sin: req.body.sin,
    deed: req.body.deed,
    file: req.body.file
  });

  newUser.save().then(user => {
    res.json(user);
  });

});

// @route POST api/users/:id
// @desc Delete user
// @access Public

router.delete('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.remove().then(() => {
        res.json(user._id);
      });
    })
    .catch(err => res.status(404).json({ success: false }));

});

const multer = require('multer');
const fs = require('fs-extra');

const upload = multer({

  storage: multer.diskStorage({

    destination: function (req, file, callback) {
      const _id = req.params.id;
      const path = `./files/${_id}/`;
      fs.mkdirsSync(path);
      callback(null, path);
    },

    filename: function (req, file, callback) {
      //originalname is the uploaded file's name with extn
      callback(null, file.originalname);
    }
  })

});


// @route POST api/users/:id
// @desc upload file
// @access Public

router.post('/:id/upload/', upload.single('file'), (req, res, next) => {
  try {
    res.send(req.file);
  } catch (err) {
    res.send(400);
  }
});

module.exports = router;