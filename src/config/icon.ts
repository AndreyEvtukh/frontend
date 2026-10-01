export namespace Icon {
    export const NAME = {
        HOME: 'home',
        ABOUT: 'about',
        RESUME: 'resume',
        SKILLS: 'skills',
        PROJECTS: 'projects',
        CONTACTS: 'contacts',

        ANGULAR: 'angular',
        JAVA: 'java',
        TS: 'ts',
        REACT: 'react',

        MICE: 'mice',
        DESIGN: 'design',
        FRONTEND: 'frontend',
        BACKEND: 'backend',
        ARROW: 'arrow',
        DOWNLOAD: 'download',
        USER: 'user',
        LOGIN: 'login',
        EYE_OFF: 'eye-off',
        EYE_ON: 'eye-on',
        SUCCESS: 'success',
        EXPAND: 'expand',
        TESTIMONIAL: 'testimonial',
        LINK_OUT: 'link-out',

        GITHUB: 'github',
        LINKEDIN: 'linkedin',
        TELEGRAM: 'telegram',

        CODE: 'code',
        SERVER: 'server',
        DATABASE: 'database',
        TOOLS: 'tools',
        GEO: 'geo',
        PHONE: 'phone',
        EMAIL: 'email',
        OPEN: 'open',
        INFO: 'info',
    } as const;

    export type Name = typeof NAME[keyof typeof NAME];

    export const registry = Object.fromEntries(
        Object.values(NAME).map((name) => [
            name,
            `icons/${name}.svg`,
        ])
    ) as Record<Name, `icons/${Name}.svg`>;

    export interface Props {
        name: Name;
        className?: string;
        isStatic?: boolean;
    }
}