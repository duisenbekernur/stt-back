import { getPrisma } from '../../clients/prisma';
import { CreateUserInput } from './types';

const prisma = getPrisma();

export const UserResolvers = {
    Query: {
        // allUsers: async () => {
        //     return prisma.user.findMany({
        //         include: {
        //             posts: true,
        //         },
        //     });
        // },
        //
        // user: async (_parent: unknown, { id }: { id: number }) => {
        //     return prisma.user.findFirst({
        //         where: { id },
        //         include: {
        //             posts: true,
        //         },
        //     });
        // },
    },

    Mutation: {
        // createUser: async (_parent: unknown, { data }: { data: CreateUserInput }) => {
        //     return prisma.user.create({
        //         data,
        //         include: {
        //             posts: true,
        //         },
        //     });
        // },
        //
        // updateUser: async (_parent: unknown, { id, data }: { id: number; data: Partial<CreateUserInput> }) => {
        //     return prisma.user.update({
        //         where: { id },
        //         data,
        //     });
        // },
        //
        // deleteUser: async (_parent: unknown, { id }: { id: number }) => {
        //     return prisma.user.delete({
        //         where: { id },
        //     });
        // },
    },
};