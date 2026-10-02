"use client";

import Dialog from "@mui/material/Dialog";
import LoginForm from "@/features/auth/components/login/login-form";
import RegisterForm from "@/features/auth/components/register/register-form";
import VerifyForm from "@/features/auth/components/verify/verify-form";
import ModalAnimation from "@/components/ui/modal/ModalAnimation";

import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { closeModal } from "@/store/modals/modals.slice";
import { AnimatePresence } from "motion/react";
import Congratulations from "@/features/auth/components/congratulations/congratulations";
import ForgotPasswordForm from "@/features/auth/components/forgot-password/forgot-password-form";
import Testimonial from "@/components/ui/modal/testimonial/testimonial";

const AppModal = () => {
    const dispatch = useDispatch();

    const { modalId, modalData } = useAppSelector(
        (state) => state.modals
    );

    const handleClose = () => dispatch(closeModal());

    if (!modalId) {
        return null;
    }

    return (
        <Dialog open
                onClose={handleClose}
                slotProps={{
                    paper: {
                        className:
                            "flex flex-col items-center justify-center " +
                            "!bg-dark-2 !rounded-md p-4 border border-dark-3 " +
                            "w-[420px] max-h-[95vh] text-dark-9"
                    }
                }}
        >
            <div className={"size-full overflow-y-auto pr-4 -mr-4"}>
                <AnimatePresence mode="wait">
                    {modalId === "login" && (
                        <ModalAnimation key={modalId}>
                            <LoginForm />
                        </ModalAnimation>
                    )}

                    {modalId === "register" && (
                        <ModalAnimation key={modalId}>
                            <RegisterForm />
                        </ModalAnimation>
                    )}

                    {modalId === "congratulations" && (
                        <ModalAnimation key={modalId}>
                            <Congratulations />
                        </ModalAnimation>
                    )}

                    {modalId === "forgot-password" && (
                        <ModalAnimation key={modalId}>
                            <ForgotPasswordForm />
                        </ModalAnimation>
                    )}

                    {modalId === "verify" &&
                        modalData &&
                        "email" in modalData && (
                            <ModalAnimation key={modalId}>
                                <VerifyForm
                                    email={modalData.email}
                                    username={modalData.username}
                                    password={modalData.password}
                                    expiresAt={modalData.expiresAt}
                                />
                            </ModalAnimation>
                        )}

                    {modalId === "testimonial" &&
                        modalData &&
                        "authorName" in modalData && (
                            <ModalAnimation key={modalId}>
                                <Testimonial
                                    authorName={modalData.authorName}
                                    authorPosition={modalData.authorPosition}
                                    text={modalData.text}
                                    date={modalData.date}
                                />
                            </ModalAnimation>
                        )}
                </AnimatePresence>
            </div>
        </Dialog>
    );
};

export default AppModal;