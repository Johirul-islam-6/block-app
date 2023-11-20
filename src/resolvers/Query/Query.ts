// import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient()
export const Query = {

    me : async(parent : any, args:any, {prisma, userInfo}:any) =>{
      return await prisma.user.findUnique({
        where :{
          id : userInfo.userId.userId
        }
      })
    },
   // ---- get My profile ----

   profile: async(parent : any, args:any, {prisma, userInfo}:any)=>{
    return await prisma.profile.findUnique({
        where :{
          userId : userInfo.userId.userId
        }
      })
   },

  //  ---- get all user ----
    users : async(parent : any, args:any, {prisma}:any) => {
      return await prisma.user.findMany()
    },

  //  ---- get all posts ---
    posts: async (parent : any, args:any, {prisma}:any) =>{
      
      return await prisma.post.findMany({
       
        orderBy: [{
          createdAt : "desc"
        }]
      })
    }
   
  }