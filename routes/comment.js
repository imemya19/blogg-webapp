const express = require('express');
const router = express.Router();
const passport = require('passport');

const CommentController = require('../controllers/comments_controller');

router.post('/add-comment', passport.checkAuthentication, CommentController.addComment);
router.get('/delete-comment', passport.checkAuthentication, CommentController.deleteComment);
module.exports = router;