const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.createPost = async function(req, res) {
    // console.log(req.body);
    try {
        let post = await Post.create(req.body);
        console.log(req.xhr);

        //check if req is an xml http request ie AJAX req
        if (req.xhr) {
            post = await post.populate('author', 'name').execPopulate();
            //  console.log(post);
            //return json
            return res.status(200).json({
                data: {
                    post: post
                },
                message: 'Post created'
            })
        }

        req.flash('success', 'Post created!');
        return res.redirect('back');
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }

}


module.exports.deletePost = async function(req, res) {

    try {
        let post = await Post.findById(req.query.id);
        if (post) {
            if (req.user.id == post.author) {
                post.remove();
                await Comment.deleteMany({ post: req.query.id });

                //check if req is ajax
                if (req.xhr) {
                    return res.status(200).json({
                        data: {
                            post_id: req.query.id
                        },
                        message: 'Post deleted!'
                    })
                }

                req.flash('success', 'Post deleted!')

                return res.redirect('back');

            } else {
                console.log('post cant be deleted');
                req.flash('error', 'Post cannot be deleted!')

                return res.redirect('back');
            }


        }
    } catch (err) {
        console.log('err', err);
        return;
    }

};