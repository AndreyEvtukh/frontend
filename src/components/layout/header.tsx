import { Navigation } from "@/config/navigation";
import LOCATION = Navigation.LOCATION;
import AppNavigation from '@/components/layout/navigation';
import AppLanguages from '@/components/layout/languages';
import AuthButton from '@/features/auth/components/auth-button/AuthButton';

const AppHeader = () => {
    return (
        <header className="flex flex-row h-10 my-2 mx-4 lg:m-8 items-center relative">
            <div className="w-1/3 lg:flex justify-start font-light hidden">
                <AppNavigation location={LOCATION.HEADER}/>
            </div>
            <p className="w-1/2 flex justify-start font-light text-18 gap-1
            lg:w-1/3 lg:justify-center lg:text-24">
                <span>Andrey</span><span className="text-bronze font-medium">Evtukh</span></p>
            <div className="w-1/2 lg:w-1/3 flex">
                <div className="flex justify-end gap-2 w-full">
                    <AppLanguages/>
                    <AuthButton/>
                </div>
            </div>
        </header>
    )
}

export default AppHeader