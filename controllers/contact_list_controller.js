const Contact = require('../models/contact');

module.exports.contactList = async function(req, res) {
    try {
        let contacts = await Contact.find({});
        // console.log(contacts);
        res.render('contact_list', {
            title: 'Contact Book',
            contact_list: contacts,
        });
    } catch (err) {
        console.log('err', err);
        return;
    }
};



module.exports.addContact = function(req, res) {
    // console.log(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, contact) {
        if (err) {
            console.log('error in creating a contact', err);
        }
        return res.redirect('back');
    });
};

module.exports.deleteContact = function(req, res) {
    console.log(req.query);

    Contact.findByIdAndDelete(req.query.id, function(err) {
        if (err) {
            console.log('cannot find thid contact in db', err);
        }
        return res.redirect('back');

    })

};