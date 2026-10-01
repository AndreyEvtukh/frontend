import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import Providers from '@/app/providers';
import AppModal from '@/components/ui/modal/modal';
import AppApolloProvider from '@/apollo/apollo-provider';
import AuthInitializer from '@/features/auth/authInitializer';
import GoogleTranslate from '@/components/ui/translate/translate';

export const metadata: Metadata = {
    title: 'Andrey Evtukh',
    description: 'Personal portfolio of Andrey Evtukh'
};

interface RootLayoutProps {
    children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => (
    <html lang="en" className="h-full m-0 bg-dark-1 text-dark-9 antialiased font-light">
    <body className="min-h-full flex flex-col items-center">
        <GoogleTranslate />
        <Providers>
            <AppApolloProvider>
                <AuthInitializer />
                {children}
                <AppModal />
            </AppApolloProvider>
        </Providers>
    </body>
    </html>
);

export default RootLayout;