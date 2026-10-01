'use client';

import AppHeader from '@/components/layout/header';
import AppBanner from '@/components/layout/banner';
import AboutSection from '@/sections/about';
import AppFooter from '@/components/layout/footer';
import AppNavigation from '@/components/layout/navigation';
import { Navigation } from '@/config/navigation';
import AppAlert from '@/components/layout/alert';
import ResumeSection from '@/sections/resume';
import SkillsSection from '@/sections/skills';
import ProjectsSection from '@/sections/progects';
import ContactsSection from '@/sections/contacts';

const HomePage = () => {
    return (
        <>
            <main id="home"
                  className="flex flex-col w-full max-w-[1440px] bg-dark-2 min-h-dvh relative"
            >
                <AppAlert></AppAlert>

                <AppNavigation location={Navigation.LOCATION.SIDE}/>

                <div className="absolute w-full min-h-1/2 gradient-black-fade top-0 opacity-30 left-0"/>

                <AppHeader/>

                <AppBanner/>

                <AboutSection/>

                <ResumeSection/>

                <SkillsSection/>

                <ProjectsSection/>

                <ContactsSection/>

                <AppFooter/>
            </main>
        </>
    );
};

export default HomePage;