const express = require('express');
const router = express.Router();
 const ContactListController = require('../controllers/contact_list_controller');


router.get('/', ContactListController.contactList); // /contact_list/
router.post('/add-contact',ContactListController.addContact);
router.get('/delete-contact/',ContactListController.deleteContact)


module.exports = router;
