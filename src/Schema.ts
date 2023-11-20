export const typeDefs = `#graphql

    type Mutation {
     
      signup(
      name : String
      email : String
      password : String
      bio : String
     ) : UserToken
     
     signIn(
       email : String
       password : String
     ): UserToken

     addPost(
     post : PostInput!
     ):PostPayload

     updatePost(
      postId : ID!
      post : PostInput!
     ): PostPayload
     
     publishPost(
      postId : ID!
     ):PostPayload
     
     deletePost(
      postId : ID!
     ): PostPayload
  }



  type Query {
    me: User
    users: [User]
    posts : [Post]
    profile(userId : ID!): Profile
    
  }


  
  type Post {
    id : ID !
    title : String!
    content : String!
    author : User
    createdAt : String!
    published : Boolean!
  }

  type User {
    id : ID!
    name : String!
    email : String!
    password : String!
    createdAt : String!
    posts : [Post]

  }

  type Profile {
    id : ID!
    bio : String
    createdAt : String!
    user : User!
  }

  type PostPayload{
    userError : String
    post : Post
  }

  type UserToken {
    token : String
    message : String
  }
  input PostInput {
    title : String
    content : String
  }

`;