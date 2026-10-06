"use client";

import AppIcon from "@/components/ui/icon/icon";
import { Icon } from "@/config/icon";
import modalsSlice, { openModal } from "@/store/modals/modals.slice";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import MiceIcon from "@/components/layout/mice-icon";


const ResumeSection = () => {
    const [expanded, setExpanded] = useState(false);
    return (
        <section id="resume" className="relative flex flex-col items-center justify-center pb-8">
            <div className="absolute w-full min-h-1/2 gradient-black-fade top-0 opacity-30"></div>

            <div className={[
                "relative flex flex-col items-center p-4 md:p-8 lg:p-12 xl:p-24 pb-0! pt-24!",
                expanded ? "max-h-[5000px]" : "max-h-[600px]",
                "overflow-hidden transition-[max-height] duration-700 ease-in-out"
            ].join(" ")}>

                <MiceIcon />

                <h3 className="font-light text-center text-18 text-bronze uppercase p-2 lg:p-0">Resume</h3>

                <div className={`w-full`}>
                    <article
                        className="w-full p-0 md:p-8 lg:p-12 relative flex flex-col justify-center pb-0! text-14 md:text-16">
                        <h3 className="font-medium text-16 md:text-18">Education</h3>

                        <div className={"grid grid-cols-3"}>
                            <div
                                className={"col-span-1 text-end p-2 md:p-4 lg:p-6 border-t border-r border-dark-4 rounded-r-lg rounded-b-none"}>
                                <div className={"font-medium text-bronze text-14 md:text-16"}>Sep 1996 – Jun&#160;2001
                                </div>
                                <p className="text-dark-6 mt-2 text-14 md:text-16">Belarusian State University of
                                    Informatics and
                                    Radioelectronics</p>
                            </div>

                            <div className={"col-span-2 text-start p-2 md:p-4 lg:p-6 relative"}>
                                <div
                                    className={"pl-2 flex items-center font-medium before:absolute before:left-0 before:block before:w-1 before:h-1 before:rounded-full  before:outline-2 before:outline-[#ffc166] before:shadow-[0_0_0_6px_#ffc16633] before:bg-dark-1 before:transform before:-translate-x-1/2"}>
                                    Bachelor’s Degree
                                </div>
                                <ul className="list-disc gap-1 flex flex-col mt-2 pl-4 lg:pl-6">
                                    <li>Specialization: Design and Technology of Radio-Electronic Equipment</li>
                                    <li>Qualification: Technical Design Engineer</li>
                                </ul>
                            </div>
                        </div>
                    </article>
                </div>

                <div className="flex flex-row relative justify-center items-start pt-4 md:pt-0 w-full ">

                    <article
                        className="w-full p-0 md:p-8 lg:p-12 relative flex flex-col justify-center pt-0! text-14 md:text-16">
                        <h3 className="font-medium text-16 md:text-18">Experience</h3>

                        <div className={"grid grid-cols-3"}>
                            <div
                                className={"col-span-1 text-end p-2 md:p-4 lg:p-6 border-t border-r border-dark-4 rounded-r-lg rounded-b-none"}>
                                <div className={"font-medium text-bronze"}>Oct 2025 - Current</div>
                                <p className="text-dark-6 mt-2">ASBIS</p>
                            </div>

                            <div className={"col-span-2 text-start p-2 md:p-4 lg:p-6 relative"}>
                                <div
                                    className={"pl-2 flex items-center font-medium before:absolute before:left-0 before:block before:w-1 before:h-1 before:rounded-full  before:outline-2 before:outline-[#ffc166] before:shadow-[0_0_0_6px_#ffc16633] before:bg-dark-1 before:transform before:-translate-x-1/2"}>
                                    Fullstack Developer
                                </div>
                                <ul className="list-disc pl-4 lg:pl-6 gap-1 flex flex-col mt-2">
                                    <li>Leading the migration of a legacy AngularJS application to a modern Angular +
                                        React
                                        hybrid architecture within an Nx monorepo, while maintaining and extending
                                        existing
                                        modules
                                    </li>
                                    <li>Designing reusable components and shared UI libraries with Tailwind CSS to
                                        ensure
                                        scalable and consistent frontend development
                                    </li>
                                    <li>Contributing to microfrontend architecture and a Java Servlets/JSP BFF layer for
                                        optimized data delivery and legacy system integration
                                    </li>
                                    <li>Improving performance, maintainability, and developer experience through modular
                                        architecture, code splitting, and modern React best practices
                                    </li>
                                    <li>Leveraging Claude AI for code generation, refactoring, architecture, code
                                        reviews,
                                        and documentation to accelerate development
                                    </li>
                                </ul>
                            </div>

                            <div className={"col-span-1 text-end p-2 md:p-4 lg:p-6 border-r border-dark-4"}>
                                <div className={"font-medium text-bronze"}>Apr 2025 - Oct 2025</div>
                                <p className="text-dark-6 mt-2">ITS Poland (Verisure)</p>
                            </div>

                            <div className={"col-span-2 text-start p-2 md:p-4 lg:p-6 relative"}>
                                <div
                                    className={"pl-2  flex items-center font-medium before:absolute before:left-0 before:block before:w-1 before:h-1 before:rounded-full  before:outline-2 before:outline-[#ffc166] before:shadow-[0_0_0_6px_#ffc16633] before:bg-dark-1 before:transform before:-translate-x-1/2"}>
                                    Fullstack Developer
                                </div>
                                <ul className="list-disc pl-6 gap-1 flex flex-col mt-2">
                                    <li>Developed and maintained Angular applications using TypeScript and Ionic</li>
                                    <li>Implemented and integrated GraphQL and REST APIs</li>
                                    <li>Contributed to the BFF layer using Java / Spring Boot</li>
                                    <li>Built accessible, headless UI components with Spartan NG Brain and Tailwind CSS,
                                        following modern headless UI patterns
                                    </li>
                                    <li>Integrated rule-based decision logic using the gorules/zen-engine-wasm library
                                        to
                                        support dynamic business rules
                                    </li>
                                </ul>
                            </div>

                            <div className={"col-span-1 text-end p-2 md:p-4 lg:p-6 border-r border-dark-4"}>
                                <div className={"font-medium text-bronze"}>Nov 2014 - Feb 2025</div>
                                <p className="text-dark-6 mt-2">Arlo Professional</p>
                            </div>

                            <div className={"col-span-2 text-start p-2 md:p-4 lg:p-6 relative"}>
                                <div
                                    className={"flex items-center font-medium before:absolute before:left-0 before:block before:w-1 before:h-1 before:rounded-full  before:outline-2 before:outline-[#ffc166] before:shadow-[0_0_0_6px_#ffc16633] before:bg-dark-1 before:transform before:-translate-x-1/2"}>
                                    Senior Frontend Developer/Feature Owner
                                </div>
                                <ul className="list-disc pl-6 gap-1 flex flex-col mt-2">
                                    <li> Developed enterprise front-end applications using Angular 17+, TypeScript, and
                                        Material UI, delivering scalable and maintainable user experiences
                                    </li>
                                    <li> Developed and integrated video streaming solutions using DASH, HLS, SIP, and
                                        FlowPlayer, focusing on reliable playback and performance
                                    </li>
                                    <li> Implemented real-time communication and data streaming using MQTT and
                                        Server-Sent Events (SSE)
                                    </li>
                                    <li> Integrated REST and GraphQL APIs to connect front-end applications with backend
                                        services
                                    </li>
                                    <li> Integrated Amplitude, LaunchDarkly, and Firebase for product analytics, feature
                                        management, and controlled feature rollouts
                                    </li>
                                    <li> Contributed to application architecture, technical solution design, code
                                        reviews, and development standards
                                    </li>
                                    <li> Investigated production issues, optimized application performance, and improved
                                        CI/CD and development automation processes
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </article>
                </div>

                {!expanded && <div className={"w-full absolute outline-0 h-36 gradient-fade-black-2 bottom-0"}></div>}
            </div>
            <button
                type="button"
                onClick={() => setExpanded((value) => !value)}
                className="relative z-10 mt-6 cursor-pointer
                    px-6 py-2 text-bronze border border-bronze rounded
                    transition-all duration-300 hover:bg-bronze hover:text-dark-1"
            >
                {expanded ? "Show less" : "Show more"}
            </button>
        </section>);
};

export default ResumeSection;