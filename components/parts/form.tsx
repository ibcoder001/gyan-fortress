'use client';;
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { sanitize } from 'dompurify';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Heading } from '../styled/typography';
import Image from 'next/image';
import Link from 'next/link';
import bcrypt from 'bcryptjs';


const emailProviders = ["gmail.com", "outlook.com", "yahoo.com", "zoho.com", "protonmail.com", "aol.com", "yandex.com", "icloud.com", "fastmail.com", "gmx.com"];

const checkEmailValid = (email: string) => {
    const emailParts0 = ".com";
    const emailParts1 = email.split(emailParts0);
    const emailParts2 = emailParts1[0].split("@").slice(-1);
    const emailDomain = emailParts2 + emailParts0;

    if (emailProviders.includes(emailDomain)) return true;
    return false;
};

const signUpFormSchema = z.object({
    username: z.string().trim().min(6, "Username must be at least 6 characters long"),
    email: z.string().trim().email("Please enter valid email!"),
    password: z.string().trim().min(8).max(16),
    signForNewsLetter: z.boolean().default(true)
});

const loginFormSchema = z.object({
    email: z.string().trim().email("Please enter valid email!"),
    password: z.string().trim().min(8).max(16)
});

const loginVerificationFormSchema = z.object({
    verificationCode: z.string().trim().min(6, "Code is 6 letters long").max(6, "Code is 6 letters long")
});

const contactMeFormSchema = z.object({
    name: z.string().trim(),
    email: z.string().trim().email("Please enter valid email"),
    phone: z.string().trim().min(10, "Enter valid phone number").max(10, "Enter valid phone number"),
    message: z.string().trim()
});

type TSignUpFormSchema = z.infer<typeof signUpFormSchema>;
type TLoginFormSchema = z.infer<typeof loginFormSchema>;
type TLoginVerificationFormSchema = z.infer<typeof loginVerificationFormSchema>;
type TContactMeFormSchema = z.infer<typeof contactMeFormSchema>;

