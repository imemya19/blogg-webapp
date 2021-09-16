const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user_controller');
const passport = require('passport');

router.get('/', UserController.userhomepage); // /user/
router.get('/signin', UserController.signin);
router.get('/userprofile', passport.checkAuthentication, UserController.userprofile);
router.get('/signup', UserController.signup);
router.post('/create-session', passport.authenticate(
        'local', {
            failureRedirect: '/users/signin'
        }),
    UserController.createSession);
router.post('/create-user', UserController.createUser);
router.get('/signout', UserController.destroySession);
router.get('/timeline', passport.checkAuthentication, UserController.timeline);
router.post('/update-profile', passport.checkAuthentication, UserController.updateProfile);
router.use('/posts', require('./post'));



router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/signin'}),UserController.createSession);

module.exports = router;