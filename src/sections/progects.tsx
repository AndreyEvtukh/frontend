'use client';

import AppIcon from '@/components/ui/icon/icon';
import { Icon } from '@/config/icon';
import { useEffect, useState } from 'react';
import ProjectsSlider from '@/components/layout/projectsSlider';
import MiceIcon from "@/components/layout/mice-icon";

const projectsProps = [
    {
        id: 'hotel',
        name: 'Hotel Booking',
        period: '2026',
        role: 'Full Stack Developer',
        imgClassList: ['hotel-1', 'hotel-2', 'hotel-3', 'hotel-4'],
        description:
            'Full-stack hotel booking system with authentication, room and booking management, REST and GraphQL APIs, and an event-driven statistics service.',
        technologies: [
            'Java 21',
            'Spring Boot',
            'Spring Security',
            'PostgreSQL',
            'Flyway',
            'Kafka',
            'MongoDB',
            'Docker',
            'Swagger',
            'Angular',
            'Material-UI',
            'Ag-Grid'
        ]
    },
    {
        id: 'arlo',
        name: 'Arlo Professional',
        period: '2014 – 2025',
        role: 'Senior Frontend Developer / Feature Owner',
        imgClassList: ['arlo-1', 'arlo-2', 'arlo-3', 'arlo-4', 'arlo-5'],
        description:
            'Large-scale web platform for professional smart security products.',
        technologies: [
            'Angular',
            'Material-UI',
            'TypeScript',
            'GraphQL',
            'REST API',
            'MQTT',
            'SSE',
            'WebSockets',
            'LaunchDarkly',
            'Amplitude'
        ]
    },
    {
        id: 'verisure',
        name: 'Verisure',
        period: '2025',
        role: 'Full Stack Developer',
        imgClassList: ['verisure-1', 'verisure-2', 'verisure-3'],
        description:
            'Web application for smart security services combining modern Angular frontend with Java Spring Boot backend services.',
        technologies: [
            'Angular',
            'TypeScript',
            'Ionic',
            'GraphQL',
            'REST',
            'Java',
            'Spring Boot',
            'Tailwind CSS'
        ]
    },
    {
        id: 'asbis',
        name: 'ASBIS',
        period: '2025 – Present',
        role: 'Full Stack Developer',
        imgClassList: ['asbis-1', 'asbis-2', 'asbis-3'],
        description:
            'Enterprise e-commerce platform developed in an Nx monorepo with modern Angular, React and Java-based BFF services.',
        technologies: [
            'Angular',
            'AngularJS',
            'Ag-Grid',
            'Material-UI',
            'React',
            'Nx',
            'TypeScript',
            'Tailwind CSS',
            'Java',
            'BFF'
        ]
    },
    {
        id: 'portfolio',
        name: 'Portfolio',
        period: '2026',
        role: 'Full Stack Developer',
        imgClassList: ['portfolio'],
        description:
            'Personal portfolio built with Next.js and React, featuring authentication, GraphQL integration and a modern responsive UI.',
        technologies: [
            'React',
            'Next.js',
            'TypeScript',
            'Tailwind CSS',
            'MUI',
            'Redux Toolkit',
            'GraphQL',
            'Spring Boot'
        ]
    }
];

export default function ProjectsSection() {
    const [activeProject, setActiveProject] = useState(projectsProps[0].id);
    const [showInfo, setShowInfo] = useState(false);

    const activeProjectData = projectsProps.find(
        (project) => project.id === activeProject
    );

    useEffect(() => {
        setShowInfo(false);
    }, [activeProject]);

    const handleInfoClick = () => {

        if (window.matchMedia('(hover: none)').matches) {
            setShowInfo((prev) => !prev);
        }
    };

    const navBar = () => {
        return (
            <div
                translate="no"
                className="
                    flex flex-row flex-nowrap
                    gap-1
                    w-full min-w-0 max-w-full
                    overflow-x-auto overflow-y-hidden
                    justify-start md:justify-center
                    mt-8 px-1 py-4 -mb-10
                    scroll-smooth
                    snap-x snap-mandatory
                    [scrollbar-width:none]
                    [&::-webkit-scrollbar]:hidden
                "
            >
                {projectsProps.map((project) => {
                    const isActive = activeProject === project.id;

                    return (
                        <button
                            key={project.id}
                            type="button"
                            onClick={() => setActiveProject(project.id)}
                            className={[
                                'shrink-0 snap-start',
                                'px-4 py-2 rounded-full whitespace-nowrap cursor-pointer',
                                'transition-colors duration-200',
                                isActive
                                    ? 'bg-bronze/20 text-bronze'
                                    : 'text-dark-8 hover:text-dark-9'
                            ].join(' ')}
                        >
                            {project.name}
                        </button>
                    );
                })}
            </div>
        );
    };

    return (
        <section
            id="projects"
            className="relative flex flex-col items-center justify-center bg-dark-1"
        >
            <div className="relative w-full flex flex-col items-center
                    p-4 md:p-8 lg:p-12 xl:p-24 pb-0! pt-24!">

                <MiceIcon/>

                <h3 className="font-light text-center text-18 text-bronze uppercase p-2 lg:p-0">
                    Projects
                </h3>

                <p className="mt-2 text-center max-w-xl text-sm text-dark-8">
                    Selected projects built with modern frontend and backend technologies.
                </p>

                {navBar()}

                {activeProjectData && (
                    <article key={activeProjectData.id} className="
                            relative flex flex-col w-full
                            rounded-md border border-dark-4 bg-dark-2 px-2 xm:px-8 pb-16 pt-8
                            2xl:px-16 m-16 mb-8
                        ">

                        <div className="group absolute right-2 top-2 md:top-8 md:right-8  z-50">
                            <button type="button"
                                    onClick={handleInfoClick}
                                    className="cursor-pointer">
                                <AppIcon name={Icon.NAME.INFO} className="h-6 aspect-square text-bronze"/>
                            </button>
                            <div className={[
                                'absolute top-0 right-8 w-72 z-[100]',
                                'rounded-md border border-dark-4 bg-dark-1 p-4 text-12 font-mono',
                                showInfo ? 'block' : 'hidden',
                                'sm:group-hover:block'
                            ].join(' ')}>
                                <button type="button"
                                        onClick={handleInfoClick}
                                        className="cursor-pointer absolute right-3 top-1 text-center font-light text-lg text-dark-8"
                                >&times;</button>
                                <ul className="flex flex-col gap-0 list-disc text-14 lg:text-16" translate="no">
                                    {activeProjectData.technologies.map((technology) => (
                                        <li key={technology} className="ml-6">
                                            {technology}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>

                        <div className="flex flex-col items-center">
                            <h3 className="font-medium text-center text-bronze text-18" translate="no">
                                {activeProjectData.name}
                            </h3>

                            <p translate="no" className="flex lg:hidden text-start font-mono text-12">
                                {activeProjectData.period}:{' '}
                                {activeProjectData.role}
                            </p>

                            <p className="text-center mt-4">
                                {activeProjectData.description}
                            </p>

                            <div translate="no" className="flex-row flex flex-wrap sm:hidden gap-1 mt-2">
                                {activeProjectData.technologies.map(
                                    (technology) => (
                                        <div
                                            key={technology}
                                            className="
                                                p-1
                                                bg-dark-6
                                                text-12
                                                font-mono
                                                rounded-xs
                                            "
                                        >
                                            {technology}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>


                        <div className="flex flex-row gap-4 mt-8">
                            <ProjectsSlider images={activeProjectData.imgClassList}/>
                        </div>
                    </article>
                )}
            </div>
        </section>
    );
}