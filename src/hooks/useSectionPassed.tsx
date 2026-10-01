'use client';

import { useEffect, useState } from 'react';

export const useSectionPassed = (sectionId: string) => {
    const [isPassed, setIsPassed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const section = document.getElementById(sectionId);

            if (!section) {
                setIsPassed(false);
                return;
            }

            const rect = section.getBoundingClientRect();

            setIsPassed(Math.round(rect.top) <= 0);
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);

    }, [sectionId]);

    return isPassed;
};