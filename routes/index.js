const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/home_controller');

router.use('/users',require('./user'));
router.use('/contact_list',require('./contact_list'));
router.use('/likes',require('./like'));

router.get('/', HomeController.home);


//**** 
router.use('/api',require('./api'));
module.exports = router;
