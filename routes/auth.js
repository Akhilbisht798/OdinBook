var express = require('express');
var router = express.Router();
const User = require('../model/User');
const passport = require('passport');
const bcrypt = require('bcrypt');


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

router.get('/', passport.authenticate('local'), (req, res) => {
  res.send("This is a passport");
});


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

// Checking for authentication
router.get('/res', (req, res) => {
  res.send("Failed Login");
})

module.exports = router;
