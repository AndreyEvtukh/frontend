import AppLanguages from '@/components/layout/languages';
import AppIcon from '@/components/ui/icon/icon';
import { Icon } from '@/config/icon';

const year = new Date().getFullYear();

const AppFooter = () => (
    <footer className="flex flex-col px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="flex flex-row py-4 md:py-8 items-center w-full gap-2 md:gap-0 justify-between">

            <div className="flex flex-col items-start  h-full gap-2">
                <div className="text-16">Andrey&#160;<span className="text-bronze">Evtukh</span></div>
                <div className="text-14 opacity-40">Built with React · Next · Spring Boot</div>
                <div className="text-14 text-bronze mt-4 list-item list-inside">Available for new projects</div>
            </div>


            <div className="flex flex-col md:flex-row  gap-2 md:gap-4 text-14 justify-end h-full px-8 md:px-0 "
                 translate="no">
                <a href="https://github.com/AndreyEvtukh/skillbox-java-spring" target="_blank"
                   className={'flex flex-row gap-2 items-center'}>
                    <AppIcon name={Icon.NAME.GITHUB} className={'h-3 aspect-square'}/><span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/andrey-evtukh/" target="_blank"
                   className={'flex flex-row gap-2 items-center'}>
                    <AppIcon name={Icon.NAME.LINKEDIN} className={'h-3 aspect-square'}/><span>LinkedIn</span>
                </a>
                <a href="https://t.me/egorE_13" target="_blank" className={'flex flex-row gap-2 items-center'}>
                    <AppIcon name={Icon.NAME.TELEGRAM} className={'h-3 aspect-square'}/><span>Telegram</span>
                </a>
            </div>
        </div>

        <div className="border-b border-b-solid border-b-dark-4"></div>

        <div className="flex flex-row w-full pt-4 pb-4 md:pb-12 justify-between text-14 items-center relative">
            <div className="z-10 text-dark-6">© {year} Andrey Evtukh</div>
            <AppLanguages/>
            <div
                className="-mx-24 absolute inset-0 gradient-fade-black z-0 opacity-30"></div>
        </div>

    </footer>
);


export default AppFooter;