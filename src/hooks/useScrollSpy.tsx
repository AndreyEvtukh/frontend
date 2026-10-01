'use client';

import { useEffect, useState } from 'react';

export const useScrollSpy = (
    sectionIds: string[],
    rootMargin = '0px 0px -80% 0px'
) => {
    const [activeSection, setActiveSection] = useState(
        sectionIds[0] ?? 'home'
    );

    useEffect(() => {
        const sections = sectionIds
            .filter((id) => id !== 'home')
            .map((id) => document.getElementById(id))
            .filter((section): section is HTMLElement => section !== null);

        if (!sections.length) return;

        const setActive = (id: string) => {
            setActiveSection(id);

            if (window.location.hash !== `#${id}`) {
                window.history.replaceState(
                    null,
                    '',
                    `#${id}`
                );
            }
        };

        const handleScroll = () => {
            if (window.scrollY <= 1) {
                setActive('home');
                return;
            }

            const scrollPosition = window.scrollY + 100;
            let currentSection = 'home';

            for (const section of sections) {
                if (section.offsetTop <= scrollPosition) {
                    currentSection = section.id;
                } else {
                    break;
                }
            }

            setActive(currentSection);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionIds]);

    return activeSection;
};