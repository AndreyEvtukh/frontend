import AppIcon from '@/components/ui/icon/icon';
import { Icon } from '@/config/icon';
import { useState } from 'react';
import AppButton from '@/components/ui/button/button';
import { useMutation } from '@apollo/client/react';
import { Auth } from '@/features/auth/graphql/auth';
import { useDispatch } from 'react-redux';
import { showAlert } from '@/store/alert/alert.slice';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactProps = [
    {
        icon: Icon.NAME.LINKEDIN,
        href: 'https://www.linkedin.com/in/andrey-evtukh/',
        label: 'LinkedIn'
    },
    {
        icon: Icon.NAME.PHONE,
        href: 'tel:+48886860858',
        label: '+(48) 886 860 858'
    },
    {
        icon: Icon.NAME.EMAIL,
        href: 'mailto:andrey.evtukh@gmail.com',
        label: 'Email'
    },
    {
        icon: Icon.NAME.TELEGRAM,
        href: 'https://t.me/egorE_13',
        label: 'Telegram'
    }
];

const downloadCV = () => {
    const link = document.createElement('a');

    link.href = '/cv/Andrey_Evtukh_CV.pdf';
    link.download = 'Andrey_Evtukh_CV.pdf';

    document.body.appendChild(link);
    link.click();
    link.remove();
}

