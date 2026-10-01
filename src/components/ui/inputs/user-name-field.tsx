import { useState } from 'react';

interface PasswordFieldProps {
    placeholder?: string;
    label?: string | boolean;
    userName: string;
    setUserName: (userName: string) => void;
}

const UserNameField = ({ placeholder, label = "User Name", userName, setUserName }: PasswordFieldProps) => {
    const [userNameTouched, setUserNameTouched] = useState(false);
    const noUserName = userName.length === 0;

    return (<>
            {label !== false &&  <label htmlFor="userName" className={'text-dark-9 text-[10px] p-2'}>{label} *</label>}

            <input id="userName"
                   type="text"
                   value={userName}
                   placeholder={placeholder}
                   onBlur={() => setUserNameTouched(true)}
                   onChange={(event) => setUserName(event.target.value)}
                   className="border border-dark-8 p-2 rounded-sm focus-visible:outline-none text-dark-9"
                   required/>
            {userNameTouched && noUserName && (
                <div
                    className="text-dark-9 bg-red-700 px-1 m-1 text-12 absolute bottom-0 left-0 right-0 transform translate-y-full -mb-1 h-5 leading-5">
                    <small className={'h-5 leading-[20px] block'}>
                        {noUserName && <span>User name is required</span>}
                    </small>
                </div>
            )}
        </>
    );
};

export default UserNameField;