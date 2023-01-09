'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { toastMessage } from "@lib/helpers/toast";
import {
    contactMeFormSchema,
    forgotPasswordFormSchema,
    loginFormSchema,
    loginVerificationFormSchema,
    signUpFormSchema,
    TContactMeFormSchema,
    TForgotPasswordFormSchema,
    TLoginFormSchema,
    TLoginVerificationFormSchema,
    TSignUpFormSchema
} from '@lib/types/form';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { sanitize } from 'dompurify';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaInstagram, FaLinkedinIn, FaMailBulk, FaTwitter, FaYoutube } from 'react-icons/fa';
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from 'react-icons/hi2';
import { Heading } from '../styled/typography';


const emailProviders = ["gmail.com", "outlook.com", "yahoo.com", "zoho.com", "protonmail.com", "aol.com", "yandex.com", "icloud.com", "fastmail.com", "gmx.com"];

const checkEmailValid = (email: string) => {
    const emailParts0 = ".com";
    const emailParts1 = email.split(emailParts0);
    const emailParts2 = emailParts1[0].split("@").slice(-1);
    const emailDomain = emailParts2 + emailParts0;

    return emailProviders.includes(emailDomain);
};


const Form = ({ type }: { type: "signup" | "login" | "contact" | "forgotPassword" | "loginVerification"; }) => {
    const navigator = useRouter();

    const [formType, setFormType] = useState<"signup" |
        "login" | "contact" | "forgotPassword" | "loginVerification">(type);

    const [signUpEmailError, setSignUpEmailError] = useState<string | undefined>(undefined);
    const [showPassword, setShowPassword] = useState<{ password: boolean, confirmPassword: boolean; }>({
        password: false,
        confirmPassword: false
    });

    const {
        register: signUpRegister,
        reset: signUpReset,
        handleSubmit: signUpHandleSubmit,
        formState: { errors: signUpErrors, isSubmitting: isSignupSubmitting }
    } = useForm<TSignUpFormSchema>({ resolver: zodResolver(signUpFormSchema) });

    const {
        register: loginRegister,
        reset: loginReset,
        handleSubmit: loginHandleSubmit,
        formState: { errors: loginErrors, isSubmitting: isLoginSubmitting }
    } = useForm<TLoginFormSchema>({ resolver: zodResolver(loginFormSchema) });

    const {
        register: loginVerificationRegister,
        reset: loginVerificationReset,
        handleSubmit: loginVerificationHandleSubmit,
        formState: { errors: loginVerificationErrors }
    } = useForm<TLoginVerificationFormSchema>({ resolver: zodResolver(loginVerificationFormSchema) });

    const {
        register: forgotPassword,
        reset: forgotPasswordReset,
        handleSubmit: forgotPasswordHandleSubmit,
        formState: { errors: forgotPasswordErrors, isSubmitting: isForgotPasswordSubmitting }
    } = useForm<TForgotPasswordFormSchema>({ resolver: zodResolver(forgotPasswordFormSchema) });

    const {
        register: contactRegister,
        reset: contactReset,
        handleSubmit: contactHandleSubmit,
        formState: { errors: contactErrors, isSubmitting: isContactSubmitting }
    } = useForm<TContactMeFormSchema>({ resolver: zodResolver(contactMeFormSchema) });

    const changeFormType = ({ type }: { type: "signup" | "login" | "contact" | "forgotPassword" | "loginVerification"; }) => {
        setFormType(type);
    };

    const onSignUpSubmit: SubmitHandler<TSignUpFormSchema> = async (data) => {
        const sanitizedData = {
            username: sanitize(data.username),
            email: sanitize(data.email),
            password: sanitize(data.password)
        };

        if (!checkEmailValid(sanitizedData.email)) {
            setSignUpEmailError(`Supported email providers are ${emailProviders.join(', ')}`);
            return;
        }
        const hashPassword = await bcrypt.hash(sanitizedData.password, process.env.NEXT_PUBLIC_HASH_SALT!);
        const userData = { ...sanitizedData, password: hashPassword, signForNewsLetter: data.signForNewsLetter };
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_CALLBACK_URL}/api/users/signup`, { ...userData });
            const data = response.data;
            // signUpReset();
            console.log(data);
            toastMessage("success", data?.message, "sign-up-success");
            // setFormType("login");
        } catch (error: any) {
            console.log(error);
            toastMessage("error", error?.response?.data?.message, "sign-up-failed");
        }
    };

    const onLoginUpSubmit: SubmitHandler<TLoginFormSchema> = async (data) => {
        const sanitizedData = { email: sanitize(data.email), password: sanitize(data.password || "") };
        const hashPassword = await bcrypt.hash(sanitizedData.password, process.env.NEXT_PUBLIC_HASH_SALT!);
        const userData = { ...sanitizedData, password: hashPassword };
        try {
            const { data: user } = await axios.post("/api/users/login", { ...userData });
            loginReset();
            console.log(user?.user?.username);
            if (!userData.password) {
                toastMessage("success", "Login code sent to your email", "login-success");
            } else {
                toastMessage("success", `Welcome back ${user?.user?.username}`, "login-success");
            }
            navigator.push('/');
        } catch (error: any) {
            loginReset();
            toastMessage("error", error?.response?.data?.message || "Some error happened", "login-failed");
        }
    };

    const onLoginVerificationUpSubmit: SubmitHandler<TLoginVerificationFormSchema> = async (data) => {
        const sanitizedData = { verificationCode: sanitize(data.verificationCode) };
        const userData = { ...sanitizedData };
        try {
            await axios.post("/api/users/verify", { ...userData });
            loginVerificationReset();
            toastMessage("success", "Login code sent to your email", "login-success");
            navigator.push('/books');
        } catch (error: any) {
            loginVerificationReset();
            toastMessage("error", error?.response?.data?.message || "Some error happened", "login-failed");
        }
    };

    const onContactMeSubmit: SubmitHandler<TContactMeFormSchema> = async (data) => {
        const sanitizedData = {
            name: sanitize(data.name),
            email: sanitize(data.email),
            subject: sanitize(data.subject),
            message: sanitize(data.message)
        };
        if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.subject || !sanitizedData.message) {
            toastMessage('error', "Please fill all the fields in the form", "contact-failed");
            return;
        }
        try {
            const response = await axios.post("/api/users/contact", { ...sanitizedData });
            const message = response.data.message;
            // contactReset();
            toastMessage("success", message, "contact-success");
        } catch (error: any) {
            contactReset();
            toastMessage("error", error?.response?.data?.message || "Some error happened", "contact-failed");
        }
    };

    let formContent = <></>;

    if (formType === "signup") {
        formContent = <section
            className='flex flex-col items-center justify-center w-full h-full'>
            <form onSubmit={signUpHandleSubmit(onSignUpSubmit)} className="form">
                <h1 className="title w-full text-left">Sign Up</h1>
                <section className='flex flex-col md:flex-row md:gap-12'>
                    <section className='flex-1 flex flex-col gap-4'>
                        <div className="form-group">
                            <div className="form-group relative">
                                <label htmlFor="username" className='label'>Username <span>*</span>
                                    <span className='text-base text-red-700'>{signUpErrors?.username?.message}</span>
                                </label>
                                <input type="text" className='py-4 text-formText text-dark placeholder:text-dark/50'
                                    id="username" placeholder='ibcoder001'
                                    required {...signUpRegister('username')} />
                                <span className="absolute top-16 bottom-8 right-0 flex items-center pr-4">
                                    <HiOutlineUser className='w-6 h-6' />
                                </span>
                            </div>
                            <div className="form-group relative">
                                <label htmlFor="email" className='label'>Email <span>*</span>
                                    <span className='text-base text-red-700'>{signUpErrors?.email?.message}</span>
                                </label>
                                <input type="email" className='py-4 text-formText text-dark placeholder:text-dark/50'
                                    id="email" placeholder='example@ibcoder.com'
                                    required {...signUpRegister('email')} />
                                <span className='text-base text-red-700'>{signUpEmailError}</span>
                                <span className="absolute top-16 bottom-8 right-0 flex items-center pr-4">
                                    <HiAtSymbol className='w-6 h-6' />
                                </span>
                            </div>
                            <div className="form-group relative">
                                <label htmlFor="password" className='label'>Password <span>*</span>
                                    <span className='text-base text-red-700'>{signUpErrors?.password?.message}</span>
                                </label>
                                <input type={showPassword.password ? "text" : "password"}
                                    className='py-4 text-formText text-dark placeholder:text-dark/50' id="password"
                                    placeholder='********' required {...signUpRegister('password')} />
                                <span className="absolute top-16 bottom-8 right-0 flex items-center pr-4 cursor-pointer"
                                    onClick={() => setShowPassword({
                                        ...showPassword,
                                        password: !showPassword.password
                                    })}>
                                    <HiFingerPrint className='w-6 h-6' />
                                </span>
                            </div>
                            <div className="form-group relative">
                                <label htmlFor="confirm-password" className='label'>Confirm Password <span>*</span>
                                    <span className='text-base text-red-700'>{signUpErrors?.password?.message}</span>
                                </label>
                                <input type={showPassword.confirmPassword ? "text" : "password"}
                                    className='py-4 text-formText text-dark placeholder:text-dark/50'
                                    id="confirm-password" placeholder='********'
                                    required {...signUpRegister('confirmPassword')} />
                                <span className="absolute top-16 bottom-8 right-0 flex items-center pr-4 cursor-pointer"
                                    onClick={() => setShowPassword({
                                        ...showPassword,
                                        confirmPassword: !showPassword.confirmPassword
                                    })}>
                                    <HiFingerPrint className='w-6 h-6' />
                                </span>
                            </div>
                            <div className="form-group">
                                <label className='label items-center cursor-pointer font-normal text-base my-4'>
                                    <input type="checkbox" className="w-6 h-6 cursor-pointer text-dark focus:text-dark"
                                        checked={true}
                                        id="signForNewsLetter" {...signUpRegister('signForNewsLetter')} /> <span>Sign me up for weekly product updates for 6 weeks</span>
                                </label>
                            </div>
                            <div className="form-group items-start gap-4">
                                {isSignupSubmitting ? <div className="form-group-button w-full">
                                    <button type='button'
                                        className='btn-medium bg-dark/80 text-light flex items-center max-w-full w-full text-center'>
                                        <svg className="mr-3 h-5 w-5 animate-spin text-white"
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className='w-full'>Please wait...</span>
                                    </button>
                                </div> : <div className="form-group-button w-full">
                                    <button type='submit'
                                        className='btn-medium bg-dark text-light flex items-center max-w-full w-full text-center'>
                                        <span className='w-full'>Sign Up</span>
                                    </button>
                                </div>}
                                <div className="flex flex-col items-end justify-end gap-4">
                                    <span className='cursor-pointer text-formText'
                                        onClick={() => changeFormType({ type: "login" })}>Already a member? <span
                                            className="font-semibold">Login</span></span>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='flex-1 flex flex-col gap-4 mt-8'>
                        <div className="grid grid-cols-1 gap-2 place-content-center place-items-center">
                            <button type="button"
                                className='cursor-pointer shadow-xl rounded-sm hover:shadow-2xl p-1 bg-white h-16 w-full flex flex-row items-center justify-start'
                                onClick={() => signIn('google', { callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL })}>
                                <Image src="/assets/google/btn_google_light_normal_ios.svg" width={64} height={64}
                                    alt="Sign up with Google" className='object-contain ml-2' />
                                <span className='ml-6 text-lg font-bold'>Sign up with Google</span>
                            </button>
                            <button type="button"
                                className='cursor-pointer shadow-xl rounded-sm hover:shadow-2xl p-1 bg-white h-16 w-full flex flex-row items-center justify-start'
                                onClick={() => signIn('twitter', { callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL })}>
                                <Image src="/assets/twitter/blue-logo.svg" width={64} height={64}
                                    alt="Sign up with Twitter" className='object-contain ml-2' />
                                <span className='ml-6 text-lg font-bold'>Sign up with Twitter</span>
                            </button>
                            <button type="button"
                                className='cursor-pointer shadow-xl rounded-sm hover:shadow-2xl p-1 bg-white h-16 w-full flex flex-row items-center justify-start'
                                onClick={() => signIn('github')}>
                                <Image src="/assets/github/github-mark.svg" width={64} height={64}
                                    alt="Sign up with GitHub" className='object-contain ml-2' />
                                <span className='ml-6 text-lg font-bold'>Sign up with GitHub</span>
                            </button>
                            <button type="button"
                                className='cursor-pointer shadow-xl rounded-sm hover:shadow-2xl p-1 bg-white h-16 w-full flex flex-row items-center justify-start'
                                onClick={() => signIn('metamask')}>
                                <Image src="/assets/metamask/metamask-fox.svg" width={64} height={64}
                                    alt="Sign up with MetaMask" className='object-contain ml-2' />
                                <span className='ml-6 text-lg font-bold'>Sign up with MetaMask</span>
                            </button>
                        </div>
                    </section>
                </section>
            </form>
        </section>;
    }

    if (formType === "login") {
        formContent = <section
            className='flex flex-col items-center justify-center w-full h-full'>
            <form onSubmit={loginHandleSubmit(onLoginUpSubmit)} className="form">
                <h1 className="title w-full text-left">Sign In</h1>
                <section className='flex flex-col md:flex-row md:gap-12'>
                    <section className='flex-1 flex flex-col gap-4'>
                        <div className="form-group">
                            <div className="form-group relative">
                                <label htmlFor="email" className='label'>Email <span>*</span>
                                    <span
                                        className='text-base text-red-700'>{loginErrors?.email?.message}</span></label>
                                <input type="email" className='py-4 text-formText text-dark placeholder:text-dark/50'
                                    id="email" placeholder='example@ibcoder.com'
                                    required {...loginRegister('email')} />
                                <span className="absolute top-16 bottom-8 right-0 flex items-center pr-4">
                                    <HiOutlineUser className='w-6 h-6' />
                                </span>
                            </div>
                            <div className="form-group relative">
                                <label htmlFor="password" className='label'>Password <span>*</span>
                                    <span
                                        className='text-base text-red-700'>{loginErrors?.password?.message}</span></label>
                                <input type="password" className='py-4 text-formText text-dark placeholder:text-dark/50'
                                    id="password" placeholder='********' required {...loginRegister('password')} />
                                <span className="absolute top-16 bottom-8 right-0 flex items-center pr-4 cursor-pointer"
                                    onClick={() => setShowPassword({
                                        ...showPassword,
                                        password: !showPassword.password
                                    })}>
                                    <HiFingerPrint className='w-6 h-6' />
                                </span>
                            </div>
                            <div className="form-group items-start gap-4">
                                {isLoginSubmitting ? <div className="form-group-button w-full">
                                    <button type='button'
                                        className='btn-medium bg-dark/80 text-light flex items-center max-w-full w-full text-center'>
                                        <svg className="mr-3 h-5 w-5 animate-spin text-white"
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className='w-full'>Please wait...</span>
                                    </button>
                                </div> : <div className="form-group-button w-full">
                                    <button type='submit'
                                        className='btn-medium bg-dark text-light flex items-center max-w-full w-full text-center'>
                                        <span className='w-full'>Login</span>
                                    </button>
                                </div>}
                                <div className="flex flex-col items-end justify-end gap-4">
                                    <span className='cursor-pointer text-formText'
                                        onClick={() => changeFormType({ type: "signup" })}>New to the site? <span
                                            className="font-semibold">Sign Up</span></span>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='flex-1 flex flex-col gap-4 mt-8'>
                        <div className="grid grid-cols-1 gap-2 place-content-center place-items-center">
                            <button type="button"
                                className='cursor-pointer shadow-xl rounded-sm hover:shadow-2xl p-1 bg-white h-16 w-full flex flex-row items-center justify-start'
                                onClick={() => signIn('google', { callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL })}>
                                <Image src="/assets/google/btn_google_light_normal_ios.svg" width={64} height={64}
                                    alt="Sign in with Google" className='object-contain ml-2' />
                                <span className='ml-6 text-lg font-bold'>Sign in with Google</span>
                            </button>
                            <button type="button"
                                className='cursor-pointer shadow-xl rounded-sm hover:shadow-2xl p-1 bg-white h-16 w-full flex flex-row items-center justify-start'
                                onClick={() => signIn('twitter', { callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL })}>
                                <Image src="/assets/twitter/blue-logo.svg" width={64} height={64}
                                    alt="Sign in with Twitter" className='object-contain ml-2' />
                                <span className='ml-6 text-lg font-bold'>Sign in with Twitter</span>
                            </button>
                            <button type="button"
                                className='cursor-pointer shadow-xl rounded-sm hover:shadow-2xl p-1 bg-white h-16 w-full flex flex-row items-center justify-start'>
                                <Image src="/assets/github/github-mark.svg" width={64} height={64}
                                    alt="Sign in with GitHub" className='object-contain ml-2' />
                                <span className='ml-6 text-lg font-bold'>Sign in with GitHub</span>
                            </button>
                            <button type="button"
                                className='cursor-pointer shadow-xl rounded-sm hover:shadow-2xl p-1 bg-white h-16 w-full flex flex-row items-center justify-start'>
                                <Image src="/assets/metamask/metamask-fox.svg" width={64} height={64}
                                    alt="Sign in with MetaMask" className='object-contain ml-2' />
                                <span className='ml-6 text-lg font-bold'>Sign in with MetaMask</span>
                            </button>
                        </div>
                    </section>
                </section>
            </form>
        </section>;
    }

    if (type === "loginVerification") {
        formContent = <section className='py-8 xl:flex-1 xl:pl-16 xl:pr-0 xl:block'>
            <Heading>Enter the code</Heading>
            <form onSubmit={loginVerificationHandleSubmit(onLoginVerificationUpSubmit)} className="form mt-8">
                <div className="form-group">
                    <label htmlFor="verificationCode" className='flex items-end gap-2 text-formText'>Verification Code
                        <span
                            className='text-base text-red-700'>{loginVerificationErrors?.verificationCode?.message}</span></label>
                    <input type="text" className='py-4 text-formText text-dark placeholder:text-dark/50'
                        id="verificationCode" placeholder='example@ibcoder.com'
                        required {...loginVerificationRegister('verificationCode')} />
                </div>
            </form>
        </section>;
    }

    // if (formType === "newsletter") {
    //     formContent = <section className='flex flex-col items-center justify-center w-full px-4 h-full py-12 max-w-3xl lg:max-w-5xl mx-auto gap-8'>
    //         <p className='font-body text-2xl text-center'>Thank you! You will receive product update every week for next 6 weeks!</p>
    //         <button type='button' className='btn-medium bg-dark text-light flex items-center text-center'>
    //             <Link href="/auth/login" className='w-full'>Login</Link>
    //         </button>
    //     </section>;
    // }

    if (formType === "contact") {
        formContent = <section
            className='flex flex-col items-center justify-center w-full h-full'>
            <form onSubmit={contactHandleSubmit(onContactMeSubmit)} className="form">
                <h1 className="title w-full text-left">Contact Information</h1>
                <p className='title w-full text-left font-body text-xl'>Please fill the form. I would love to get in touch with you.</p>
                <section className='flex flex-col md:flex-row md:gap-12'>
                    <section className='flex-1 flex flex-col gap-4 bg-dark text-light p-6 justify-center items-start'>
                        <h2 className="title w-full text-left font-body text-3xl text-highlight">
                            Love to hear from you. Get in touch 👋
                        </h2>
                        <div className="flex flex-col items-start justify-center gap-2 mt-8">
                            <div className='flex flex-col items-start justify-start gap-4'>
                                <a href="mailto:vasudeveloper001@gmail.com" className="text-lg hover:underline flex items-center justify-start gap-2">
                                    <span><FaMailBulk width={24} height={24} /></span>
                                    <span>vasudeveloper001</span>
                                </a>
                                <a href="https://twitter.com/saudev001" className="text-lg hover:underline flex items-center justify-start gap-2">
                                    <span>
                                        <FaTwitter width={24} height={24} />
                                    </span>
                                    <span>@saudev001</span>
                                </a>
                                <a href="https://instagram.com/saudev001" className="text-lg hover:underline flex items-center justify-start gap-2">
                                    <span>
                                        <FaInstagram width={24} height={24} />
                                    </span>
                                    <span>@saudev001</span>
                                </a>
                                <a href="https://youtube.com/@ibcoder" className="text-lg hover:underline flex items-center justify-start gap-2">
                                    <span>
                                        <FaYoutube width={24} height={24} />
                                    </span>
                                    <span>@ibcoder</span>
                                </a>
                                <a href="https://www.linkedin.com/in/saudev001" className="text-lg hover:underline flex items-center justify-start gap-2">
                                    <span>
                                        <FaLinkedinIn width={24} height={24} />
                                    </span>
                                    <span>@saudev001</span>
                                </a>
                            </div>
                        </div>
                    </section>
                    <section className='flex-1 flex flex-col gap-4 mt-6 md:mt-0'>
                        <div className="form-group">
                            <label htmlFor="name" className='label'>Name <span>*</span>
                                <span className='text-base text-red-700'>{contactErrors?.name?.message}</span></label>
                            <input type="text" className='py-4 text-lg font-bold text-dark placeholder:text-dark/50' id="name"
                                placeholder='Vasudev Krishna' required {...contactRegister('name')} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className='label'>Email <span>*</span>
                                <span className='text-base text-red-700'>{contactErrors?.email?.message}</span></label>
                            <input type="email" className='py-4 text-lg font-bold text-dark placeholder:text-dark/50' id="email"
                                placeholder='example@gmail.com' required {...contactRegister('email')} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject" className='label'>Subject <span>*</span>
                                <span className='text-base text-red-700'>{contactErrors?.subject?.message}</span></label>
                            <input type="text" className='py-4 text-lg font-bold text-dark placeholder:text-dark/50' id="subject"
                                placeholder='Want to become an author' required {...contactRegister('subject')} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message" className='label'>Message <span>*</span>
                                <span className='text-base text-red-700'>{contactErrors?.message?.message}</span></label>
                            <textarea className='py-4 text-lg font-bold h-32 text-dark placeholder:text-dark/50' id="message"
                                placeholder='Enter your message here...' required {...contactRegister('message')} />
                        </div>
                        {isContactSubmitting ? <div className="form-group-button">
                            <button type='button' className='btn-medium bg-dark/80 text-light flex items-center'>
                                <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Sending...</span>
                            </button>
                        </div> : <div className="form-group-button">
                            <button type='submit' className='btn-medium bg-dark text-light flex items-center'>
                                <span>Send Message</span>
                            </button>
                        </div>}
                    </section>
                </section>
            </form>
        </section>;
    }

    return formContent;
};

export default Form;