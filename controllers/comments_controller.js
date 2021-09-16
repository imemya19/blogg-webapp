const Comment = require('../models/comment');
const Post = require('../models/post');
const commentMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue')
const commentEmailWorker = require('../workers/comment_worker')

module.exports.addComment = async function(req, res) {
    // console.log(req.user);

    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                author: req.user._id
            });

            await post.comments.push(comment);
            await post.save();
            
            comment = await comment.populate('author', 'name email').execPopulate();
            
            // commentMailer.newComment(comment);
            let job = queue.create('emails',comment).save(function(err){
                if(err){
                 console.log('err in creating a queue');
                 return;
                }
                console.log('job enqueued',job.id)
            })

            console.log(req.xhr);
            if (req.xhr) {

                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: 'comment created!'
                });
            }

        }
        return res.redirect('back');

    } catch (err) {
        console.log('err', err);
        return;

    }

};

module.exports.deleteComment = async function(req, res) {
    // console.log(req.query);

    try {
        let comment = await Comment.findById(req.query.id);
        if (comment) {
            if (req.user.id == comment.author) {
                var postid = comment.post;
                comment.remove();
                let post = await Post.findByIdAndUpdate(postid, { $pull: { comments: req.query.id } });

                // send the comment id which was deleted back to the views
                if (req.xhr) {
                    return res.status(200).json({
                        data: {
                            comment_id: req.query.id
                        },
                        message: "Comment deleted"
                    });
                }
                return res.redirect('back');
            }
        } else {
            console.log('err in del comment');
            return res.redirect('back');

        }
    } catch (err) {
        console.log('err', err);
        return;
    }

};