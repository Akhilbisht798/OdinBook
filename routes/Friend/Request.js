const express = require('express');
const passport = require('passport');
const UserModel = require('../../model/User'); 
const PostModel = require('../../model/Post');

const router = express.Router();

const isAuthenticated = (req, res, next) => {
    if (req.user) {
      next();
    } else {
        res.send({message: "Authenticate First For Access"});
    }
}

router.use(isAuthenticated);

// Get All User Friend Request.
router.get('/', (req, res, next) => {
    UserModel.findById(req.user._id)
        .then((data) => {
            const { Request } = data;
            res.json(Request);
        })
        .catch(err => {
            res.json({error: err})
        })
});

// Send Request to User.
router.post('/:id', (req, res, next) => {
    UserModel.updateOne(
        {_id: req.params.id},
        { $push: { Request: req.user._id } }
    )
    .then((data) => {
        res.json(data); 
    })
    .catch(err => {
        res.json({error: err});
    })
})

module.exports = router;