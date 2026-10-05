import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ReactNode } from "react";
import Providers from "@/app/providers";
import AppModal from "@/components/ui/modal/modal";
import AuthInitializer from "@/features/auth/authInitializer";
import GoogleTranslate from "@/components/ui/translate/translate";
import AppApolloProvider from "@/apollo/apollo-provider";

const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://andrey-evtukh.vercel.app";

const siteTitle = "Andrey Evtukh | Senior Full-Stack Developer";

const ogImage = {
    url: "/images/og-image.jpg",
    width: 800,
    height: 800,
    alt: "Andrey Evtukh — Senior Full-Stack Developer"
};

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),

    title: {
        default: siteTitle,
        template: "%s | Andrey Evtukh"
    },

    description:
        "Senior Full-Stack Developer with 20+ years in software engineering and 10+ years in web development. React, Angular, TypeScript, Java and Spring Boot.",

    keywords: [
        "Andrey Evtukh",
        "Full-Stack Developer",
        "Senior Full-Stack Developer",
        "React Developer",
        "Angular Developer",
        "Java Developer",
        "Spring Boot Developer",
        "TypeScript Developer",
        "Frontend Developer",
        "Backend Developer"
    ],

    authors: [{ name: "Andrey Evtukh", url: siteUrl }],
    creator: "Andrey Evtukh",
    publisher: "Andrey Evtukh",

    alternates: {
        canonical: "/"
    },

    openGraph: {
        type: "website",
        locale: "en_US",
        url: "/",
        siteName: "Andrey Evtukh",
        title: siteTitle,
        description: "Senior Full-Stack Developer specializing in React, Angular, TypeScript, Java and Spring Boot.",
        images: [ogImage]
    },

    twitter: {
        card: "summary_large_image",
        title: siteTitle,
        description: "Senior Full-Stack Developer specializing in React, Angular, TypeScript, Java and Spring Boot.",
        images: [ogImage.url]
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1
        }
    },

    verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    },

    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png"
    }
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#111111"
};

const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Andrey Evtukh",
    jobTitle: "Senior Full-Stack Developer",
    url: siteUrl,
    sameAs: [
        "https://github.com/AndreyEvtukh",
        "https://www.linkedin.com/in/andrey-evtukh/"
    ]
};

interface RootLayoutProps {
    children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => (
    <html
        lang="en"
        className="h-full m-0 bg-dark-1 text-dark-9 antialiased font-light"
    >
    <body className="min-h-full flex flex-col items-center">
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c")
        }}
    />

    <GoogleTranslate />

    <Providers>
        <AppApolloProvider>
            <AuthInitializer />
            {children}
            <AppModal />
        </AppApolloProvider>
    </Providers>
    <Analytics />
    </body>
    </html>
);

export default RootLayout;