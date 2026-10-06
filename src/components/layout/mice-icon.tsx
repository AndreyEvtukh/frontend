import AppIcon from "@/components/ui/icon/icon";
import { Icon } from "@/config/icon";

const MiceIcon = () => (
    <div
        className="
                        z-10 opacity-40 color-dark-9
                        transform scale-75 md:scale-100
                        -mt-16 mb-16
                        after:content-['']
                        after:block
                        after:absolute
                        after:h-8
                        after:top-10
                        after:left-1/2
                        after:border-r
                        after:border-dashed
                        after:border-dark-8
                        before:content-['']
                        before:block
                        before:absolute
                        before:h-2
                        before:w-2
                        before:rounded-full
                        before:top-16
                        before:left-1/2
                        before:border
                        before:border-dark-8
                        before:-translate-x-1/2
                        before:translate-y-full
                    "
    >
        <AppIcon name={Icon.NAME.MICE} className="color-dark-7 h-10 aspect-square" />
    </div>
);

export default MiceIcon;