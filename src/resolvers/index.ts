import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { JwtHelpers } from "../utils/jwtHelper";
import config from "../config";

const prisma = new PrismaClient()

 interface userinfo {
    name : string,
    email : string,
    password : string
  }

export  const resolvers = {

   Mutation:{
    signup: async (parent : any, args:userinfo, context:any) => {
    
      const isExist = await prisma.user.findFirst({
        where : {
          email : args.email
        }
      })

      if(isExist){
        return{
          message : "This email already registered",
          token : null
        }
      }

      const hashPassword = await bcrypt.hash(args.password, 12)
      const newUser = await prisma.user.create({
        data : {
          name : args.name,
          email : args.email,
          password : hashPassword
        }
      })

      const token = JwtHelpers({userId : newUser.id});
      return {
        token,
        message : "user successfully login"
      }
    },
    //  -----log in ----
    signIn: async(parent : any , args : any, context:any) =>{
       
      const user = await prisma.user.findFirst({
        where : {
          email : args.email
        }
      });

      if(!user){
        return {
          message : "email incorrect",
           token : null
         
        }
      }
        // --- password checking --
      const correctPassword = await bcrypt.compare(args.password, user.password)
      if(!correctPassword){
        return{
          message : "password incorrect",
           token : null
        }
      }

      // ---- everything ok ----
      // const token = jwt.sign({userId : user.id}, "signature", {expiresIn: "2d"});
      const token = JwtHelpers({userId : user.id}, config.jwt.secret );

      return {
        token,
        message : "user successfully login"
      }
    }

  },
  
  
  Query: {
    users : async(parent : any, args:any, context:any) => {
      return await prisma.user.findMany()
    
    }
   
  },

 
};
