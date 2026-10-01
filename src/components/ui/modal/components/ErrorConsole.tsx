import { AnimatePresence } from 'motion/react';
import ModalAnimation from '@/components/ui/modal/ModalAnimation';
import AppSpinner from '@/components/ui/spinner/spinner';
import { useEffect, useState } from 'react';

const ErrorConsole = ({ message, isWaiting }: {
    message: string | null,
    isWaiting: boolean
}) => {
    const [error, setError] = useState<string | null>(message);

    useEffect(() => setError(message), [message]);

    const dismissError = () => setError(null);

    return (
        <div className="relative flex flex-row justify-center items-center w-full min-h-8">
            <AnimatePresence mode="wait">
                {isWaiting ? (
                        <ModalAnimation key="spinner" className={'absolute h-6! w-6!'}>
                            <AppSpinner/>
                        </ModalAnimation>)
                    : error ? (
                            <ModalAnimation
                                key="error"
                                className="absolute flex justify-center text-center items-center max-w-2xs w-full font-monospace
                                               py-2 px-8 bg-dark-1 rounded-sm border border-dark-4 text-10 text-dark-8">

                                <span>{message}</span>
                                <button type="button"
                                        aria-label="Close error"
                                        className="top-1/2 transform -translate-y-1/2 absolute right-1 w-4 h-4
                            bg-dark-3 flex justify-center items-center rounded-full cursor-pointer"
                                        onClick={dismissError}>&times;</button>

                            </ModalAnimation>)
                        : null}
            </AnimatePresence>
        </div>
    );
};

export default ErrorConsole;