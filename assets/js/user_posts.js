{
    let createPost = function(){
    let newPostForm = $('#new-post-form');
    console.log(newPostForm);
    newPostForm.submit(function(e){
         e.preventDefault();

         $.ajax({
           url:'/posts/create',
           type:'POST',
           data:newPostForm.serialize(),
           success:function(data){
               let newPost = newPostDom(data.data.post);
               $('#posts-list-container>ul').prepend(newPost);
               deletePost($(' #post-delete-button',newPost))
            console.log(data);
           },error:function(error){
            console.log(error.responseText);
           }
         })
    })
   }


let newPostDom = function(post){
    return $(`<li id="post-${post._id}">
    
            <small>
                    <a id="post-delete-button" href="/posts/destroy/${post._id}">X</a>
            </small>
           
                    ${post.content}
                    ${post.user.name}

                    <div class="post-comments">
                   
                        <form action="/comments/create"
                                method="POST">
                        <input type="text"
                                        name="content"
                                        placeholder="Type Here to add comment...">
                                <input type="hidden"
                                        name="post"
                                        value="<%= post._id %>">
                                <input type="submit"
                                        value="Add Comment">
                        </form>
                       
                                <div class="post-comments-list">
                                        <ul class="post-comments-${ post.id }">
                                           
                                        </ul>
                                </div>                      
                    </div>      
</li>`)
}

let deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();
        
        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
                console.log(data);
                $(`#post-${data.data.post_id}`).remove();

            },error:function(error){
                console.log("error in deleting post",error.responseText);
            }

        })
    })
}
createPost();

}

