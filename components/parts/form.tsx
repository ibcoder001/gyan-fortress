'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { sanitize } from 'dompurify';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Heading, Paragraph } from '../styled/typography';
import { MediumButton } from '../styled/button';


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
    signUpVerified: z.boolean().default(false),
    signForNewsLetter: z.boolean().default(true)
});

const loginFormSchema = z.object({
    email: z.string().trim().email("Please enter valid email!")
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

    const { register: signUpRegister, reset: signUpReset, handleSubmit: signUpHandleSubmit, formState: { errors: signUpErrors } } = useForm<TSignUpFormSchema>({ resolver: zodResolver(signUpFormSchema) });

    const { register: loginRegister, reset: loginReset, handleSubmit: loginHandleSubmit, formState: { errors: loginErrors } } = useForm<TLoginFormSchema>({ resolver: zodResolver(loginFormSchema) });

    const { register: loginVerificationRegister, reset: loginVerificationReset, handleSubmit: loginVerificationHandleSubmit, formState: { errors: loginVerificationErrors } } = useForm<TLoginVerificationFormSchema>({ resolver: zodResolver(loginVerificationFormSchema) });

    const { register: contactRegister, reset: contactReset, handleSubmit: contactHandleSubmit, formState: { errors: contactErrors, isSubmitting: isContactSubmitting } } = useForm<TContactMeFormSchema>({ resolver: zodResolver(contactMeFormSchema) });

    const changeFormType = (type: "signup" | "login" | "contact" | "newsletter" | "loginVerification") => {
        setFormType(type);
    };

    const onSignUpSubmit: SubmitHandler<TSignUpFormSchema> = async (data) => {
        const sanitizedData = {
            username: sanitize(data.username),
            email: sanitize(data.email)
        };

        if (!checkEmailValid(sanitizedData.email)) {
            setSignUpEmailError(`Supported email providers are ${emailProviders.join(', ')}`);
            return;
        }

        const userData = { ...sanitizedData, signForNewsLetter: data.signForNewsLetter };
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
        const sanitizedData = { email: sanitize(data.email) };
        const userData = { ...sanitizedData };
        try {
            await axios.post("/api/users/login", { ...userData });
            loginReset();
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
        formContent = <section className='py-8 xl:flex-1 xl:pl-16 xl:pr-0 xl:block'>
            <Heading>Sign Up</Heading>
            <form onSubmit={signUpHandleSubmit(onSignUpSubmit)} className="flex flex-col w-full h-full gap-6 py-3 mt-8">
                <div className="flex flex-col gap-2">
                    <label htmlFor="username" className='flex items-end gap-2 text-formText'><span>Username</span>
                        <span className='text-base text-red-700'>{signUpErrors?.username?.message}</span></label>
                    <input type="text" className='py-4 text-formText text-dark placeholder:text-dark/50' id="username" placeholder='ibcoder001' {...signUpRegister('username')} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className='flex items-end gap-2 text-formText'>Email
                        <span className='text-base text-red-700'>{signUpErrors?.email?.message}</span></label>
                    <input type="email" className='py-4 text-formText text-dark placeholder:text-dark/50' id="email" placeholder='example@ibcoder.com' {...signUpRegister('email')} />
                    <span className='text-base text-red-700'>{signUpEmailError}</span>
                </div>
                <div className="flex flex-col gap-2 my-2">
                    <label className='flex items-center justify-start gap-2 cursor-pointer text-formText text-dark'>
                        <input type="checkbox" className="w-6 h-6 cursor-pointer text-dark focus:text-dark" checked={true} id="signForNewsLetter" {...signUpRegister('signForNewsLetter')} /> <span>Sign me up for weekly product updates for 6 weeks</span>
                    </label>
                </div>
                <div className="flex flex-col items-start justify-between gap-8 xl:mt-4 xl:gap-0 xl:flex-row form-group">
                    <MediumButton type='submit' className='order-2 bg-dark text-light xl:order-1'>Sign Up</MediumButton>
                    <div className="flex flex-col items-start justify-end order-1 gap-4 xl:items-end xl:order-2">
                        <span className='cursor-pointer text-formText' onClick={() => changeFormType("login")}>Already a member? <span className="font-semibold">Login</span></span>
                    </div>
                </div>
            </form>
        </section>;
    }

    if (formType === "login") {
        formContent = <section className='py-8 lg:flex-1 lg:pl-16 lg:pr-0 lg:block'>
            <Heading>Login</Heading>
            <form onSubmit={loginHandleSubmit(onLoginUpSubmit)} className="flex flex-col w-full h-full gap-6 pt-3 mt-8">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className='flex items-end gap-2 text-formText'>Email
                        <span className='text-base text-red-700'>{loginErrors?.email?.message}</span></label>
                    <input type="email" className='py-4 text-formText text-dark placeholder:text-dark/50' id="email" placeholder='example@ibcoder.com' required {...loginRegister('email')} />
                </div>
                <div className="flex items-end justify-between mt-4 form-group">
                    <MediumButton type='submit' className='bg-dark text-light'>Login</MediumButton>
                    <div className="flex flex-col items-end justify-end gap-4">
                        <span className='cursor-pointer text-formText' onClick={() => changeFormType("signup")}>New to the site? <span className="font-semibold">Sign Up</span></span>
                    </div>
                </div>
            </form>
        </section>;
    }

    if (type === "loginVerification") {
        formContent = <section className='py-8 xl:flex-1 xl:pl-16 xl:pr-0 xl:block'>
            <Heading>Enter the code</Heading>
            <form onSubmit={loginVerificationHandleSubmit(onLoginVerificationUpSubmit)} className="flex flex-col w-full h-full gap-6 pt-3 mt-8">
                <div className="flex flex-col gap-2">
                    <label htmlFor="verificationCode" className='flex items-end gap-2 text-formText'>Verification Code
                        <span className='text-base text-red-700'>{loginVerificationErrors?.verificationCode?.message}</span></label>
                    <input type="text" className='py-4 text-formText text-dark placeholder:text-dark/50' id="verificationCode" placeholder='example@ibcoder.com' required {...loginVerificationRegister('verificationCode')} />
                </div>
            </form>
        </section >;
    }

    if (formType === "newsletter") {
        formContent = <section className='py-8 xl:flex-1 xl:pl-16 xl:pr-0 xl:block'>
            <Paragraph className='text-3xl'>Thank you! You will recieve product update every week for next 6 weeks!</Paragraph>
            <MediumButton className='mt-4 bg-dark text-light' onClick={() => setFormType("login")}>Login here</MediumButton>
        </section>;
    }

    if (formType === "contact") {
        formContent = <section className='flex-1 w-full'>
            <form onSubmit={contactHandleSubmit(onContactMeSubmit)} className="flex flex-col w-full h-full gap-6 pt-3">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className='flex items-end gap-2 text-lg font-bold'>Name
                        <span className='text-base text-red-700'>{contactErrors?.name?.message}</span></label>
                    <input type="text" className='py-4 text-lg font-bold text-dark placeholder:text-dark/50' id="name" placeholder='Vasudev Krishna' required {...contactRegister('name')} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className='flex items-end gap-2 text-lg font-bold'>Email
                        <span className='text-base text-red-700'>{contactErrors?.email?.message}</span></label>
                    <input type="email" className='py-4 text-lg font-bold text-dark placeholder:text-dark/50' id="email" placeholder='example@gmail.com' required {...contactRegister('email')} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className='flex items-end gap-2 text-lg font-bold'>Phone
                        <span className='text-base text-red-700'>{contactErrors?.phone?.message}</span></label>
                    <input type="text" className='py-4 text-lg font-bold text-dark placeholder:text-dark/50' id="phone" placeholder='8765757332' required {...contactRegister('phone')} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="message" className='flex items-end gap-2 text-lg font-bold'>Message
                        <span className='text-base text-red-700'>{contactErrors?.message?.message}</span></label>
                    <textarea className='py-4 text-lg font-bold h-32 text-dark placeholder:text-dark/50' id="message" placeholder='Enter your message here...' required {...contactRegister('message')} />
                </div>
                {isContactSubmitting ? <div className="flex flex-col items-start justify-between gap-8 xl:mt-4 xl:gap-0 xl:flex-row form-group">
                    <button type='submit' className='btn-medium bg-dark/80 text-light flex items-center'>
                        <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                    </button>
                </div> : <div className="flex flex-col items-start justify-between gap-8 xl:mt-4 xl:gap-0 xl:flex-row form-group">
                    <button type='submit' className='btn-medium bg-dark text-light flex items-center'>
                        <span>Send Message</span>
                    </button>
                </div>}
            </form>
        </section>;
    }

    return formContent;
};

export default Form;;