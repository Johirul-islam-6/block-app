import config from "../../config"
import { JwtHelpers } from "../../utils/jwtHelper"
import bcrypt from "bcrypt";


 interface userinfo {
    name : string,
    email : string,
    password : string,
    bio : string
  }

export const  Mutation={
    signup: async (parent : any, args:userinfo, {prisma}:any) => {
    
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
          password : hashPassword,
    
        }
      })
      // ----- when bio write a user then create profile -----
      if(args.bio){
        await prisma.profile.create({
          data : {
            bio : args.bio,
            userId : newUser.id
          }
        })
      }

      const token = JwtHelpers({userId : newUser.id},config.jwt.secret as string);
      return {
        token,
        message : "user successfully login"
      }
    },
    //  -----log in ----
    signIn: async(parent : any , args : any, {prisma}:any) =>{
       
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
      const token = JwtHelpers({userId : user.id}, config.jwt.secret as string);

      return {
        token,
        message : "user successfully login"
      }
    }

  }