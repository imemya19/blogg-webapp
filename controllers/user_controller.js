const User = require('../models/user');
const Post = require('../models/post');
const fs = require('fs');
const path = require('path');

module.exports.userhomepage = function(req, res) {
    return res.render('users/userlandingpage');
};

module.exports.signin = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/userprofile');
    }
    return res.render('users/signin');
};

module.exports.userprofile = function(req, res) {
    return res.render('users/userprofilepage');
};

//parser wont be able to parse dataa as it is multipart form now
//so we'll use multer and statically defines functions
module.exports.updateProfile = async function(req, res) {
    try {
        let userId = req.query.id;
        let user = await User.findById(userId);
        //cant read req.body data without multer now!!
        await User.uploadedAvatar(req, res, function(err) {

            if (err) {
                console.log('multer error:', err);
            }
            console.log(req.file);

            user.name = req.body.name;
            user.email = req.body.email;

            if (req.file) {
                if (user.avatar ) {
                    //for deleting we'll need 'fs and path'
                    fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                }
                //saving the path of the uploaded file in the avatar field in model user
                user.avatar = User.avatarPath + '/' + req.file.filename;
            }
            user.save();
            return res.redirect('back')
        });

    } catch (err) {
        console.log('error', err);
        return;
    }

};

module.exports.timeline = async function(req, res) {

    try {
        let posts = await Post.find({})
            .sort('createdAt')
            .populate('author')
            .populate({
                path: 'comments',
                populate: { path: 'author' }
            });


        return res.render('users/user_timeline', {
            post_list: posts,
        });
    } catch (err) {
        console.log('error', err);
        return;
    }

};

module.exports.signup = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/userprofile');
    }
    res.render('users/signup');
};



module.exports.createUser = async function(req, res) {
    try {
        if (req.body.password !== req.body.confirm_password) {
            return res.redirect('back');
        }

        let user = await User.findOne({ email: req.body.email });

        if (user) {
            console.log('user already exists! try signing in');
            return res.redirect('back');
        } else {
            let user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            console.log('yay user created in db')
            return res.redirect('/users/signin');
        }
    } catch (err) {
        req.flash('error', 'User couldnt be created')
        console.log('error', err)
        return;
    }


};

module.exports.createSession = function(req, res) {
    req.flash('success', 'logged in successfully');
    return res.redirect('/users/userprofile');
};

module.exports.destroySession = function(req, res) {
    req.logout();
    req.flash('success', 'logged outt ');

    return res.redirect('/users');
};