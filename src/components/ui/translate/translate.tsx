'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
    interface Window {
        google?: {
            translate?: {
                TranslateElement: new (
                    options: {
                        pageLanguage: string;
                        includedLanguages: string;
                        autoDisplay: boolean;
                    },
                    elementId: string,
                ) => void;
            };
        };
        googleTranslateElementInit?: () => void;
    }
}

const GoogleTranslate = () => {
    useEffect(() => {
        window.googleTranslateElementInit = () => {
            if (!window.google?.translate?.TranslateElement) {
                return;
            }

            new window.google.translate.TranslateElement(
                {
                    pageLanguage: 'en',
                    includedLanguages: 'en,pl,ru',
                    autoDisplay: false,
                },
                'google_translate_element',
            );
        };

        return () => {
            delete window.googleTranslateElementInit;
        };
    }, []);

    return (
        <>
            <Script
                src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
                strategy="afterInteractive"
            />

            <div
                id="google_translate_element"
                className="hidden"
            />
        </>
    );
};

export default GoogleTranslate;