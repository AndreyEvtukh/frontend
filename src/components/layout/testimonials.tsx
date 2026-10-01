'use client';

import AppIcon from '@/components/ui/icon/icon';
import { Icon } from '@/config/icon';
import { openModal } from '@/store/modals/modals.slice';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useRef, useState } from 'react';


export interface Testimonial {
    id: number;
    text: string;
    authorName: string;
    authorPosition: string;
    date: string;
}

const testimonials: Testimonial[] = [
    {
        'authorName': 'Roger Jönsson',
        'authorPosition': 'Area Manager Verisure',
        'date': 'September 4, 2025',
        'text': 'Andrey is a highly skilled web developer with deep expertise in Angular. He got into our projects in a fast and good way as a consultant. He is friendly and helpful.',
        'id': 1
    },
    {
        'authorName': 'Dave Texidor',
        'authorPosition': 'Director of Engineering | PayPal, Procore Alum',
        'date': 'March 7, 2025',
        'text': 'Andrey is a highly skilled web developer with deep expertise in Angular. As a tech lead, he not only delivered well-structured, scalable solutions but also fostered great collaboration and best practices within the team. \n\nHis ability to break down complex problems and guide the development of critical features helped us deliver significant value to our customers.',
        'id': 2
    },
    {
        'authorName': 'Sergey Yakubovsky',
        'authorPosition': 'Staff Software Engineer at Arlo Technologies, Inc.',
        'date': 'March 3, 2025',
        'text': 'Andrey has a background of strong technical skills, including proficiency in programming languages, understanding of software development methodologies, and knowledge of software design principles.\n\nAndrey developed efficient solutions in different parts of web application. Those solutions characterized by clean, maintainable, and scalable code. His attention to details helped to improve app performance.\n\nAndrey effectively passes his knowledge to teammates, newcomers and existing.\n\nIt is worth to mention Andrey\'s strong commitment to continuous learning and professional development, staying up to date with the latest trends, technologies, and best practices in software engineering.\n\nIt is a great pleasure to have Andrey in the team.',
        'id': 3
    },
    {
        'authorName': 'Artem Kuzhovnik',
        'authorPosition': 'Web developer',
        'date': 'March 2, 2025',
        'text': 'I worked with Andrey on a project in the home security domain that involved a large codebase and high demands for quality software development, where he was responsible for frontend work. Throughout the project, Andrey demonstrated attention to detail, a responsible approach to task completion, and always strived for high-quality results. I recommend him as a professional capable of solving complex technical challenges and delivering excellent results.',
        'id': 4
    },
    {
        'authorName': 'Denis Dmitriev',
        'authorPosition': 'CTO at ITS Partner',
        'date': 'March 17, 2025',
        'text': 'Andrey was working on one of the largest projects for ITS for many years. Since his start, Andrey quickly became a go-to man for almost every technical bit of questions on this project. His dedication and technical mastery remained key assets throughout the project. Also, I\'d like to note Andrey\'s attitude to help solve any problem in an adjacent area, those which are not his direct responsibilities but solution for which helps the team to move forward.',
        'id': 5
    }];

