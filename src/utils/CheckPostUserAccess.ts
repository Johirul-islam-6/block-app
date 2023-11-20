

export const CheckPostUserAccess = async (prisma : any, userId: any, postId: any) =>{

  console.log(userId, postId, "this is id or ")

    const user = await prisma.user.findUnique({
      where : {
        id : userId
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
        id : Number(postId)
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
}