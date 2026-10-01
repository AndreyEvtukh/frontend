'use client';


import { useAuthMe } from '@/features/auth/hooks/useAuthMe';

const AuthInitializer = () => {
    useAuthMe();
    return null;
};

export default AuthInitializer;