const Form = ({ type }: { type: "signup" | "login" | "contact" | "newsletter" | "loginVerification"; }) => {
    const navigator = useRouter();

    const [formType, setFormType] = useState<"signup" |
        "login" | "contact" | "newsletter" | "loginVerification">(type);

    const [signUpEmailError, setSignUpEmailError] = useState<string | undefined>(undefined);

    const { register: signUpRegister, reset: signUpReset, handleSubmit: signUpHandleSubmit, formState: { errors: signUpErrors, isSubmitting: isSignupSubmitting } } = useForm<TSignUpFormSchema>({ resolver: zodResolver(signUpFormSchema) });

    const { register: loginRegister, reset: loginReset, handleSubmit: loginHandleSubmit, formState: { errors: loginErrors, isSubmitting: isLoginSubmitting } } = useForm<TLoginFormSchema>({ resolver: zodResolver(loginFormSchema) });

    const { register: loginVerificationRegister, reset: loginVerificationReset, handleSubmit: loginVerificationHandleSubmit, formState: { errors: loginVerificationErrors } } = useForm<TLoginVerificationFormSchema>({ resolver: zodResolver(loginVerificationFormSchema) });

    const { register: contactRegister, reset: contactReset, handleSubmit: contactHandleSubmit, formState: { errors: contactErrors, isSubmitting: isContactSubmitting } } = useForm<TContactMeFormSchema>({ resolver: zodResolver(contactMeFormSchema) });

    const changeFormType = (type: "signup" | "login" | "contact" | "newsletter" | "loginVerification") => {
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
            await axios.post("/api/users/signup", { ...userData });
            signUpReset();
            toast.success("User created successfully!", {
                id: "sign-up-success",
                className: "border-none w-max-content h-auto py-4 px-4 text-xl",
                ariaProps: {
                    role: "alert",
                    'aria-live': "polite"
                }
            });
            setFormType("newsletter");
        } catch (error: any) {
            console.log(error);
            toast.error(error?.response?.data?.error?.message || "Some error happened", {
                className: "border-none w-max-content h-auto py-4 px-4 text-xl",
                ariaProps: {
                    role: "alert",
                    'aria-live': "polite"
                }
            });
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
                toast.success("Login code sent to your email", {
                    id: "login-success",
                    className: "border-none w-max-content h-auto py-4 px-4 text-xl",
                    ariaProps: {
                        role: "alert",
                        'aria-live': "polite"
                    }
                });
            } else {
                toast.success(`Welcome back ${user?.user?.username}`, {
                    id: "login-success",
                    className: "border-none w-max-content h-auto py-4 px-4 text-xl",
                    ariaProps: {
                        role: "alert",
                        'aria-live': "polite"
                    }
                });
            }
            navigator.push('/');
        } catch (error: any) {
            loginReset();
            toast.error(error?.response?.data?.error?.message || "Some error happened", {
                id: "login-error",
                className: "border-none w-max-content h-auto py-4 px-4 text-xl",
                ariaProps: {
                    role: "alert",
                    'aria-live': "polite"
                }
            });
        }
    };

    const onLoginVerificationUpSubmit: SubmitHandler<TLoginVerificationFormSchema> = async (data) => {
        const sanitizedData = { verificationCode: sanitize(data.verificationCode) };
        const userData = { ...sanitizedData };
        try {
            await axios.post("/api/users/verify", { ...userData });
            loginVerificationReset();
            toast.success("Login code sent to your email", {
                id: "login-success",
                className: "border-none w-max-content h-auto py-4 px-4 text-xl",
                ariaProps: {
                    role: "alert",
                    'aria-live': "polite"
                }
            });
            navigator.push('/books');
        } catch (error: any) {
            loginVerificationReset();
            toast.error(error?.response?.data?.error?.message || "Some error happened", {
                id: "login-error",
                className: "border-none w-max-content h-auto py-4 px-4 text-xl",
                ariaProps: {
                    role: "alert",
                    'aria-live': "polite"
                }
            });
        }
    };

    const onContactMeSubmit: SubmitHandler<TContactMeFormSchema> = async (data) => {
        const sanitizedData = { name: sanitize(data.name), email: sanitize(data.email), phone: sanitize(data.phone), message: sanitize(data.message) };
        const contactData = { ...sanitizedData };
        try {
            await axios.post("/api/users/contact", { ...contactData });
            contactReset();
            toast.success("Message received. I'll contact you in few days", {
                id: "contact-success",
                className: "border-none w-max-content h-auto py-4 px-4 text-xl",
                ariaProps: {
                    role: "alert",
                    'aria-live': "polite"
                }
            });
        } catch (error: any) {
            contactReset();
            toast.error(error?.response?.data?.error?.message || "Some error happened", {
                id: "login-error",
                className: "border-none w-max-content h-auto py-4 px-4 text-xl",
                ariaProps: {
                    role: "alert",
                    'aria-live': "polite"
                }
            });
        }
    };

    let formContent = <></>;

    if (formType === "signup") {
        formContent = <section className='flex flex-col items-center justify-center w-full px-4 h-full py-12 max-w-3xl lg:max-w-5xl mx-auto'>
            <form onSubmit={signUpHandleSubmit(onSignUpSubmit)} className="form">
                <h1 className="title w-full text-left mb-8">Sign Up</h1>
                <section className='flex flex-col lg:flex-row gap-12'>
                    <section className='flex-1 order-2 flex flex-col gap-4'>
                        <h2 className="text-2xl font-bold w-full text-left mb-4 lg:mb-8">Socials</h2>
                        <div className="form-group">
                            <div className="form-group-button w-full">
                                <button type='button' className='btn-medium py-[0.375rem] px-2 flex items-center max-w-full w-full bg-white text-dark border border-dark mt-0'>
                                    <Image src="/assets/google-sign-in/btn_google_light_normal_ios.svg" width={64} height={64} alt="Sign up with Google" />
                                    <span className='inline-flex ml-3 text-sm'>Sign up with Google</span>
                                </button>
                            </div>
                            <div className="form-group-button w-full">
                                <button type='button' className='btn-medium py-[0.375rem] px-2 flex items-center max-w-full w-full bg-white text-dark border border-dark'>
                                    <Image src="/assets/web-3/metamask/metamask-fox.svg" width={64} height={64} alt="Sign up with MetaMask" />
                                    <span className='inline-flex ml-3 text-sm'>Sign up with MetaMask</span>
                                </button>
                            </div>
                            <div className="form-group-button w-full">
                                <button type='button' className='btn-medium py-[0.375rem] px-2 flex items-center max-w-full w-full bg-white text-dark border border-dark'>
                                    <Image src="/assets/web-3/trust-wallet/TWT.svg" width={64} height={64} alt="Sign up with Trust Wallet" />
                                    <span className='inline-flex ml-3 text-sm'>Sign up with Trust Wallet</span>
                                </button>
                            </div>
                            <div className="form-group-button w-full">
                                <button type='button' className='btn-medium py-[0.375rem] px-2 flex items-center max-w-full w-full bg-white text-dark border border-dark'>
                                    <Image src="/assets/web-3/phantom-wallet/phantom-icon-purple.svg" width={64} height={64} alt="Sign up with Phantom Wallet" />
                                    <span className='inline-flex ml-3 text-sm'>Sign up with Phantom Wallet</span>
                                </button>
                            </div>
                        </div>
                    </section>
                    <section className='flex-1 flex flex-col gap-4'>
                        <h2 className="text-2xl font-bold w-full text-left mb-4 lg:mb-8">Credentials</h2>
                        <div className="form-group">
                            <div className="form-group">
                                <label htmlFor="username" className='label'>Username <span>*</span>
                                    <span className='text-base text-red-700'>{signUpErrors?.username?.message}</span></label>
                                <input type="text" className='py-4 text-formText text-dark placeholder:text-dark/50' id="username" placeholder='ibcoder001' required {...signUpRegister('username')} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className='label'>Email <span>*</span>
                                    <span className='text-base text-red-700'>{loginErrors?.email?.message}</span></label>
                                <input type="email" className='py-4 text-formText text-dark placeholder:text-dark/50' id="email" placeholder='example@ibcoder.com' required {...signUpRegister('email')} />
                                <span className='text-base text-red-700'>{signUpEmailError}</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className='label'>Password <span>*</span>
                                    <span className='text-base text-red-700'>{loginErrors?.password?.message}</span></label>
                                <input type="password" className='py-4 text-formText text-dark placeholder:text-dark/50' id="password" placeholder='********' required {...signUpRegister('password')} />
                            </div>
                            <div className="form-group">
                                <label className='label items-center cursor-pointer font-normal text-base my-4'>
                                    <input type="checkbox" className="w-6 h-6 cursor-pointer text-dark focus:text-dark" checked={true} id="signForNewsLetter" {...signUpRegister('signForNewsLetter')} /> <span>Sign me up for weekly product updates for 6 weeks</span>
                                </label>
                            </div>
                            <div className="form-group items-start gap-4">
                                {isSignupSubmitting ? <div className="form-group-button w-full">
                                    <button type='button' className='btn-medium bg-dark/80 text-light flex items-center max-w-full w-full text-center'>
                                        <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className='w-full'>Please wait...</span>
                                    </button>
                                </div> : <div className="form-group-button w-full">
                                    <button type='submit' className='btn-medium bg-dark text-light flex items-center max-w-full w-full text-center'>
                                        <span className='w-full'>Sign Up</span>
                                    </button>
                                </div>}
                                <div className="flex flex-col items-end justify-end gap-4">
                                    <span className='cursor-pointer text-formText' onClick={() => changeFormType("login")}>Already a member? <span className="font-semibold">Login</span></span>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </form>
        </section>;
    }

    if (formType === "login") {
        formContent = <section className='flex flex-col items-center justify-center w-full px-4 h-full py-12 max-w-3xl lg:max-w-5xl mx-auto'>
            <form onSubmit={loginHandleSubmit(onLoginUpSubmit)} className="form">
                <h1 className="title w-full text-left mb-8">Sign In</h1>
                <section className='flex flex-col lg:flex-row gap-12'>
                    <section className='flex-1 order-2 flex flex-col gap-4'>
                        <h2 className="text-2xl font-bold w-full text-left mb-4 lg:mb-8">Socials</h2>
                        <div className="form-group">
                            <div className="form-group-button w-full">
                                <button type='button' className='btn-medium py-[0.375rem] px-2 flex items-center max-w-full w-full bg-white text-dark border border-dark mt-0'>
                                    <Image src="/assets/google-sign-in/btn_google_light_normal_ios.svg" width={64} height={64} alt="Sign in with Google" />
                                    <span className='inline-flex ml-3 text-sm'>Sign in with Google</span>
                                </button>
                            </div>
                            <div className="form-group-button w-full">
                                <button type='button' className='btn-medium py-[0.375rem] px-2 flex items-center max-w-full w-full bg-white text-dark border border-dark'>
                                    <Image src="/assets/web-3/metamask/metamask-fox.svg" width={64} height={64} alt="Sign in with MetaMask" />
                                    <span className='inline-flex ml-3 text-sm'>Sign in with MetaMask</span>
                                </button>
                            </div>
                            <div className="form-group-button w-full">
                                <button type='button' className='btn-medium py-[0.375rem] px-2 flex items-center max-w-full w-full bg-white text-dark border border-dark'>
                                    <Image src="/assets/web-3/trust-wallet/TWT.svg" width={64} height={64} alt="Sign in with Trust Wallet" />
                                    <span className='inline-flex ml-3 text-sm'>Sign in with Trust Wallet</span>
                                </button>
                            </div>
                            <div className="form-group-button w-full">
                                <button type='button' className='btn-medium py-[0.375rem] px-2 flex items-center max-w-full w-full bg-white text-dark border border-dark'>
                                    <Image src="/assets/web-3/phantom-wallet/phantom-icon-purple.svg" width={64} height={64} alt="Sign in with Phantom Wallet" />
                                    <span className='inline-flex ml-3 text-sm'>Sign in with Phantom Wallet</span>
                                </button>
                            </div>
                        </div>
                    </section>
                    <section className='flex-1 flex flex-col gap-4'>
                        <h2 className="text-2xl font-bold w-full text-left mb-4 lg:mb-8">Credentials</h2>
                        <div className="form-group">
                            <div className="form-group">
                                <label htmlFor="email" className='label'>Email <span>*</span>
                                    <span className='text-base text-red-700'>{loginErrors?.email?.message}</span></label>
                                <input type="email" className='py-4 text-formText text-dark placeholder:text-dark/50' id="email" placeholder='example@ibcoder.com' required {...loginRegister('email')} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className='label'>Password <span>*</span>
                                    <span className='text-base text-red-700'>{loginErrors?.password?.message}</span></label>
                                <input type="password" className='py-4 text-formText text-dark placeholder:text-dark/50' id="password" placeholder='********' required {...loginRegister('password')} />
                            </div>
                            <div className="form-group items-start gap-4">
                                {isLoginSubmitting ? <div className="form-group-button w-full">
                                    <button type='button' className='btn-medium bg-dark/80 text-light flex items-center max-w-full w-full text-center'>
                                        <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className='w-full'>Please wait...</span>
                                    </button>
                                </div> : <div className="form-group-button w-full">
                                    <button type='submit' className='btn-medium bg-dark text-light flex items-center max-w-full w-full text-center'>
                                        <span className='w-full'>Login</span>
                                    </button>
                                </div>}
                                <div className="flex flex-col items-end justify-end gap-4">
                                    <span className='cursor-pointer text-formText' onClick={() => changeFormType("signup")}>New to the site? <span className="font-semibold">Sign Up</span></span>
                                </div>
                            </div>
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
                        <span className='text-base text-red-700'>{loginVerificationErrors?.verificationCode?.message}</span></label>
                    <input type="text" className='py-4 text-formText text-dark placeholder:text-dark/50' id="verificationCode" placeholder='example@ibcoder.com' required {...loginVerificationRegister('verificationCode')} />
                </div>
            </form>
        </section >;
    }

    if (formType === "newsletter") {
        formContent = <section className='flex flex-col items-center justify-center w-full px-4 h-full py-12 max-w-3xl lg:max-w-5xl mx-auto gap-8'>
            <p className='font-body text-2xl text-center'>Thank you! You will recieve product update every week for next 6 weeks!</p>
            <button type='button' className='btn-medium bg-dark text-light flex items-center text-center'>
                <Link href="/auth/login" className='w-full'>Login</Link>
            </button>
        </section>;
    }

    if (formType === "contact") {
        formContent = <section className='flex-1 w-full'>
            <form onSubmit={contactHandleSubmit(onContactMeSubmit)} className="form pt-0">
                <div className="form-group">
                    <label htmlFor="name" className='label'>Name <span>*</span>
                        <span className='text-base text-red-700'>{contactErrors?.name?.message}</span></label>
                    <input type="text" className='py-4 text-lg font-bold text-dark placeholder:text-dark/50' id="name" placeholder='Vasudev Krishna' required {...contactRegister('name')} />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className='label'>Email <span>*</span>
                        <span className='text-base text-red-700'>{contactErrors?.email?.message}</span></label>
                    <input type="email" className='py-4 text-lg font-bold text-dark placeholder:text-dark/50' id="email" placeholder='example@gmail.com' required {...contactRegister('email')} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone" className='label'>Phone <span>*</span>
                        <span className='text-base text-red-700'>{contactErrors?.phone?.message}</span></label>
                    <input type="text" className='py-4 text-lg font-bold text-dark placeholder:text-dark/50' id="phone" placeholder='8765757332' required {...contactRegister('phone')} />
                </div>
                <div className="form-group">
                    <label htmlFor="message" className='label'>Message <span>*</span>
                        <span className='text-base text-red-700'>{contactErrors?.message?.message}</span></label>
                    <textarea className='py-4 text-lg font-bold h-32 text-dark placeholder:text-dark/50' id="message" placeholder='Enter your message here...' required {...contactRegister('message')} />
                </div>
                {isContactSubmitting ? <div className="form-group-button">
                    <button type='button' className='btn-medium bg-dark/80 text-light flex items-center'>
                        <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                    </button>
                </div> : <div className="form-group-button">
                    <button type='submit' className='btn-medium bg-dark text-light flex items-center'>
                        <span>Send Message</span>
                    </button>
                </div>}
            </form>
        </section>;
    }

    return formContent;
};

export default Form;