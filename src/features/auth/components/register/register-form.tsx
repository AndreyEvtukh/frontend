'use client';

import AppIcon from '@/components/ui/icon/icon';
import { Icon } from '@/config/icon';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from '@/store/modals/modals.slice';
import PasswordField from '@/components/ui/inputs/password-field';
import ConfirmPasswordField from '@/components/ui/inputs/confirm-password-field';
import EmailField from '@/components/ui/inputs/email-field';
import UserNameField from '@/components/ui/inputs/user-name-field';

import { CombinedGraphQLErrors } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { Auth } from '@/features/auth/graphql/auth';
import RegisterMutation = Auth.RegisterMutation;
import ErrorConsole from '@/components/ui/modal/components/ErrorConsole';
import NavigateBack from '@/components/ui/modal/components/NavigateBack';
import ModalControls from '@/components/ui/modal/components/ModalControls';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterForm = () => {
    const dispatch = useDispatch();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isWaiting, setIsWaiting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const noEmail = email.length === 0;
    const emailIsInvalid = !noEmail && !EMAIL_REGEX.test(email);

    const noPassword = password.length === 0;
    const passwordIsInvalid = !noPassword && /\s/.test(password);

    const noConfirmPassword = confirmPassword.length === 0;
    const confirmPasswordIsInvalid = !noConfirmPassword && /\s/.test(confirmPassword);

    const passwordsDoNotMatch = !noConfirmPassword && password !== confirmPassword;

    const [register] = useMutation<RegisterMutation>(Auth.register);

    const isValid =
        !noEmail &&
        !emailIsInvalid &&
        !noPassword &&
        !passwordIsInvalid &&
        !noConfirmPassword &&
        !confirmPasswordIsInvalid &&
        !passwordsDoNotMatch;

    const goLogin = () => dispatch(openModal({ id: 'login' }));

    const onSubmit = async () => {
        try {
            setIsWaiting(true);
            setErrorMessage(null);

            let { data } = await register({
                variables: {
                    input: {
                        username: userName,
                        email,
                        password
                    }
                }
            });

            if (data?.register.success && data.register.expiresAt) {
                dispatch(openModal({
                    id: 'verify',
                    data: {
                        email,
                        password,
                        username: userName,
                        expiresAt: data?.register.expiresAt
                    }
                }));
            }
        } catch (error) {
            if (CombinedGraphQLErrors.is(error)) {
                const graphQLError = error.errors[0];
                const message = graphQLError?.message;
                setErrorMessage(message ?? null);
            } else {
                setErrorMessage("No connection occurred");
            }
        } finally {
            setIsWaiting(false);
        }
    };

    return (
        <div className="flex flex-col gap-8 w-full items-center">
            <NavigateBack goTo={goLogin}/>

            <div className="flex flex-col gap-4 w-full items-center mt-4">
                <div
                    className=" dialog-drag-handle w-16 h-16 aspect-square rounded-full bg-bronze-30 flex flex-col justify-center items-center ">
                    <AppIcon name={Icon.NAME.LOGIN} className="text-bronze h-6 w-6"/>
                </div>
                <h2 className="uppercase font-medium text-dark-9">Register</h2>
            </div>

            <form className={'flex flex-col justify-center max-w-2xs w-full text-dark-9 mb-8'}>
                <div className={'flex flex-col pt-6 relative'}>
                    <UserNameField userName={userName} setUserName={setUserName}/>
                </div>

                <div className={'flex flex-col pt-6 relative'}>
                    <EmailField email={email} setEmail={setEmail}/>
                </div>

                <div className={'flex flex-col pt-6 relative'}>
                    <PasswordField password={password} setPassword={setPassword}/>
                </div>

                <div className={'flex flex-col pt-6 relative'}>
                    <ConfirmPasswordField password={password}
                                          confirmPassword={confirmPassword}
                                          setConfirmPassword={setConfirmPassword}/>
                </div>
            </form>

            <ErrorConsole message={errorMessage} isWaiting={isWaiting}/>

            <ModalControls okText={"Register"} isWaiting={isWaiting} isValid={isValid} onSubmit={onSubmit}/>

        </div>
    );
};

export default RegisterForm;