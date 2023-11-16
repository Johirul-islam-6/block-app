import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { JwtHelpers } from "../utils/jwtHelper";
import config from "../config";
import { Query } from "./Query/Query";
import { Mutation } from "./Mutaion/Mutaion";

const prisma = new PrismaClient()



export  const resolvers = {

  Mutation,

  Query
  
  
  

 
};
