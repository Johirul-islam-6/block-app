import { userLoader } from "../../dataLoaders/DataLoader"

export const Post ={
    
 author: async (parent: any, args: any, { prisma, userInfo }: any) =>{
//    console.log(parent.authorId)
    return userLoader.load(parent.authorId)
   
}
}

// ----