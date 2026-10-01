import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:8082/api/v1/graphql',
        credentials: 'include',
    }),
    cache: new InMemoryCache(),
});

export default apolloClient;