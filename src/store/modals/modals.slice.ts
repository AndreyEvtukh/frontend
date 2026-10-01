import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Testimonial } from '@/components/layout/testimonials';

export type ModalID =
    | 'confirm'
    | 'info'
    | 'login'
    | 'register'
    | 'forgot-password'
    | 'congratulations'
    | 'verify'
    | 'testimonial'
    | 'contacts'
    | null;

const initialState: ModalState = {
    modalId: null,
    modalData: null
};

export interface VerifyFormProps {
    username: string;
    email: string;
    password: string;
    expiresAt: string;
}

interface ModalState {
    modalId: ModalID | null;
    modalData: VerifyFormProps | Testimonial | null;
}

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        openModal: (
            state,
            action: PayloadAction<{
                id: ModalID;
                data?: VerifyFormProps | Testimonial;
            }>
        ) => {
            state.modalId = action.payload.id;
            state.modalData = action.payload.data ?? null;
        },

        closeModal: (state) => {
            state.modalId = null;
            state.modalData = null;
        }
    }
});

export const { openModal, closeModal } = modalsSlice.actions;

export default modalsSlice.reducer;