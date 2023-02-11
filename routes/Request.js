const express = require('express');
const UserModel = require('../model/User.model'); 
const { isAuthenticated } = require('../utils/AuthFunction')

const router = express.Router();
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
    if (req.user.friend.includes(req.params.id)) {
        res.json({
            message: "You are already friends",
        })
    } else {
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
    }
})

// Accept a request.
router.put("/accept/:id", (req, res, next) => {
    if (!req.user.Request.includes(id)) {
        res.json({
            message: "Not Friend Request found",
        })
    }
    UserModel.updateOne(
        {_id: req.user._id}, 
        { 
            $push: {friend: req.params.id},
            $pull: {Request: req.params.id}
        }
    )
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        res.json({error: err});
    })
    UserModel.updateOne(
        {_id: req.params.id},
        {
            $push : {friend: req.user._id},
        }
    )
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({error: err});
    })
})

// delete a request.
router.put('delete/:id', (req, res, next) => {
    UserModel.updateOne(
        {_id: req.user.id},
        { $pull: {Request: req.user.id}}
    )
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    })
})


module.exports = router;