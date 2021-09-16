{
    //method to submit the form data for new post using AJAX


    let createPost = function() {
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/users/posts/create-post',
                data: newPostForm.serialize(),
                success: function(data) {
                    // console.log(data);
                    let newPost = displayNewPostInDOM(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    new Comments(data.data.post._id);

                    new Noty({
                        theme: 'relax',
                        text: 'Post created!!',
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

    };


    //method to create a post in DOM
    let displayNewPostInDOM = function(p) {
        return $(`
 <li id="post-id-${p._id}">
    <div style=" background-color: mediumspringgreen; margin:10px; padding:10px;">
            <a class="delete-post-button" style="float:right;" href="/user/posts/delete-post/?id=${p._id}">
                <i class="fas fa-trash"></i>
            </a>

                <p style="color: coral;">
                    ${ p.content }
                </p>
                <p style="font-weight: bolder; font-size: x-small; ">
                    -by
                    ${p.author.name  }
                </p>
                <div>

                        <form action="/user/posts/comments/add-comment" method="post"  id="new-comment-form-postid-${ p._id}">
                            <input type="text" name="content" placeholder="Enter a comment" required>
                            <input type="hidden" name="post" value="${ p._id }">

                            <input type="submit" value="Add comment">
                        </form>

                </div>
                <div id="comment-list-container-postid-${p._id}">
                    <ul>
                      
                    </ul>
                </div>
            
    </div>

</li>      
        `);
    };


    //method to delete a post from DOM
    let deletePost = function(deleteLink) {
        $(deleteLink).click(function(e) {
            e.preventDefault();


            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data) {
                    $(`#post-id-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: 'Post deleted!!',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },
                error: function(error) {
                    console.log(error.responseText);
                }
            })
        })
    }


    //convert existing posts to AJAX
    let convertPostsToAjax = function() {
        $('#post-list-container>ul>li').each(function() {
            let self = $(this);
            let deleteButtonLink = $(' .delete-post-button', self);
            deletePost(deleteButtonLink);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[2]
            new Comments(postId);
        })
    };



    createPost();
    convertPostsToAjax();

}