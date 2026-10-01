import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Language = 'en' | 'pl' | 'ru';

type LanguageState = {
    activeLanguage: Language;
};

const initialState: LanguageState = {
    activeLanguage: 'en',
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<Language>) => {
            state.activeLanguage = action.payload;
        },
    },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;