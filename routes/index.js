var express = require('express');
var router = express.Router();
const User = require('../model/User');
const passport = require('passport');
const bcrypt = require('bcrypt');

const LocalStrategy = require('../config/passport-local');

passport.use(LocalStrategy);

const isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  }
  res.send({message: "No Permission"});
}

/* GET home page. */
router.post('/', async (req, res, next) => {
  const email = req.body.email;
  const hashedPass = await bcrypt.hash(req.body.password, 5);

  detail = {email: email, password: hashedPass};

  const user = new User(detail);
  user.save().then(data => res.json(data))
  .catch(err => res.json(err));
});

router.post('/login', passport.authenticate("local"));

router.get("/r", isAuthenticated, (req, res, next) => {
  res.send({
    data: "THis is imp data",
  })
})

module.exports = router;