export default function ContactsSection() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');

    const [userNameTouched, setUserNameTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [messageTouched, setMessageTouched] = useState(false);

    const userNameIsInvalid =
        userNameTouched && userName.trim().length === 0;

    const emailIsInvalid =
        emailTouched &&
        (email.trim().length === 0 || !EMAIL_REGEX.test(email));

    const messageIsInvalid = messageTouched && message.trim().length === 0;

    const isFormValid =
        userName.trim().length > 0 &&
        EMAIL_REGEX.test(email) &&
        message.trim().length > 0;

    const [sendEmail] = useMutation<Auth.SendEmailMutation>(Auth.sendEmail);
    const sendMessage = async () => {
        const { data } = await sendEmail({
            variables: {
                input: {
                    userName,
                    email,
                    message
                }
            }
        });

        if (data?.sendEmail.success) {
            dispatch(showAlert({
                type: 'info',
                message: 'Message sent successfully'
            }));

            setEmail('');
            setUserName('');
            setMessage('');

            setUserNameTouched(false);
            setEmailTouched(false);
            setMessageTouched(false);
        }
    };

    return (
        <section
            id="contacts"
            className="relative flex flex-col items-center justify-center pb-8 gradient-black-1-fade"
        >
            <div className="relative w-full flex flex-col items-center p-4 md:p-8 lg:p-12 xl:p-24 pb-0! pt-24!">

                <div
                    className="
                        z-10 opacity-40 color-dark-9
                        transform scale-75 md:scale-100
                        -mt-16 mb-16
                        after:content-['']
                        after:block
                        after:absolute
                        after:h-8
                        after:top-10
                        after:left-1/2
                        after:border-r
                        after:border-dashed
                        after:border-dark-8
                        before:content-['']
                        before:block
                        before:absolute
                        before:h-2
                        before:w-2
                        before:rounded-full
                        before:top-16
                        before:left-1/2
                        before:border
                        before:border-dark-8
                        before:-translate-x-1/2
                        before:translate-y-full
                    "
                >
                    <AppIcon
                        name={Icon.NAME.MICE}
                        className="color-dark-7 h-10 aspect-square"
                    />
                </div>

                <h3 className="font-light text-center text-18 text-bronze uppercase p-2 lg:p-0"> Contacts </h3>

                <p className="mt-2 text-center max-w-xl text-sm text-dark-8">
                    Feel free to reach out to discuss a project, collaboration, or career opportunity.
                </p>

                <div className="w-full grid grid-cols-1 md:gap-4 md:grid-cols-3 mt-8">

                    {/* CONTACT LINKS */}
                    <article className="flex flex-col gap-4">
                        {contactProps.map((prop) => (
                            <a
                                key={prop.href}
                                href={prop.href}
                                target="_blank"
                                translate="no"
                                rel="noopener noreferrer"
                                className=" relative w-full h-20 bg-dark-3 flex flex-col items-center justify-center
                                    gap-2 rounded-sm border border-dark-4 transition duration-200 hover:border-dark-6
                                    hover:bg-dark-6/10 ">
                                <AppIcon name={prop.icon} className="text-bronze h-6 aspect-square"/>

                                <p>{prop.label}</p>

                                <AppIcon name={Icon.NAME.OPEN}
                                         className="absolute right-2 bottom-2 text-dark-6 h-4 aspect-square"/>
                            </a>
                        ))}

                        <AppButton
                            className=" relative w-full h-20 bg-bronze hover:bg-bronze-hover
                                flex flex-col! items-center justify-center gap-2! rounded-sm border border-dark-4 "
                            callBackFunc={downloadCV}
                        >
                            <AppIcon name={Icon.NAME.DOWNLOAD} className="text-dark-1 h-6 aspect-square"/>
                            <span className="text-dark-1"> Download CV </span>
                        </AppButton>
                    </article>

                    {/* CONTACT FORM */}
                    <article className="col-span-2 relative h-full mt-4 md:mt-0">
                        <div className="flex flex-col relative gap-8 md:gap-8 h-full">

                            {/* NAME */}
                            <div className="flex flex-col relative">
                                <input
                                    id="userName"
                                    type="text"
                                    value={userName}
                                    placeholder="Your name"
                                    onBlur={() => setUserNameTouched(true)}
                                    onChange={(event) =>
                                        setUserName(event.target.value)
                                    }
                                    className={[
                                        'autofill-bronze',
                                        'border-b p-2',
                                        'focus-visible:outline-none',
                                        'text-dark-9 bg-dark-2',
                                        userNameIsInvalid
                                            ? 'border-b-red-500'
                                            : 'border-b-dark-8'
                                    ].join(' ')}
                                />

                                {userNameIsInvalid && (
                                    <p className="text-dark-9 bg-red-700 px-1 m-1 text-12 absolute bottom-0 left-0 transform translate-y-full -mb-1 h-5 leading-5">
                                        Name is required
                                    </p>
                                )}
                            </div>

                            {/* EMAIL */}
                            <div className="flex flex-col relative">
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    placeholder="Email"
                                    onBlur={() => setEmailTouched(true)}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    className={[
                                        'autofill-bronze',
                                        'border-b p-2',
                                        'focus-visible:outline-none',
                                        'text-dark-9 bg-dark-2',
                                        emailIsInvalid
                                            ? 'border-b-red-500'
                                            : 'border-b-dark-8'
                                    ].join(' ')}
                                />

                                {emailIsInvalid && (
                                    <p className="text-dark-9 bg-red-700 px-1 m-1 text-12 absolute bottom-0 left-0 transform translate-y-full -mb-1 h-5 leading-5">
                                        {email.trim().length === 0
                                            ? 'Email is required'
                                            : 'Please enter a valid email address'}
                                    </p>
                                )}
                            </div>

                            {/* MESSAGE */}
                            <div className="flex flex-col relative flex-1">
                                <textarea
                                    value={message}
                                    placeholder="Your message"
                                    onBlur={() => setMessageTouched(true)}
                                    onChange={(event) =>
                                        setMessage(event.target.value)
                                    }
                                    className={[
                                        'w-full flex-1 min-h-32 resize-none',
                                        'border-b p-2',
                                        'focus-visible:outline-none',
                                        'text-dark-9 bg-dark-2',
                                        messageIsInvalid
                                            ? 'border-b-red-500'
                                            : 'border-b-dark-8'
                                    ].join(' ')}
                                />

                                {messageIsInvalid && (
                                    <p className="text-dark-9 bg-red-700 px-1 m-1 text-12 absolute bottom-0 left-0 transform translate-y-full -mb-1 h-5 leading-5">
                                        Message is required
                                    </p>
                                )}
                            </div>

                            {/* SEND */}
                            <div className="flex flex-col relative items-start sm:items-center">
                                <AppButton
                                    isDisabled={!isFormValid}
                                    className="
                                        min-w-1/3
                                        whitespace-nowrap
                                        border
                                        bg-bronze
                                        hover:bg-bronze-hover
                                        text-dark-1
                                        font-medium
                                        text-center
                                        items-center
                                        justify-center
                                        transition-all duration-200
                                        pr-6!
                                        disabled:bg-dark-3
                                        disabled:text-dark-6
                                        disabled:border-dark-4
                                    "
                                    label="Send Message"
                                    callBackFunc={sendMessage}
                                />
                            </div>

                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}