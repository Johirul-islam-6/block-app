import jwt, { Secret } from 'jsonwebtoken'
import config from '../config';
 const genarateToken = (payload : {userId : number}, secret : Secret) =>{
      const token = jwt.sign({userId : payload}, secret, {expiresIn: "2d"});
      return token;
}

const getUserInfoFromUser = async (token : string) =>{
      try {
            
            const userData = jwt.verify(token, config.jwt.secret as string) as {
                  userId : number
            }
            return userData;

      } catch (error) {
            return null
      }
}



export const JwtHelpers ={
genarateToken,
getUserInfoFromUser
}