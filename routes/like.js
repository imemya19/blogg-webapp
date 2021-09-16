const express = require('express');
const router = express.Router();


const passport = require('passport');


const LikeController = require('../controllers/likes_controller');

router.post('/toggle', LikeController.toggleLike);


module.exports = router;