import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './Schema';
import { resolvers } from './resolvers';

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface Context {
  
}


const main = async () => {
    const server = new ApolloServer({
  typeDefs,
  resolvers,
});


const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context : async () =>{
   return prisma
  }
});

console.log(`🚀  Server ready at: ${url}`);
}

main()

