const express = require('express');
const async = require('async');
const PostModel = require('../model/Post');
const {isAuthenticated} = require('../utils/AuthFunction')

const router = express.Router();
router.use(isAuthenticated);

// Create a new Post.
router.post('/', (req, res, next) => {
  detail = {
    author: req.user._id,
    img: req.body?.img,
    content: req.body?.content,
  }

  const post = new PostModel(detail);
  post.save()
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

// Get all User Posts.
router.get('/', (req, res, next) => {
  PostModel.find({author: req.user._id})
    .then(data => res.json(data))
    .catch(err => res.json(err));
})

// Get a user Post.
router.get('/:id', (req, res, next) => {
  PostModel.find({author: req.params.id})
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

// Likes a Post.
router.post('/like/:id', (req, res, next) => {
      PostModel.updateOne(
        {_id: req.params.id},
        { $addToSet: {likes: req.user._id}}
      ).then(data => {
        res.json(data);
      })
      .catch(err => res.json(err));
})

// Unlikes a Post.
router.delete('/like/:id', (req, res, next) => {
  PostModel.updateOne(
    {_id: req.params.id},
    { $pull : {likes: req.user._id}}
  )
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.json(err);
  })
})

module.exports = router;