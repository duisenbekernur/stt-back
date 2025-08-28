import {mergeSchemas} from '@graphql-tools/schema';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

const schema = mergeSchemas({
    resolvers,
    schemas: [],
    typeDefs,
});

export default schema;
