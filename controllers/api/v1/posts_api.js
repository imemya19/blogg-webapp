const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){
    
    let posts = await Post.find({})
    .sort('createdAt')
    .populate('author')
    .populate({
        path: 'comments',
        populate: { path: 'author' }
    });

    return res.json(200,{
        message:'list of posts',
        posts:posts
    })
};


module.exports.deletePost = async function(req, res) {
console.log('hii')
    try {
        let post = await Post.findById(req.params.id);
        console.log(post.author);
        console.log(req.user.id);
        if(post.author == req.user.id) {
                post.remove();
                await Comment.deleteMany({ post: req.params.id });

                return res.json(200,{
                    message:"post and assoiatecd comments deleetd"
                }); 
        }
        else{
            return res.json(401,{
                message:"you cant delete this post"
            })
        }
    } catch (err) {
        console.log('err', err);
        return res.json(500,{
            message:'error'
        });
    }

};