import AppButton from '@/components/ui/button/button';
import { closeModal } from '@/store/modals/modals.slice';
import { useDispatch } from 'react-redux';

const ModalControls = (
    {
        okText = 'Continue',
        cancelText = 'Cancel',
        showCancel = true,
        isWaiting,
        isValid,
        onSubmit
    }: {
        okText?: string;
        cancelText?: string;
        showCancel?: boolean;
        isWaiting?: boolean;
        isValid?: boolean;
        onSubmit: () => void;
    }
) => {
    const dispatch = useDispatch();
    const close: () => void = () => dispatch(closeModal());

    return (
        <div className="w-full flex flex-col items-center justify-center gap-6 p-4 pt-0">
            <AppButton label={okText}
                       className={'bg-bronze text-dark-2 border-bronze border font-medium w-full max-w-2xs text-center flex items-center justify-center ' +
                           'disabled:bg-dark-3 disabled:text-dark-6 disabled:border-dark-4 hover:bg-bronze-hover'}
                       isDisabled={!isValid || isWaiting}
                       callBackFunc={onSubmit}/>

            {showCancel && (<AppButton label={cancelText}
                        className="cursor-pointer text-dark-9 p-0!"
                        callBackFunc={close}/>)}

        </div>
    );
};

export default ModalControls;