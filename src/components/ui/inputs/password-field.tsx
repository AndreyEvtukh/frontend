import AppIcon from '@/components/ui/icon/icon';
import { Icon } from '@/config/icon';
import { useState } from 'react';

interface PasswordFieldProps {
    label?: string;
    password: string;
    setPassword: (password: string) => void;
}

const PasswordField = ({ label = 'Password', password, setPassword }: PasswordFieldProps) => {
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const noPassword = password.length === 0;
    const passwordIsInvalid = !noPassword && /\s/.test(password);

    const togglePassword = () => setShowPassword(prev => !prev);

    return (<>
            <label htmlFor="password" className={'text-dark-9 text-10 p-2'}>{label} *</label>
            <div className={'w-full flex flex-row gap-4 relative'}>
                <input id="password"
                       type={showPassword ? 'text' : 'password'}
                       value={password}
                       onBlur={() => setPasswordTouched(true)}
                       onChange={(event) => setPassword(event.target.value)}
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
                passwordTouched && (passwordIsInvalid || noPassword) && (
                    <div className="text-dark-9 bg-red-700 px-1 m-1 text-12 absolute bottom-0 left-0 right-0 transform translate-y-full -mb-1 mr-10.5 h-5 leading-5
                        ">
                        <small className={'h-5 leading-5 block'}>
                            {noPassword && <span>Password is required</span>}
                            {passwordIsInvalid && <span>Password can't contain whitespace</span>}
                        </small>
                    </div>
                )
            }
        </>
    );
};

export default PasswordField;