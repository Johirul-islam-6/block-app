import {  User } from "@prisma/client";
import { prisma } from "..";
import DataLoader from "dataloader";

// ------ Write now i created Batching function--------
const batchUser = async (ids: number[]): Promise<User[]> => {

  const userPromises = ids.map((id) =>
    prisma.user.findUnique({
      where: {
        id: id,
      },
    })
  );

  const users = await Promise.all(userPromises);

  const userData: { [key: string]: User } = {};
  users.forEach((user) => {
    if (user) {
      userData[user.id] = user;
    }
  });

  return ids.map((id) => userData[id]);
};

// ---- Next I create Catching function ---
//@ts-ignore
export const userLoader = new DataLoader<number,User>(batchUser);