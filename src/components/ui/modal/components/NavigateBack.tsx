import AppIcon from '@/components/ui/icon/icon';
import { Icon } from '@/config/icon';

const NavigateBack = ({goTo}: {goTo: () => void}) => (
    <div className="flex flex-row absolute top-0 left-0 items-center pt-4 pl-4 cursor-pointer text-dark-9 gap-1"
         onClick={goTo}>
        <AppIcon name={Icon.NAME.ARROW}
                 className="h-5 leading-5 aspect-square text-dark-9 transform rotate-180"/>
        <span className={'h-5 leading-5'}>Back</span>
    </div>
);

export default NavigateBack;