const TestimonialsComponent = () => {
    const dispatch = useDispatch();
    const viewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollButtons = useCallback(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;

        setCanScrollLeft(viewport.scrollLeft > 1);
        setCanScrollRight(viewport.scrollLeft + viewport.clientWidth < viewport.scrollWidth - 1);
    }, []);

    useEffect(() => {
        const viewport = viewportRef.current;
        const track = trackRef.current;

        if (!viewport) return;

        updateScrollButtons();

        viewport.addEventListener('scroll', updateScrollButtons, { passive: true });

        const resizeObserver = new ResizeObserver(updateScrollButtons);
        resizeObserver.observe(viewport);

        if (track) resizeObserver.observe(track);

        return () => {
            viewport.removeEventListener('scroll', updateScrollButtons);
            resizeObserver.disconnect();
        };
    }, [updateScrollButtons]);

    const toLeft = () => {
        viewportRef.current?.scrollBy({
            left: -viewportRef.current.clientWidth * 0.4,
            behavior: 'smooth'
        });
    };

    const toRight = () => {
        viewportRef.current?.scrollBy({
            left: viewportRef.current.clientWidth * 0.4,
            behavior: 'smooth'
        });
    };

    const expand = (id: number) => {
        dispatch(openModal({
            id: 'testimonial',
            data: testimonials.find(item => item.id === id)
        }));
    };

    return (
        <article className="flex flex-col gap-5">
            <header>
                <h3 className="font-medium text-18 ml-6 lg:ml-12">Testimonials</h3>
            </header>

            <div className="flex flex-row relative items-center">
                <button
                    type="button"
                    disabled={!canScrollLeft}
                    className={[
                        'hidden lg:flex z-10 absolute top-0 right-0 left-auto  -translate-y-full -translate-x-full p-5',
                        'lg:-left-2 lg:h-full lg:p-0 lg:translate-y-0',
                        'w-10 flex-col items-center justify-center rounded-md',
                        'transition-colors duration-200',
                        !canScrollLeft
                            ? 'text-dark-4'
                            : 'text-bronze cursor-pointer hover:bg-dark-2-30'
                    ].join(' ')}
                    onClick={toLeft}
                >
                    <AppIcon name={Icon.NAME.ARROW}
                             className={`z-10 rotate-180 transition-colors duration-200 w-6 h-6 ${canScrollLeft ? 'text-bronze' : 'text-dark-4'} `}/>

                </button>

                <button
                    type="button"
                    disabled={!canScrollRight}
                    className={[
                        'hidden lg:flex z-10 absolute top-0 right-0 -translate-y-full p-5',
                        'lg:-right-2 lg:translate-x-full lg:h-full lg:translate-y-0 lg:p-0',
                        'w-10 flex-col items-center justify-center rounded-md',
                        'transition-colors duration-200',
                        !canScrollRight
                            ? 'text-dark-4'
                            : 'text-bronze cursor-pointer hover:bg-dark-2-30'
                    ].join(' ')}
                    onClick={toRight}
                >
                    <AppIcon name={Icon.NAME.ARROW}
                             className={`z-10 transition-colors duration-200 w-6 h-6 ${canScrollRight ? 'text-bronze' : 'text-dark-4'} `}/>
                </button>

                {canScrollLeft && (
                    <div
                        className="hidden lg:flex absolute w-1/12 h-full bg-grad-fade-to-dark-3 z-10 left-0!"></div>)}

                {canScrollRight && (
                    <div
                            className="hidden lg:flex absolute w-1/12 h-full bg-grad-dark-3-to-fade z-10 right-0!"></div>)}

                <div ref={viewportRef}
                     className="flex flex-row relative overflow-x-auto lg:overflow-x-hidden scroll-snap-type: x mandatory">

                    <div ref={trackRef}
                         className={`flex flex-row w-full relative md:gap-5 scroll-snap-type: x mandatory`}>
                        {testimonials.map((item) => (
                            <div key={item.id}
                                 className="p-2 min-w-4/5 md:min-w-3/5 lg:min-w-2/5">
                                <div
                                    className="relative flex flex-col p-8 border-solid border-dark-4 rounded-md border
                                    h-full min-h-48 justify-between bg-dark-2 gap-2 md:gap5">
                                    <div className="flex absolute top-4 left-8 gap-1">
                                        {Array.from({ length: testimonials.length }).map((_, index) => (
                                            <div
                                                key={index}
                                                className={[
                                                    'w-1 h-1 rounded-full',
                                                    index === (item.id - 1) ? 'bg-bronze' : 'bg-dark-4'
                                                ].join(' ')}
                                            />
                                        ))}
                                    </div>
                                    <div className="text-14 h-20 scrolled vertical overflow-y-scroll">{item.text}</div>
                                    <div>
                                        <div
                                            translate="no"
                                            className="text-14 font-medium text-bronze capitalize">{item.authorName}</div>
                                        <div translate="no" className="text-14 capitalize">{item.authorPosition}</div>
                                    </div>
                                    <button
                                        className={'flex absolute bottom-2 right-2 gap-1 cursor-pointer bg-dark-3 p-1 rounded-sm rotate-90'}
                                        onClick={() => expand(item.id)}>
                                        <AppIcon name={Icon.NAME.EXPAND}
                                                 className={'h-4 w-4 text-bronze hover:text-bronze-hover'}/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </article>);
};

export default TestimonialsComponent;