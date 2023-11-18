import { CheckPostUserAccess } from "../../utils/CheckPostUserAccess"


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

    //  ----- checking user post parmition ---- 
     const error = await CheckPostUserAccess(prisma, userInfo.userId, args.post)
     if(error){
      return error;
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
    // ----- update post -----
   deletePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
       
    if(!userInfo){
      return{
        userError : "Unathorized Parson",
        post : null
      }
     }

    //  ----- checking user post parmition ---- 
     const error = await CheckPostUserAccess(prisma, userInfo.userId, args.post)
     if(error){
      return error;
     }

     const updatedPost = await prisma.post.delete({
      where : {
        id : Number(args.postId)
      },
      data : args.post
     })

     return{
      userError : null,
      post : updatedPost
     }

       
    } 
    
} 