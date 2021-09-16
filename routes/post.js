const express = require('express');
const router = express.Router();
const passport = require('passport');
const PostController = require('../controllers/posts_controller');
router.post('/create-post', passport.checkAuthentication, PostController.createPost);
router.get('/delete-post', passport.checkAuthentication, PostController.deletePost);
router.use('/comments', require('./comment'));
module.exports = router;