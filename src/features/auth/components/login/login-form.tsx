'use client';

import AppIcon from '@/components/ui/icon/icon';
import { Icon } from '@/config/icon';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from '@/store/modals/modals.slice';
import PasswordField from '@/components/ui/inputs/password-field';
import EmailField from '@/components/ui/inputs/email-field';
import AppButton from '@/components/ui/button/button';

import { useMutation } from '@apollo/client/react';
import { Auth } from '@/features/auth/graphql/auth';

import ErrorConsole from '@/components/ui/modal/components/ErrorConsole';
import ModalControls from '@/components/ui/modal/components/ModalControls';
import { setUser } from '@/store/user/user.slice';
import { CombinedGraphQLErrors } from '@apollo/client';
import LoginResponse = Auth.LoginResponse;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginForm = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isWaiting, setIsWaiting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const noEmail = email.length === 0;
    const emailIsInvalid = !noEmail && !EMAIL_REGEX.test(email);

    const noPassword = password.length === 0;
    const passwordIsInvalid = !noPassword && /\s/.test(password);

    const [login] = useMutation<LoginResponse>(Auth.login);

    const isValid =
        !noEmail &&
        !emailIsInvalid &&
        !noPassword &&
        !passwordIsInvalid;

    const goRegister = () => dispatch(openModal({ id: 'register' }));
    const goForgotPassword = () =>dispatch(openModal({ id: 'forgot-password' }));

    const onSubmit = async () => {
        try {
            setIsWaiting(true);
            setErrorMessage(null);

            const { data } = await login({
                variables: {
                    input: {
                        email,
                        password
                    }
                }
            });

            if (data?.login) {
                dispatch(setUser(data.login));
                dispatch(closeModal());
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
            <div className="flex flex-col gap-4 w-full items-center mt-4">
                <div
                    className=" dialog-drag-handle w-16 h-16 aspect-square rounded-full bg-bronze-30 flex flex-col justify-center items-center ">
                    <AppIcon name={Icon.NAME.LOGIN} className="text-bronze h-6 w-6"/>
                </div>
                <h2 className="uppercase font-medium text-dark-9">Sign In</h2>
            </div>

            <form className={'flex flex-col justify-center max-w-2xs w-full text-dark-9 mb-8'}>
                <div className={'flex flex-col pt-6 relative'}>
                    <EmailField email={email} setEmail={setEmail}/>
                </div>

                <div className={'flex flex-col pt-6 relative'}>
                    <PasswordField password={password} setPassword={setPassword}/>
                </div>
            </form>

            <div className="w-full flex flex-row gap-8 justify-center items-center">
                <AppButton className="cursor-pointer text-bronze capitalize hover:underline p-0!"
                           label={'Forgot Password?'}
                           callBackFunc={goForgotPassword}>
                </AppButton>

                <AppButton className="cursor-pointer text-bronze capitalize hover:underline p-0!"
                           label={'Register'}
                           callBackFunc={goRegister}>
                </AppButton>
            </div>

            <ErrorConsole isWaiting={isWaiting} message={errorMessage}/>

            <ModalControls okText={'Sign In'} isWaiting={isWaiting} isValid={isValid} onSubmit={onSubmit}/>

        </div>
    );
};

export default LoginForm;