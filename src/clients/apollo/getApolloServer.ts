import {ApolloServer} from "apollo-server-express";
import {InMemoryLRUCache} from '@apollo/utils.keyvaluecache';
import schema from "./schema";
import {FilesService} from "../../services/FilesService/FilesService";
import {UsersService} from "../../services/UsersService/UsersService";
import {getPrisma} from "../prisma";
import {TranscriptionJobsService} from "../../services/TranscriptionJobsService/TranscriptionJobsService";

export const getApolloServer = () => new ApolloServer({
    context: () => {
        return {
            service: {
                files: new FilesService(),
                users: new UsersService(),
                transcriptionJobs: new TranscriptionJobsService()
            },
            prisma: getPrisma(),
        }
    },
    schema,
    cache: new InMemoryLRUCache(),
});