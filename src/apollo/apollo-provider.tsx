'use client';

import { ApolloProvider } from '@apollo/client/react';
import { ReactNode } from 'react';
import apolloClient from '@/apollo/apollo-client';

interface ApolloProviderProps {
    children: ReactNode;
}

const AppApolloProvider = ({ children }: ApolloProviderProps) => {
    return (
        <ApolloProvider client={apolloClient}>
            {children}
        </ApolloProvider>
    );
};

export default AppApolloProvider;
