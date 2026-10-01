import AppIcon from '@/components/ui/icon/icon';
import AppButton from '@/components/ui/button/button';
import { Icon } from '@/config/icon';
import {
    VerifyFormProps,
    openModal,
} from '@/store/modals/modals.slice';
import { setUser } from '@/store/user/user.slice';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { Auth } from '@/features/auth/graphql/auth';
import RegisterMutation = Auth.RegisterMutation;
import VerifyMutation = Auth.VerifyMutation;
import { CombinedGraphQLErrors } from '@apollo/client';
import NavigateBack from '@/components/ui/modal/components/NavigateBack';
import ModalControls from '@/components/ui/modal/components/ModalControls';
import ErrorConsole from '@/components/ui/modal/components/ErrorConsole';

const OTP_LENGTH = 6;

const secondsToTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const getCellValues = (value: string): string[] =>
    Array.from(
        { length: OTP_LENGTH },
        (_, index) => value[index] ?? '',
    );

const getRemainingSeconds = (expiresAt: string) =>
    Math.max(
        0,
        Math.ceil(
            (new Date(expiresAt).getTime() - Date.now()) / 1000,
        ),
    );

const getGraphQLErrorMessage = (error: unknown): string => {
    if (CombinedGraphQLErrors.is(error)) {
        return error.errors[0]?.message ?? 'Request failed';
    }

    return 'No connection occurred';
};

const VerifyForm = ({
                        username,
                        password,
                        email,
                        expiresAt,
                    }: VerifyFormProps) => {
    const dispatch = useDispatch();

    const otpInputRef = useRef<HTMLInputElement>(null);

    const [currentExpiresAt, setCurrentExpiresAt] = useState(expiresAt);
    const [inputValue, setInputValue] = useState('');
    const [activeCell, setActiveCell] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [register] = useMutation<RegisterMutation>(Auth.register);
    const [verify] = useMutation<VerifyMutation>(Auth.verify);

    const cellValues = getCellValues(inputValue);
    const isCodeComplete = inputValue.length === OTP_LENGTH;

    const [counter, setCounter] = useState(() =>
        getRemainingSeconds(expiresAt),
    );

    useEffect(() => {
        const updateCounter = () => {
            setCounter(getRemainingSeconds(currentExpiresAt));
        };

        updateCounter();

        const timerId = window.setInterval(updateCounter, 1000);

        return () => window.clearInterval(timerId);
    }, [currentExpiresAt]);

    const focusInput = () => {
        otpInputRef.current?.focus();
    };

    const updateInputValue = (value: string) => {
        const normalizedValue = value
            .replace(/\D/g, '')
            .slice(0, OTP_LENGTH);

        setInputValue(normalizedValue);

        setActiveCell(
            Math.min(normalizedValue.length, OTP_LENGTH - 1),
        );
    };

    const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateInputValue(event.currentTarget.value);
    };

    const onKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        switch (event.key) {
            case 'ArrowLeft':
                event.preventDefault();

                setActiveCell((value) => Math.max(value - 1, 0));
                break;

            case 'ArrowRight':
                event.preventDefault();

                setActiveCell((value) =>
                    Math.min(value + 1, OTP_LENGTH - 1),
                );
                break;

            case 'Backspace':
                if (inputValue.length > 0) {
                    setInputValue((value) => value.slice(0, -1));

                    setActiveCell((value) =>
                        Math.max(value - 1, 0),
                    );
                }
                break;

            case 'Delete':
                setInputValue((value) => value.slice(0, -1));
                break;
        }
    };

    const onPaste = (event: React.ClipboardEvent) => {
        event.preventDefault();

        const value = event.clipboardData
            .getData('text')
            .replace(/\D/g, '')
            .slice(0, OTP_LENGTH);

        if (!value) {
            return;
        }

        updateInputValue(value);
        focusInput();
    };

    const onCellClick = (index: number) => {
        setActiveCell(index);
        focusInput();
    };

    const onVerify = async () => {
        if (!isCodeComplete || isWaiting) {
            return;
        }

        setIsWaiting(true);
        setErrorMessage(null);

        try {
            const { data } = await verify({
                variables: {
                    input: {
                        email,
                        code: inputValue,
                    },
                },
            });

            if (data?.verify?.id) {
                dispatch(setUser(data.verify));
                dispatch(openModal({ id: 'congratulations' }));
            }
        } catch (error) {
            setErrorMessage(getGraphQLErrorMessage(error));
        } finally {
            setIsWaiting(false);
        }
    };

    const resendCode = async () => {
        if (isWaiting) {
            return;
        }

        setIsWaiting(true);
        setErrorMessage(null);
        setInputValue('');
        setActiveCell(0);

        try {
            const { data } = await register({
                variables: {
                    input: {
                        username,
                        email,
                        password,
                    },
                },
            });

            const newExpiresAt = data?.register?.expiresAt;

            if (data?.register?.success && newExpiresAt) {
                setCurrentExpiresAt(newExpiresAt);
                focusInput();
            }
        } catch (error) {
            setErrorMessage(getGraphQLErrorMessage(error));
        } finally {
            setIsWaiting(false);
        }
    };

    const goRegister = () => {
        dispatch(openModal({ id: 'register' }));
    };

    return (
        <article className="flex w-full flex-col items-center gap-8 text-dark-9">
            <NavigateBack goTo={goRegister} />

            <div className="mt-4 flex w-full flex-col items-center gap-4">
                <div
                    className="
                        dialog-drag-handle
                        flex h-16 w-16
                        items-center justify-center
                        rounded-full
                        bg-bronze-30
                    "
                >
                    <AppIcon
                        name={Icon.NAME.LOGIN}
                        className="h-6 w-6 text-bronze"
                    />
                </div>

                <h2 className="font-medium uppercase">
                    Verify your identity
                </h2>

                <p className="px-4 text-center">
                    Please enter the verification code that was sent to{' '}
                    <span className="font-medium">
                        {email}
                    </span>
                </p>
            </div>

            <input
                ref={otpInputRef}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={OTP_LENGTH}
                value={inputValue}
                onChange={onInput}
                onKeyDown={onKeyDown}
                onPaste={onPaste}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="
                    absolute
                    h-0 w-0
                    opacity-0
                    pointer-events-none
                "
            />

            <div
                className="flex flex-row gap-2"
                onClick={focusInput}
                onPaste={onPaste}
            >
                {cellValues.map((value, index) => (
                    <div
                        key={`otp-cell-${index}`}
                        onClick={() => onCellClick(index)}
                        className={[
                            'relative flex h-12 min-w-10',
                            'cursor-text flex-col',
                            'items-center justify-center',
                            'rounded-sm bg-dark-4',
                            'border border-transparent',
                            'font-medium',
                            isFocused && activeCell === index
                                ? 'active-cell'
                                : '',
                        ].join(' ')}
                    >
                        <span>{value}</span>
                    </div>
                ))}
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-1">
                <p>
                    Code expires in{' '}
                    <span className="font-medium">
                        {secondsToTime(counter)}
                    </span>
                </p>

                <AppButton
                    label="Resend code"
                    className="text-bronze hover:underline"
                    callBackFunc={resendCode}
                    isDisabled={isWaiting}
                />
            </div>

            <ErrorConsole
                isWaiting={isWaiting}
                message={errorMessage}
            />

            <ModalControls
                isWaiting={isWaiting}
                isValid={isCodeComplete}
                onSubmit={onVerify}
            />
        </article>
    );
};

export default VerifyForm;