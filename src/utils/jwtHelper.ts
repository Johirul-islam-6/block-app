import jwt, { Secret } from 'jsonwebtoken'
export const JwtHelpers = (payload : {userId : number}, secret : Secret) =>{
      const token = jwt.sign({userId : payload}, secret, {expiresIn: "2d"});
      return token;
}