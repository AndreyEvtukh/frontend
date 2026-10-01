import { Icon } from '@/config/icon';

export namespace Navigation {
    export const LOCATION = {
        HEADER: 'header',
        FOOTER: 'footer',
        SIDE: 'side',
    } as const;
    export type Location = typeof LOCATION[keyof typeof LOCATION];

    export type SectionID = 'home' | 'about' | 'skills' | 'projects' | 'resume' | 'contacts';

    export interface Route {
        id: SectionID;
        title: string;
        icon: Icon.Name;
        href: string;
    }

    export const routing: Route[] = [
        {
            id: 'home',
            title: 'Home',
            icon: 'home',
            href: '#home',
        },
        {
            id: 'about',
            title: 'About',
            icon: 'about',
            href: '#about',
        },
        {
            id: 'resume',
            title: 'Resume',
            icon: 'resume',
            href: '#resume',
        },
        {
            id: 'skills',
            title: 'Skills',
            icon: 'skills',
            href: '#skills',
        },
        {
            id: 'projects',
            title: 'Projects',
            icon: 'projects',
            href: '#projects',
        },
        {
            id: 'contacts',
            title: 'Contacts',
            icon: 'contacts',
            href: '#contacts',
        },
    ];
}