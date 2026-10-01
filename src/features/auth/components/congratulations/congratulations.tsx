import AppIcon from '@/components/ui/icon/icon';
import AppButton from '@/components/ui/button/button';
import { Icon } from '@/config/icon';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/store/modals/modals.slice';

const Congratulations = () => {
    const dispatch = useDispatch();

    return (
        <article className="flex flex-col gap-8 w-full items-center text-dark-9">
            <div className="flex flex-col gap-4 w-full items-center mt-4 mb-8">
                <div
                    className="dialog-drag-handle flex items-center justify-center w-16 h-16 rounded-full bg-bronze-30">
                    <AppIcon name={Icon.NAME.SUCCESS} className="w-6 h-6 text-bronze"/>
                </div>

                <h2 className="font-medium uppercase"> Congratulations! </h2>

                <p className="px-4 text-center text-14">
                    You’ve successfully logged in.
                </p>
            </div>

            <div className="w-full flex flex-col items-center justify-center gap-6 p-4 pt-0">
                <AppButton label={"Next"}
                           className={'bg-bronze text-dark-2 border-bronze border font-medium w-full max-w-2xs text-center flex items-center justify-center ' +
                               'disabled:bg-dark-3 disabled:text-dark-6 disabled:border-dark-4 hover:bg-bronze-hover'}
                           callBackFunc={() => dispatch(closeModal())}/>
            </div>
        </article>
    );
};

export default Congratulations;