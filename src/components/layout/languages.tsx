'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setLanguage } from '@/store/language/language.slice';

const languages = [
    {
        id: 'en',
        title: 'En',
    },
    {
        id: 'pl',
        title: 'Pl',
    },
    {
        id: 'ru',
        title: 'Ru',
    },
] as const;

const AppLanguages = () => {
    const dispatch = useDispatch();

    const activeLanguage = useSelector(
        (state: RootState) => state.language.activeLanguage,
    );

    const changeLanguage = (language: 'en' | 'pl' | 'ru') => {
        dispatch(setLanguage(language));

        const select = document.querySelector<HTMLSelectElement>(
            '.goog-te-combo',
        );

        if (!select) {
            return;
        }

        select.value = language;
        select.dispatchEvent(new Event('change'));
    };

    return (
        <div
            className="notranslate z-10 flex flex-row gap-4 rounded-md bg-dark-1 px-4 py-2 text-14 text-dark-6"
            translate="no"
        >
            {languages.map((language) => {
                const isActive = language.id === activeLanguage;

                return (
                    <button
                        key={language.id}
                        type="button"
                        disabled={isActive}
                        onClick={() => changeLanguage(language.id)}
                        className={[
                            'transition-colors duration-200',
                            'hover:text-dark-9',
                            isActive
                                ? 'cursor-default text-bronze'
                                : 'cursor-pointer',
                        ].join(' ')}
                    >
                        {language.title}
                    </button>
                );
            })}
        </div>
    );
};

export default AppLanguages;