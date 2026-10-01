import { useState } from 'react';

interface PasswordFieldProps {
    label?: string | boolean;
    placeholder?: string;
    email: string;
    setEmail: (email: string) => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EmailField = ({ placeholder, label = "Email", email, setEmail }: PasswordFieldProps) => {
    const [emailTouched, setEmailTouched] = useState(false);
    const noEmail = email.length === 0;
    const emailIsInvalid = !noEmail && !EMAIL_REGEX.test(email);

    return (<>
            {label !== false &&  <label htmlFor="email" className={'text-dark-9 text-[10px] p-2'}>{label} *</label>}
            <input id="email"
                   type="email"
                   value={email}
                   placeholder={placeholder}
                   onBlur={() => setEmailTouched(true)}
                   onChange={(event) => setEmail(event.target.value)}
                   className="border border-dark-8 p-2 rounded-sm focus-visible:outline-none text-dark-9"
                   required/>
            {emailTouched && (emailIsInvalid || noEmail) && (
                <div
                    className="text-dark-9 bg-red-700 px-1 m-1 text-12 absolute bottom-0 left-0 right-0 transform translate-y-full -mb-1 h-5 leading-5">
                    <small className={'h-5 leading-5 block'}>
                        {noEmail && <span>E-mail is required</span>}
                        {emailIsInvalid && <span>E-Email is invalid</span>}
                    </small>
                </div>
            )}
        </>
    );
};

export default EmailField;