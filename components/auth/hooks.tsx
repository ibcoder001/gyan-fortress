'use client';
import { useSignIn, useSignUp } from '@clerk/nextjs';

const AuthWrapper = () => {
    const useSignHook = useSignUp();
    const useLoginHook = useSignIn();
    console.log({ useLoginHook, useSignHook });
    return <></>;
};

export default AuthWrapper;