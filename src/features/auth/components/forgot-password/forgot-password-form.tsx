'use client'

import AppIcon from '@/components/ui/icon/icon';
import { Icon } from '@/config/icon';
import EmailField from '@/components/ui/inputs/email-field';
import PasswordField from '@/components/ui/inputs/password-field';
import ErrorConsole from '@/components/ui/modal/components/ErrorConsole';
import ModalControls from '@/components/ui/modal/components/ModalControls';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { Auth } from '@/features/auth/graphql/auth';
import { closeModal, openModal } from '@/store/modals/modals.slice';
import { CombinedGraphQLErrors } from '@apollo/client';
import ConfirmPasswordField from '@/components/ui/inputs/confirm-password-field';
import NavigateBack from '@/components/ui/modal/components/NavigateBack';
import ResetPasswordMutation = Auth.ResetPasswordMutation;
import { showAlert } from '@/store/alert/alert.slice';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPasswordForm = () => {
    const dispatch = useDispatch();

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

    const [resetPassword] = useMutation<ResetPasswordMutation>(Auth.resetPassword);

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

            const { data } = await resetPassword({
                variables: {
                    input: {
                        email,
                        password
                    }
                }
            });

            if (data?.resetPassword.success) {
                dispatch(closeModal());
                dispatch(showAlert({
                    type: 'info',
                    message: 'Password changed successfully.'
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
                <h2 className="uppercase font-medium text-dark-9">Forgot Password</h2>
            </div>

            <form className={'flex flex-col justify-center max-w-2xs w-full text-dark-9 mb-8'}>
                <div className={'flex flex-col pt-6 relative'}>
                    <EmailField email={email} setEmail={setEmail}/>
                </div>

                <div className={'flex flex-col pt-6 relative'}>
                    <PasswordField label="New password" password={password} setPassword={setPassword}/>
                </div>

                <div className={'flex flex-col pt-6 relative'}>
                    <ConfirmPasswordField label="Confirm new password"
                                          password={password}
                                          confirmPassword={confirmPassword}
                                          setConfirmPassword={setConfirmPassword}/>
                </div>
            </form>

            <ErrorConsole isWaiting={isWaiting} message={errorMessage}/>

            <ModalControls okText={'Reset Password  '} isWaiting={isWaiting} isValid={isValid} onSubmit={onSubmit}/>

        </div>
    )
}

export default ForgotPasswordForm;