import AppIcon from "@/components/ui/icon/icon";
import { Icon } from "@/config/icon";
import TestimonialsComponent from "@/components/layout/testimonials";
import MiceIcon from "@/components/layout/mice-icon";

const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
};

const AboutSection = () => {
    const links = [
        {
            id: 0,
            title: "Architecture",
            content: "Turning ideas into interfaces people actually enjoy using.",
            link: "/porfolio",
            icon: Icon.NAME.DESIGN
        },
        {
            id: 1,
            title: "Frontend",
            content: "Building fast, polished interfaces with Angular and TypeScript.",
            link: "/porfolio",
            icon: Icon.NAME.FRONTEND
        },
        {
            id: 2,
            title: "Backend",
            content: "Designing scalable APIs and backend architecture with Spring Boot.",
            link: "/porfolio",
            icon: Icon.NAME.BACKEND
        }
    ];
    return (
        <section id="about">
            <div className="flex flex-row relative bg-waves justify-center pt-8 md:pt-0">
                <div className="z-10 absolute mt-16 md:mt-24">
                    <MiceIcon />
                </div>

                <article
                    className="flex flex-col flex-col-reverse max-w-2xl lg:max-w-full relative pt-4 sm:pt-8 md:pt-16 items-center lg:flex-row lg:pt-0">

                    <div className="flex flex-col gap-5 w-full lg:w-1/2 p-4 md:p-12 2xl:p-24 relative justify-center">
                        {links.map(link => (
                            <div
                                key={link.id}
                                onClick={scrollToProjects}
                                className="flex flex-row h-36 bg-dark-3 rounded-t-md rounded-b-md p-4 md:p-6 lgp-8 transition-all duration-200
                                    hover:z-10 hover:shadow-[0_0_20px_3px_rgba(0,0,0,0.2)]">
                                <div className="flex flex-col justify-between w-full cursor-pointer">
                                    <div>
                                        <h4 className="text-bronze text-18 font-medium">{link.title}</h4>
                                        <p className="text-dark-8 text-14 mt-1">{link.content}</p>
                                    </div>
                                    <p className="underlined relative w-fit
                                            after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:border after:border-dashed after:border-b-color-dark-9"
                                    >Examples</p>
                                </div>
                                <AppIcon className="text-bronze h-6 aspect-square" name={link.icon} />
                            </div>
                        ))}
                    </div>

                    <div
                        className="w-full lg:w-1/2 p-6 md:p-8 pt-12 md:p-16 lg:p-12 2xl:p-24 relative flex flex-col justify-center">

                        <article>
                            <p className="text-14 text-dark-6 uppercase">Who I am</p>

                            <header className="mt-5">
                                <h3 className="text-24">
                                    <p className="text-bronze font-medium">Hello!</p>
                                    <p>I’m Andrey Evtukh!</p>
                                </h3>
                            </header>

                            <div className="mt-5">
                                Senior Full-Stack Developer with 12+ years of experience building scalable web
                                applications. I specialize in designing robust architectures, optimizing application
                                performance, and creating intuitive UIs that deliver a strong user experience.
                            </div>

                            <div className="mt-5">
                                <h4 className="font-medium">Key achievements:</h4>
                                <ul className="mt-2 list-disc pl-4">
                                    <li>Led a frontend team of 4 engineers and established effective code review and
                                        CI/CD practices
                                    </li>
                                    <li>Optimized a large-scale Angular application, improving performance and
                                        maintainability
                                    </li>
                                    <li>Migrated an enterprise product from AngularJS to Angular 22</li>
                                    <li>Delivered a new video streaming system, migrating from Adobe Flash to DASH and
                                        integrating MQTT and SIP
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-5">
                                Passionate about complex interfaces, performance optimization, scalable architectures,
                                and building software that delivers real business value.
                            </div>
                        </article>

                    </div>
                </article>
            </div>

            <article className="flex flex-row bg-dark-3 relative">
                <div className="w-full py-4 px-0 md:p-8 lg:p-12 xl:p-24">
                    <TestimonialsComponent></TestimonialsComponent>
                </div>
            </article>
        </section>
    );
};
export default AboutSection;