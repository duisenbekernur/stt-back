import {Resolvers} from "../../clients/apollo/types";

const fileResolvers: Resolvers = {
    Query: {
        files: (_data, _params, ctx) => ctx.service.files.getAllFiles(),
        file: (_data, {id}, ctx) =>
            ctx.service.files.getFileById(id),
    },
    Mutation: {
        createUploadUrl: (
            _data,
            args,
            ctx: any
        ) => ctx.service.files.createUploadUrl(args.input),
    },
};

export default fileResolvers;