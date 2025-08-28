import express from 'express';
import { getApolloServer } from "./clients/apollo/getApolloServer";

const startServer = async () => {
    const app = express();
    const port = process.env.PORT || 4000;

    const server = getApolloServer();

    await server.start();

    server.applyMiddleware({
        app: app as any,
        path: '/graphql'
    });

    app.listen(port, () => {
        console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    });
};

startServer().catch(console.error);