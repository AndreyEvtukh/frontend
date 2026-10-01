import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { AnimatePresence, motion } from 'motion/react';
import { closeAlert } from '@/store/alert/alert.slice';
import { useEffect } from 'react';

const AppAlert = () => {
    const dispatch = useDispatch();

    const { message, type } = useSelector(
        (state: RootState) => state.alert
    );

    useEffect(() => {
        if (!message) {
            return;
        }

        const timer = setTimeout(() => {
            dispatch(closeAlert());
        }, 10_000);

        return () => clearTimeout(timer);
    }, [message, dispatch]);

    return (<AnimatePresence>{message &&
        (<motion.aside
            initial={{ opacity: 0, y: -4 }}
            animate={{
                opacity: 1, y: 0,
                transition: {
                    duration: 0.2,
                    ease: 'easeOut'
                }
            }}
            exit={{
                opacity: 0, y: -4,
                transition: {
                    duration: 0.2,
                    ease: 'easeIn'
                }
            }}
            className={[
                'fixed inset-0 h-6 font-mono text-12 flex items-center justify-center text-dark-9! z-50',
                type === 'error' ? 'bg-red-800' : '',
                type === 'warning' ? 'bg-amber-500' : '',
                type === 'info' ? 'bg-blue-500' : '',
            ].join(' ')}
            onClick={() => dispatch(closeAlert())}>
            <p>{message}</p>
        </motion.aside>)}
    </AnimatePresence>);
};

export default AppAlert;