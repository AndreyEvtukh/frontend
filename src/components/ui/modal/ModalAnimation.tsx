import { motion } from 'motion/react';

const ModalAnimation = ({ children, className }: { children: React.ReactNode; className?: string; }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={`w-full ${className ?? ''}`}
    >
        {children}
    </motion.div>
);

export default ModalAnimation;