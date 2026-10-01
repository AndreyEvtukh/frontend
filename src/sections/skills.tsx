import AppIcon from '@/components/ui/icon/icon';
import { Icon } from '@/config/icon';

const skillGroups = [
    {
        title: 'Frontend',
        icon: Icon.NAME.CODE,
        skills: [
            'Angular',
            'AngularJS',
            'Material',
            'React',
            'Next.js',
            'TypeScript',
            'RxJS',
            'NgRx',
            'Tailwind CSS',
            'MUI',
            'SSR',
            'Ag-Grid',
            'jQuery'
        ]
    },
    {
        title: 'Backend & APIs',
        icon: Icon.NAME.SERVER,
        skills: [
            'Java 17/21',
            'Spring Boot',
            'Spring Security',
            'GraphQL',
            'REST APIs',
            'Java Servlets / JSP',
            'BFF',
            'Swagger / OpenAPI',
            'Postman'
        ]
    },
    {
        title: 'Data & Distributed Systems',
        icon: Icon.NAME.DATABASE,
        skills: [
            'PostgreSQL',
            'MongoDB',
            'Apache Kafka',
            'Flyway',
            'MQTT',
            'SSE',
            'WebSockets'
        ]
    },
    {
        title: 'Architecture & Tools',
        icon: Icon.NAME.TOOLS,
        skills: [
            'Nx Monorepo',
            'Modular Architecture',
            'Microfrontends',
            'Reusable UI Libraries',
            'LaunchDarkly',
            'Amplitude',
            'Docker',
            'Git',
            'CI/CD',
            'Jest / Vitest',
            'Claude AI'
        ]
    }
];

export default function SkillsSection() {
    return (
        <section
            id="skills"
            className="relative flex flex-col items-center justify-center pb-8"
        >
            <div className="absolute w-full h-96 top-0 opacity-10 bg-matrix"></div>
            <div className="absolute w-full min-h-1/2 gradient-black-fade top-0 opacity-30"></div>

            <div className={'relative flex flex-col items-center p-4 md:p-8 lg:p-12 xl:p-24 pb-0! pt-24!'}>
                <div className="z-10 opacity-40 color-dark-9
                        transform scale-75 md:scale-100 -mt-16 mb-16
                        after:content-[''] after:block after:absolute after:h-8 after:top-10 after:left-1/2 after:border-r after:border-dashed after:border-dark-8
                        before:content-[''] before:block before:absolute before:h-2 before:w-2 before:rounded-full before:top-16 before:left-1/2 before:border before:border-dark-8 before:-translate-x-1/2 before:translate-y-full">
                    <AppIcon name={Icon.NAME.MICE} className="color-dark-7 h-10 aspect-square"/>
                </div>

                <h3 className="font-light text-center text-18 text-bronze uppercase p-2 lg:p-0">
                    Technical Skills
                </h3>

                <p className="mt-2 text-center max-w-xl text-sm text-dark-8">
                    Technologies and tools I use to build scalable, maintainable web applications.
                </p>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-8">
                    {skillGroups.map((group) => (
                        <article
                            key={group.title}
                            translate="no"
                            className="rounded-md border border-dark-4 border-l-8 border-r-8 bg-dark-1 p-4"
                        >
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex items-center justify-center text-bronze">
                                    <AppIcon name={group.icon} className={'w-6 aspect-square'}/>
                                </div>
                                <h3 className="font-medium text-dark-9"> {group.title} </h3>
                            </div>

                            <ul className="flex flex-wrap gap-2">
                                {group.skills.map((skill) => (
                                    <li
                                        key={skill}
                                        className="rounded-sm border border-dark-4 bg-dark-3 px-2 py-1 text-sm text-dark-9">
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}