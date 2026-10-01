import AppIcon from '@/components/ui/icon/icon';
import { Icon } from '@/config/icon';
import { useState } from 'react';

interface PasswordFieldProps {
    label?: string;
    password: string;
    confirmPassword: string;
    setConfirmPassword: (password: string) => void;
}

const ConfirmPasswordField = ({ label = 'Password', password, confirmPassword, setConfirmPassword }: PasswordFieldProps) => {
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const noConfirmPassword = confirmPassword.length === 0;
    const passwordsDoNotMatch = !noConfirmPassword && password !== confirmPassword;

    const togglePassword = () => setShowPassword(prev => !prev);

    return (<>
            <label htmlFor="password" className={'text-dark-9 text-10 p-2'}>{label} *</label>
            <div className={'w-full flex flex-row gap-4 relative'}>
                <input id="password"
                       type={showPassword ? 'text' : 'password'}
                       value={confirmPassword}
                       onBlur={() => setPasswordTouched(true)}
                       onChange={(event) => setConfirmPassword(event.target.value)}
                       className="w-full border border-dark-8 p-2 rounded-sm focus-visible:outline-none text-dark-9"
                       required/>
                <button type="button" className="cursor-pointer color-dark-9"
                        onClick={togglePassword}>
                    <AppIcon name={
                                 !showPassword
                                     ? Icon.NAME.EYE_OFF
                                     : Icon.NAME.EYE_ON
                             } className={'h-6 w-6'}/>
                </button>
            </div>
            {
                passwordTouched && (passwordsDoNotMatch || noConfirmPassword) && (
                    <div className="text-dark-9 bg-red-700 px-1 m-1 text-12 absolute bottom-0 left-0 right-0 transform translate-y-full -mb-1 mr-10.5 h-5 leading-5
                        ">
                        <small className={'h-5 leading-5 block'}>
                            {noConfirmPassword && <span>Confirm password is required</span>}
                            {passwordsDoNotMatch && !noConfirmPassword && <span>Passwords don't match</span>}
                        </small>
                    </div>
                )
            }
        </>
    );
};

export default ConfirmPasswordField;