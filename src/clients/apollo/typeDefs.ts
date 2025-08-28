import {mergeTypeDefs} from '@graphql-tools/merge';
import {loadFilesSync} from '@graphql-tools/load-files';
import path from 'path';
import {typeDefs} from 'graphql-scalars';

const typesArray = [
    ...loadFilesSync(
        path.join(__dirname, '../../services/*/typeDefs.?(ts)?(js)'),
    ),
].filter(s => s.kind && s.kind === 'Document');

const mergedTypeDefs = mergeTypeDefs([...typeDefs, typesArray]);

export default mergedTypeDefs;
