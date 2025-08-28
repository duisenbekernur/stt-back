import {Resolvers} from "../../clients/apollo/types";

const transcriptionJobResolvers: Resolvers = {
    Query: {
        transcriptionJobs: (_data, _params, ctx) => ctx.service.transcriptionJobs.getAllJobs(),
        transcriptionJob: (_data, { id }, ctx) =>
            ctx.service.transcriptionJobs.getJobById(id),
    },

    Mutation: {
        confirmUpload: async (_data, { fileId }, ctx) => {
            const file = await ctx.service.files.getFileById(fileId);
            if (!file) {
                throw new Error("File not found");
            }
            console.log('file found', file)
            return ctx.service.transcriptionJobs.createJob(file.id);
        },
    },
};

export default transcriptionJobResolvers;
