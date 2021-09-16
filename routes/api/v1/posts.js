const express= require('express');
const router = express.Router();
const passport = require('passport');
const postsApiController = require('../../../controllers/api/v1/posts_api');
console.log('joo')
router.get('/',postsApiController.index);
router.delete('/:id', passport.authenticate('jwt',{session:false}), postsApiController.deletePost)
module.exports=router;