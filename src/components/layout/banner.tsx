import AppIcon from '@/components/ui/icon/icon';
import { Icon } from '@/config/icon';
import AppButton from '@/components/ui/button/button';

const retro = [
    {
        id: 0,
        value: '11+',
        text: 'years\nexperience'
    }, {
        id: 1,
        value: '3',
        text: 'enterprise\nprojects'
    }, {
        id: 2,
        value: '18',
        text: 'projects completed\non 8 countries'
    }
];

const goContacts = () => {
    document.getElementById('contacts')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
};

const downloadCV = () => {
    const link = document.createElement('a');

    link.href = '/cv/Andrey_Evtukh_CV.pdf';
    link.download = 'Andrey_Evtukh_CV.pdf';

    document.body.appendChild(link);
    link.click();
    link.remove();
}

const AppBanner = () => {
    return (<section className="flex flex-col relative font-light">

        <div className="relative flex flex-row w-full aspect-video h-1/2 max-h-150 bg-dark-2 shadow-banner bg-dots z-10
                lg:rounded-2xl lg:mr-12 lg:-ml-12 lg:pr-4 lg:after:right-4 lg:before:right-22 lg:before:top-20
                before:absolute before:h-8/12 before:aspect-square before:right-4 before:top-10 before:rounded-full before:bg-dark-3
                after:absolute after:h-full after:w-1/2 after:right-0 after:top-0 after:bg-[linear-gradient(to_left,_#00000060_0%,_transparent_100%)]
                ">
            <div
                className="flex flex-col gap-4 lg:gap-8 w-1/2 relative z-10 p-4 lg:p-12 lg:justify-between pr-0 justify-around">
                <div className="flex flex-col justify-center lg:h-full gap-2 md:gap-4 lg:gap-8">
                    <header className="flex flex-col gap-2 lg:gap-8">
                        <p>
                            <span translate="no" className="py-0.5 px-1.5 text-10 text-dark-1 bg-bronze font-medium rounded-[2px] whitespace-nowrap
                            lg:py-1.5 lg:px-2 lg:rounded-sm">Full-Stack Developer</span>
                        </p>
                        <h2 className="text-24 lg:text-36 font-medium whitespace-nowrap">Develop — <span
                            className="block">from idea to production.</span>
                        </h2>
                    </header>
                    <p className="lg:ml-24 font-light text-14 lg:text-16 hidden md:block">
                        Senior Full-Stack Developer with 20+ years in software engineering and 10+ years in web
                        development. Specialized in Angular and TypeScript, with hands-on Java and Spring Boot
                        experience. I build and own solutions end to end — from frontend architecture and UX to backend
                        APIs and data.
                    </p>
                    <div className="flex-row mt-8 gap-8 hidden md:flex">
                        <AppButton
                            className="border border-bronze bg-dark-3 hover:bg-dark-2 transition-all duration-200 pr-6!"
                            callBackFunc={downloadCV}>
                            <span className="font-light">Download CV</span>
                            <AppIcon name={Icon.NAME.DOWNLOAD} className="color-dark-9 w-4! aspect-square "/>
                        </AppButton>
                        <AppButton className={'text-bronze p-0! hover:text-bronze-hover'} callBackFunc={goContacts}>
                            <span className="font-light">Let's Chat!</span>
                        </AppButton>
                    </div>
                </div>
                <footer className="flex flex-row gap-2  border border-dark-3 bg-dark-1 rounded-sm w-[130%] p-1 -ml-4 justify-center
                    lg:gap-10 lg:border-none lg:bg-transparent lg:p-0 md:ml-0 md:w-full
                ">
                    {
                        retro.map(item =>
                            (<div
                                key={item.id}
                                className="w-1/3 flex flex-col gap-1 items-center text-center
                                lg:flex-row lg:gap-3 lg:text-start">
                                <div className="text-18 lg:text-36 font-medium">{item.value}</div>
                                <div className="text-10 lg:text-14 font-mono lg:font-light">{item.text}</div>
                            </div>))
                    }
                </footer>
            </div>

            <div className="w-1/2 relative z-10">
                <img alt="Andrey Evtukh" className="absolute right-0 bottom-0 h-full" src="/img/AndreyEvtukh.webp"/>
                <span
                    className="flex flex-col items-center justify-center w-2/12 aspect-square rounded-full bg-dark-3  right-6/12 top-2/3 absolute shadow-sm p-3
                    lg:right-72 lg:top-2/3  lg:w-32 lg:h-32 lg:p-6">
                        <AppIcon name={Icon.NAME.REACT} className="h-full! w-full!" isStatic/>
                    </span>
                <span
                    className="flex flex-col items-center justify-center  w-1/12 aspect-square right-9/12 top-3/12 rounded-full bg-dark-3  absolute shadow-sm p-1
                    lg:w-1/12 lg:right-2/3 lg:top-1/3 lg:p-2">
                         <AppIcon name={Icon.NAME.TS} className="h-full! w-full!" isStatic/>
                    </span>
                <span
                    className="flex flex-col items-center justify-center w-2/12 aspect-square right-1/3 top-1/12 rounded-full bg-dark-3 absolute shadow-sm p-1
                    lg:w-1/12 lg:right-1/3 lg:top-1/12 lg:p-3">
                        <AppIcon name={Icon.NAME.JAVA} className="h-full! w-full!" isStatic/>
                    </span>
                <span className="w-3 h-3 right-8/12 top-6/12 rounded-full bg-pink absolute
                    lg:w-6 lg:h-6 lg:right-6/12 lg:top-44
                "></span>
                <span className="w-1 h-1 right-1/12 top-1/12 rounded-full bg-gold absolute
                    lg:w-2 lg:h-2 lg:right-1/12 lg:top-10"></span>
            </div>
        </div>
        <div className="absolute w-full min-h-1/2 gradient-fade-black bottom-0 opacity-30"></div>
        <div
            className="absolute w-full min-h-1/2 gradient-black-fade bottom-0 opacity-30 transform translate-y-full"></div>
    </section>);
};

export default AppBanner;