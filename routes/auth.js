var express = require('express');
var router = express.Router();
const User = require('../model/User.model');
const passport = require('passport');
const bcrypt = require('bcrypt');
const isAuthenticated = require('../utils/AuthFunction')

/**
 * Create New User.
 * Email, Password - Authenticate
 */
router.post('/', async (req, res, next) => {
  const email = req.body.email;
  const hashedPass = await bcrypt.hash(req.body.password, 5);

  detail = {email: email, password: hashedPass};

  const user = new User(detail);
  user.save().then(data => res.json(data))
  .catch(err => res.json(err));
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});


router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(data => {
      res.json({
        user: data,
        success: true,
      });
    })
    .catch(err => {
      res.json({
        error: err,
        success: false
      })
    })
})

/**
 * Authenticate Using Facebook
 * Still Broken Need to fix this.
 */
router.get('/auth/facebook', passport.authenticate("facebook"), (req, res) => {
  res.send(req.user);
});

router.get('/auth/facebook/callback', 
  passport.authenticate("facebook", {failureMessage:"Failed to authenticate with fb"}),
  (req, res) => {
    res.json({user: req.user})
})

module.exports = router;
