// {
//     let createPost = function(){
//     let newPostForm = $('#new-post-form');
//     console.log(newPostForm);
//     newPostForm.submit(function(e){
//          e.preventDefault();

//          $.ajax({
//            url:'/posts/create',
//            type:'POST',
//            data:newPostForm.serialize(),
//            success:function(data){
//                let newPost = newPostDom(data.data.post);
//                $('#posts-list-container>ul').prepend(newPost);
//            },error:function(error){
//             console.log(error.responseText);
//            }
//          })
//     })
//    }

//    let newPostDom = function(post){
//       return $(`<li id="post-${post._id}">
       
//                 <small>
//                         <a id="delete-post-button" href="/posts/destroy/${ post._id }">delete</a>
//                 </small>
//                 ${ post.content }
//                 ${ post.user.name }
//                 <div class="post-comments">
//                 <form action="/comments/create"
//                 method="POST">
//                 <input type="text"
//                         name="content"
//                         placeholder="Type Here to add comment...">
//                 <input type="hidden"
//                         name="post"
//                         value="${ post._id }">
//                 <input type="submit"
//                         value="Add Comment">
//                 </form>     
                                    
//                 <div class="post-comments-list">
//                 <ul class="post-comments-${ post._id }">
                    
//                 </ul>
//                  </div> 
                                            
                                                       
                                                                
//                         </div>      
//     </li>`)
//    }
// createPost();

// }