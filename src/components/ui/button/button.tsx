import React from 'react';

interface ButtonProps {
    label?: string;
    className?: string;
    isDisabled?: boolean;
    children?: React.ReactNode;
    callBackFunc?: () => void;
}

const AppButton = ({
                       label,
                       className,
                       isDisabled,
                       children,
                       callBackFunc
                   }: ButtonProps) => {

    return (
        <button type="button"
                className={[
                    'flex flex-row gap-4 items-center cursor-pointer py-2.5 px-8 rounded-md transition-all duration-200 disabled:cursor-not-allowed',
                    className]
                    .filter(Boolean)
                    .join(' ')}
                disabled={isDisabled}
                onClick={() => callBackFunc ? callBackFunc() : null}>
            {label}
            {children}
        </button>
    );
};

export default AppButton;