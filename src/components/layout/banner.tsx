import AppIcon from "@/components/ui/icon/icon";
import { Icon } from "@/config/icon";
import AppButton from "@/components/ui/button/button";

const retro = [
    {
        id: 0,
        value: "12+",
        text: "years\nexperience"
    }, {
        id: 1,
        value: "3",
        text: "enterprise\nprojects"
    }, {
        id: 2,
        value: "18",
        text: "projects delivered\nacross 8 countries"
    }
];

const goContacts = () => {
    document.getElementById("contacts")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
};

const downloadCV = () => {
    const link = document.createElement("a");

    link.href = "/cv/Andrey_Evtukh_CV.pdf";
    link.download = "Andrey_Evtukh_CV.pdf";

    document.body.appendChild(link);
    link.click();
    link.remove();
};

const footer = (classList = "") => (
    <footer className={["flex flex-row gap-0 p-1 justify-center" +
    "lg:gap-10 lg:border-none lg:bg-transparent lg:p-0 md:ml-0",
        classList].join(" ")}>
        {retro.map((item, index) => (
            <div key={item.id}
                 className={`w-1/3 flex flex-col gap-1 items-center text-center lg:flex-row lg:gap-3 lg:text-start px-2 relative lg:after:hidden
                 ${index > 0
                     ? "after:border-r after:border-r-dark-6 after:absolute after:left-0 after:top-1/4 after:bottom-1/4"
                     : ""
                 }`}>
                <div className="text-16 sm:text-18 lg:text-36 font-medium"> {item.value} </div>
                <div className="text-10 lg:text-14 font-mono lg:font-light"> {item.text} </div>
            </div>
        ))}

    </footer>
);

const AppBanner = () => {
    return (<section className="flex flex-col relative font-light">

        <div className="relative flex flex-row w-full aspect-video h-1/2 max-h-150 bg-dark-2 shadow-banner bg-dots z-10
                2xl:rounded-2xl 2xl:mr-12 2xl:-ml-12 2xl:pr-0 2xl:after:right-4 2xl:before:right-22 2xl:before:top-20
                before:absolute before:h-8/12 before:aspect-square before:right-4 before:top-10 before:rounded-full before:bg-dark-3
                after:absolute after:h-full after:w-1/2 after:right-0 after:top-0 after:bg-[linear-gradient(to_left,_#00000060_0%,_transparent_100%)]
                ">
            <div
                className="relative z-10 flex flex-col gap-4 lg:gap-8 w-1/2 p-4 lg:p-12 lg:justify-between pr-0 justify-around z-50">
                <div className="flex flex-col justify-center lg:h-full gap-2 md:gap-4 lg:gap-8">
                    <header className="flex flex-col gap-2 lg:gap-8">
                        <p>
                            <span translate="no" className="py-0.5 px-1.5 text-10 text-dark-1 bg-bronze font-medium rounded-[1px] xl:rounded-[2px] whitespace-nowrap
                            2xl:py-1.5 lg:px-2 lg:rounded-sm">Full-Stack Developer</span>
                        </p>
                        <h2 className="text-24 lg:text-36 font-medium whitespace-nowrap text-shadow-[0_0_8px_#000]">Develop
                            — <span
                                className="block text-18 md:text-24 lg:text-36 ">from idea to production.</span>
                        </h2>
                    </header>
                    <p className="2xl:ml-12 font-light text-14 2xl:text-16 hidden md:block ml-12 -mr-24">
                        Senior Full-Stack Developer with 20+ years in software engineering and 12+ years in web
                        development. Strong in React, Angular, TypeScript, Java, and Spring Boot, with experience
                        building scalable enterprise applications, REST/GraphQL APIs, authentication, and data
                        integrations. Experienced in owning solutions end to end — from frontend architecture to backend
                        services and deployment.
                    </p>
                    <div className="flex-row mt-8 gap-8 flex">
                        <AppButton
                            className="border border-bronze text-bronze bg-dark-3 hover:bg-dark-2 transition-all duration-200 p-2! sm:p-4! text-12 sm:text-14 lg:text-16"
                            callBackFunc={downloadCV}>
                            <span className="font-light">Download CV</span>
                            <AppIcon name={Icon.NAME.DOWNLOAD} className="color-dark-9 w-3! md:w-4! aspect-square " />
                        </AppButton>
                        <AppButton className={"text-bronze p-0! hover:text-bronze-hover hidden sm:flex"}
                                   callBackFunc={goContacts}>
                            <span className="font-light">Let's Chat!</span>
                        </AppButton>
                    </div>
                </div>

                {footer("hidden lg:flex -ml-4 bg-dark-1 border border-dark-3 rounded-sm w-[130%] z-50")}

            </div>

            <div className="w-1/2 relative z-10">
                <img alt="Andrey Evtukh" className="absolute right-0 bottom-0 2xl:rounded-b-2xl overflow-hidden h-full lg:h-auto"
                     src="/img/AndreyEvtukh.webp" />
                <span
                    className="flex flex-col items-center justify-center aspect-square top-1/12 rounded-full bg-dark-3 absolute shadow-sm p-0.5
                    md:p-1
                    w-1/12 md:w-1/12 lg:w-1/12
                    right-1/12 md:right-1/25 lg:right-5/7 xl:right-4/7 lg:top-1/12 lg:p-3 ">
                        <AppIcon name={Icon.NAME.JAVA} className="h-full! w-full!" isStatic />
                    </span>
                <span
                    className="flex flex-col items-center justify-center  w-1/12 aspect-square right-9/12 top-3/12 rounded-full bg-dark-3  absolute shadow-sm p-0.5
                    md:p-1
                    lg:w-1/12 lg:right-6/7 xl:right-5/7 lg:top-1/3 lg:p-2">
                         <AppIcon name={Icon.NAME.TS} className="h-full! w-full!" isStatic />
                    </span>
                <span
                    className="flex flex-col items-center justify-center  aspect-square rounded-full bg-dark-3  absolute shadow-sm p-1
                    md:p-3
                    right-7/12 lg:right-5/9
                    top-5/7 lg:top-2/3
                    w-3/12 lg:w-32
                    lg:p-6">
                        <AppIcon name={Icon.NAME.REACT} className="h-full! w-full!" isStatic />
                </span>

                <span className="w-3 h-3 right-2/3 lg:right-3/5 xl:right-4/8 rounded-full bg-pink absolute
                    top-7/12 sm:top-1/2
                    lg:w-6 lg:h-6  lg:top-44
                "></span>
                <span className="w-1 h-1 right-1/12  rounded-full bg-gold absolute
                    top-3/12 lg:top-1/12
                    lg:w-2 lg:h-2
                    lg:right-1/12 lg:top-10"></span>
            </div>
        </div>
        {footer("flex lg:hidden w-full bg-dark-3! z-50 border-0 rounded-0 p-0 sm:p-2")}

        <div className="absolute w-full min-h-1/2 gradient-fade-black bottom-0 opacity-30"></div>
        <div
            className="absolute w-full min-h-1/2 gradient-black-fade bottom-0 opacity-30 transform translate-y-full"></div>
    </section>);
};

export default AppBanner;