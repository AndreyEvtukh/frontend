import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ReactNode } from "react";
import Providers from "@/app/providers";
import AppModal from "@/components/ui/modal/modal";
import AuthInitializer from "@/features/auth/authInitializer";
import GoogleTranslate from "@/components/ui/translate/translate";
import AppApolloProvider from "@/apollo/apollo-provider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://andrey-evtukh.vercel.app";
const siteTitle = "Andrey Evtukh | Senior Full-Stack Developer";
const siteDescription = "Andrey Evtukh is a Senior Full-Stack Developer with 20+ years in software engineering and 12+ years in web development, specializing in Angular, React, TypeScript, Java, Spring Boot, GraphQL and scalable web applications.";
const ogImage = {
    url: "/images/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "Andrey Evtukh — Senior Full-Stack Developer"
};
export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: { default: siteTitle, template: "%s | Andrey Evtukh" },
    description: siteDescription,
    keywords: ["Andrey Evtukh", "Senior Full-Stack Developer", "Full-Stack Developer", "Angular Developer", "React Developer", "Next.js Developer", "TypeScript Developer", "Java Developer", "Spring Boot Developer", "GraphQL Developer", "Frontend Developer", "Backend Developer"],
    authors: [{ name: "Andrey Evtukh", url: siteUrl }],
    creator: "Andrey Evtukh",
    publisher: "Andrey Evtukh",
    category: "technology",
    alternates: { canonical: "/" },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "/",
        siteName: "Andrey Evtukh",
        title: siteTitle,
        description: siteDescription,
        images: [ogImage]
    },
    twitter: { card: "summary_large_image", title: siteTitle, description: siteDescription, images: [ogImage.url] },
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
    verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
    icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" }
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#111111" };
const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;
const profilePageId = `${siteUrl}/#profile`;
const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [{
        "@type": "Person",
        "@id": personId,
        name: "Andrey Evtukh",
        url: siteUrl,
        jobTitle: "Senior Full-Stack Developer",
        description: siteDescription,
        image: `${siteUrl}/images/og-image.jpg`,
        sameAs: ["https://github.com/AndreyEvtukh", "https://www.linkedin.com/in/andrey-evtukh/"],
        knowsAbout: ["Angular", "React", "Next.js", "TypeScript", "Java", "Spring Boot", "Spring Security", "GraphQL", "PostgreSQL", "Docker", "Nx", "Microfrontends", "REST APIs"]
    }, {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: "Andrey Evtukh",
        description: siteDescription,
        publisher: { "@id": personId },
        inLanguage: "en"
    }, {
        "@type": "ProfilePage",
        "@id": profilePageId,
        url: siteUrl,
        name: siteTitle,
        description: siteDescription,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
        inLanguage: "en"
    }]
};

interface RootLayoutProps {
    children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => (
    <html lang="en" className="h-full m-0 bg-dark-1 text-dark-9 antialiased font-light">
    <body className="min-h-full flex flex-col items-center">
    <script type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
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
    </html>);
export default RootLayout;