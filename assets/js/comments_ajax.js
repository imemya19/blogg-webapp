class Comments {
    constructor(postid) {
        this.postId = postid;
        this.parentPost = $(`#post-id-${postid}`);
        this.ParentCommentForm = $(`#new-comment-form-postid-${postid}`);
        this.createComment(postid);

        let self = this;
        $(' .delete-comment-button', this.parentPost).each(function() {
            self.deleteComment($(this));
        });


    }


    createComment(postId) {

        let postSelf = this;
        this.ParentCommentForm.submit(function(e) {
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/users/posts/comments/add-comment',
                data: $(self).serialize(),
                success: function(data) {
                    console.log(data);
                    let newComment = postSelf.displayNewCommentInDOM(data.data.comment);
                    $(`#comment-list-container-postid-${postId}>ul`).prepend(newComment);
                    postSelf.deleteComment($(' .delete-comment-button', newComment));
                    new Noty({
                        theme: 'relax',
                        text: 'Comment created!!',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();

                },
                error: function(error) {
                    console.log(eror.responseText);
                },

            });
        });
    }
    displayNewCommentInDOM(c) {
        return $(`
        <li id="comment-id-${ c._id}">

            <div style="background-color: cornsilk;">

            <a class="delete-comment-button" style="float:right;" href="/user/posts/comments/delete-comment/?id=${c._id}">
                <i class="fas fa-times"></i>
            </a>

            <p style="font-weight: bolder; font-size: x-small; ">
                ${c.content}
                    <small>-by ${ c.author.name } </small>

            </p>
            </div>
        </li>
    `)
    }

    deleteComment(deleteLink) {
        $(deleteLink).click(function(e) {
            e.preventDefault();


            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data) {
                    $(`#comment-id-${data.data.comment_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: 'Comment deleted!!',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },
                error: function(error) {
                    console.log(error.responseText);
                }
            });
        });

    }
}