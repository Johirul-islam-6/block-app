

export const CreatePost = {

    // ---- create a post ---
    addPost: async (parent : any, {post} : any, {prisma, userInfo} : any) =>{

     if(!userInfo){
      return{
        userError : "Unathorized Parson",
        post : null
      }
     }
      
     if(!post.title || !post.content){
       return{
        userError : "title and content is required",
        post : null
      }
     }

    //  --- create database a post ---- 
     const postData =  await prisma.post.create({
      data: {
        title : post.title,
        content : post.content,
        authorId : userInfo.userId.userId
      }
     })

     return {
      userError : null,
      post : postData
     }
    },



    // ----- update post -----
   updatePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
       
    if(!userInfo){
      return{
        userError : "Unathorized Parson",
        post : null
      }
     }

     const user = await prisma.user.findUnique({
      where : {
        id : userInfo.userId.userId
      }
     })

     if(!user){
      return{
        userError : "User not found",
        post : null
      }
     }

     const post = await prisma.post.findUnique({
      where : {
        id : Number(args.postId)
      }
     })

     if(!post){
      return{
        userError : "Post not found!",
        post : null
      }
     }

     if(post.authorId !== user.id){
      return {
        userError : "This post your are not creator"
      }
     }

     const updatedPost = await prisma.post.update({
      where : {
        id : Number(args.postId)
      },
      data : args.post

     })
     

     return{
      userError : null,
      post : updatedPost
     }

       
    } ,
    
    // ------ publisht post -----

    publishPost: async (parent: any, args: any, { prisma, userInfo }: any) =>{
     
      
    if(!userInfo){
      return{
        userError : "Unathorized Parson",
        post : null
      }
     }

     const user = await prisma.user.findUnique({
      where : {
        id : userInfo.userId.userId
      }
     })

     if(!user){
      return{
        userError : "User not found",
        post : null
      }
     }

     const post = await prisma.post.findUnique({
      where : {
        id : Number(args.postId)
      }
     })

     if(!post){
      return{
        userError : "Post not found!",
        post : null
      }
     }

     if(post.authorId !== user.id){
      return {
        userError : "This post your are not creator"
      }
     }



       const checkingPost = await prisma.post.findUnique({
      where : {
        id : Number(args.postId)
      },
     
     })
     

     if(checkingPost.published){
      return{
        userError: "Already published post"
      }
     }

     const publishPost = await prisma.post.update({
      where : {
        id : Number(args.postId)
      },
      data : {
        published : true
      }

     })
     

     return{
      userError : null,
      post : publishPost
     }


    },

     // ----- delete post -----
   deletePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
       
    if(!userInfo){
      return{
        userError : "Unathorized Parson",
        post : null
      }
     }

     const user = await prisma.user.findUnique({
      where : {
        id : userInfo.userId.userId
      }
     })

     if(!user){
      return{
        userError : "User not found",
        post : null
      }
     }

     const post = await prisma.post.findUnique({
      where : {
        id : Number(args.postId)
      }
     })

     if(!post){
      return{
        userError : "Post not found!",
        post : null
      }
     }

     if(post.authorId !== user.id){
      return {
        userError : "This post your are not creator"
      }
     }

     const deletePost = await prisma.post.delete({
      where : {
        id : Number(args.postId)
      }
     })

     

     return{
      userError : null,
      post : deletePost
     }

       
    } 
} 