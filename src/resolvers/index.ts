
import { Query } from "./Query/Query";
import { Mutation } from "./Mutaion/Mutaion";
import { Post } from "./Relations/post";
import { User } from "./Relations/user";
import { Profile } from "./Relations/profile";



export  const resolvers = {

  Mutation,
  Post,
  User,
  Profile,
  Query
  
};
