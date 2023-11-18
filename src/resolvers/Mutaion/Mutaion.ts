import { CreatePost } from "./AddPost"
import { authResolver } from "./Auth"

export const  Mutation={

     ...authResolver,
     ...CreatePost,

  }