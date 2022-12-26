'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { sanitize } from 'dompurify';
import { MediumButton, SmallButton } from '../styled/button';
import { Heading, SubHeading } from '../styled/typography';
import { useState } from 'react';
import axios from 'axios';

const signUpFormSchema = z.object({
    username: z.string().trim().min(6, "Username must be at least 6 characters long"),
    email: z.string().trim().email("Please enter valid email!"),
    password: z.string().min(8, "Password must be at least 8 characters long!").max(255, 'Password cannot be longer than 255 characters'),
    signForNewsLetter: z.boolean().default(false)
});

const loginFormSchema = z.object({
    email: z.string().trim().email("Please enter valid email!"),
    password: z.string().min(8, "Password must be at least 8 characters long!").max(255, 'Password cannot be longer than 255 characters')
});

const forgotFormSchema = z.object({
    email: z.string().trim().email("Please enter valid email!")
});

type TSignUpFormSchema = z.infer<typeof signUpFormSchema>;
type TLoginFormSchema = z.infer<typeof loginFormSchema>;
type TForgotFormSchema = z.infer<typeof forgotFormSchema>;

const Form = ({ type }: { type: "signup" | "login" | "contact" | "forgot" | "social"; }) => {
    const [formType, setFormType] = useState<"signup" |
        "login" | "contact" | "forgot" | "social" | "newsletter">(type);
    const { register, reset, handleSubmit, formState: { errors } } = useForm<TSignUpFormSchema>({ resolver: zodResolver(signUpFormSchema) });

    const changeFormType = (type: "signup" | "login" | "contact" | "forgot" | "social" | "newsletter") => {
        setFormType(type);
    };

    const onSignUpSubmit: SubmitHandler<TSignUpFormSchema> = async (data) => {
        const sanitizedData = {
            username: sanitize(data.username),
            email: sanitize(data.email),
            password: sanitize(data.password)
        };
        const userData = { ...sanitizedData, signForNewsLetter: data.signForNewsLetter };
        try {
            const response = await axios.post("/api/users", {
                ...userData
            });
            setFormType('newsletter');
        } catch (error: any) {
            console.log(error);
            alert(error?.message || "Some error happened");
        }
    };

    const onLoginUpSubmit: SubmitHandler<TLoginFormSchema> = (data) => {
        const sanitizedData = {
            email: sanitize(data.email),
            password: sanitize(data.password)
        };
        console.log({ ...sanitizedData });
    };

    const onForgotSubmit: SubmitHandler<TForgotFormSchema> = (data) => {
        const sanitizedData = {
            email: sanitize(data.email),
        };
        console.log({ ...sanitizedData });
    };

    let formContent = <></>;

    if (formType === "signup") {
        formContent = <section className='py-8 xl:flex-1 xl:pl-16 xl:pr-0 xl:block'>
            <Heading>Sign Up</Heading>
            <form onSubmit={handleSubmit(onSignUpSubmit)} className="flex flex-col w-full h-full gap-6 py-3 mt-8">
                <div className="flex flex-col gap-2">
                    <label htmlFor="username" className='flex items-end gap-2 text-formText'><span>Username</span>
                        <span className='text-base text-red-700'>{errors?.username?.message}</span></label>
                    <input type="text" className='py-4 text-formText text-dark placeholder:text-dark/50' id="username" placeholder='ibcoder001' {...register('username')} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className='flex items-end gap-2 text-formText'>Email
                        <span className='text-base text-red-700'>{errors?.email?.message}</span></label>
                    <input type="email" className='py-4 text-formText text-dark placeholder:text-dark/50' id="email" placeholder='example@ibcoder.com' {...register('email')} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className='flex items-end gap-2 text-formText'>Password
                        <span className='text-base text-red-700'>{errors?.password?.message}</span></label>
                    <input type="password" className='py-4 text-formText text-dark placeholder:text-dark/50' id="password" placeholder='********' {...register('password')} />
                </div>
                <div className="flex flex-col gap-2 my-2">
                    <label className='flex items-center justify-start gap-2 cursor-pointer text-formText text-dark'>
                        <input type="checkbox" className="w-6 h-6 cursor-pointer text-dark focus:text-dark" checked={true} id="signForNewsLetter" {...register('signForNewsLetter')} /> <span>Sign me up for 6 week, weekly product updates</span>
                    </label>
                </div>
                <div className="flex flex-col items-start justify-between gap-8 xl:mt-4 xl:gap-0 xl:flex-row form-group">
                    <MediumButton type='submit' className='order-2 bg-dark text-light xl:order-1'>Sign Up</MediumButton>
                    {/* <div className="flex flex-col items-start justify-end order-1 gap-4 xl:items-end xl:order-2">
                        <span className='cursor-pointer text-formText' onClick={() => changeFormType("login")}>Already a member? <span className="font-semibold">Login</span></span>
                        <span className='font-semibold cursor-pointer text-formText' onClick={() => changeFormType("social")}>Sign up using Social Logins</span>
                    </div> */}
                </div>
            </form>
        </section>;
    }

    if (formType === "login") {
        formContent = <section className='py-8 xl:flex-1 xl:pl-16 xl:pr-0 xl:block'>
            <Heading>Login</Heading>
            <form onSubmit={handleSubmit(onLoginUpSubmit)} className="flex flex-col w-full h-full gap-6 pt-3 mt-8">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className='flex items-end gap-2 text-formText'>Email
                        <span className='text-base text-red-700'>{errors?.email?.message}</span></label>
                    <input type="email" className='py-4 text-formText text-dark placeholder:text-dark/50' id="email" placeholder='example@ibcoder.com' required {...register('email')} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className='flex items-end gap-2 text-formText'>Password
                        <span className='text-base text-red-700'>{errors?.password?.message}</span></label>
                    <input type="password" className='py-4 text-formText text-dark placeholder:text-dark/50' id="password" placeholder='********' required {...register('password')} />
                </div>
                <div className="flex items-end justify-between mt-4 form-group">
                    <MediumButton type='submit' className='bg-dark text-light'>Login</MediumButton>
                    <div className="flex flex-col items-end justify-end gap-4">
                        <span className='cursor-pointer text-formText' onClick={() => changeFormType("signup")}>New to the site? <span className="font-semibold">Sign Up</span></span>
                        <span className='font-semibold cursor-pointer text-formText' onClick={() => changeFormType("forgot")}>Forgot Password?</span>
                        <span className='font-semibold cursor-pointer text-formText' onClick={() => changeFormType("social")}>Login using Social Logins</span>
                    </div>
                </div>
            </form>
        </section>;
    }

    if (formType === "forgot") {
        formContent = <section className='py-8 xl:flex-1 xl:pl-16 xl:pr-0 xl:block'>
            <Heading>Forgot Password</Heading>
            <form onSubmit={handleSubmit(onForgotSubmit)} className="flex flex-col w-full h-full gap-6 pt-3 mt-8">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className='flex items-end gap-2 text-formText'>Email
                        <span className='text-base text-red-700'>{errors?.email?.message}</span></label>
                    <input type="email" className='py-4 text-formText text-dark placeholder:text-dark/50' id="email" placeholder='example@ibcoder.com' required {...register('email')} />
                </div>
                <div className="flex items-end justify-between mt-4 form-group">
                    <MediumButton type='submit' className='bg-dark text-light'>Send Email</MediumButton>
                    <div className="flex flex-col items-end justify-end gap-4">
                        <span className='cursor-pointer text-formText' onClick={() => changeFormType("login")}>Remember your password? <span className="font-semibold">Login</span></span>
                    </div>
                </div>
            </form>
        </section>;
    }

    if (formType === "social") {
        formContent = <section className='py-8 xl:flex-1 xl:pl-16 xl:pr-0 xl:block'>
            <Heading>Social Logins</Heading>
            <SubHeading className='mt-4'>Coming soon...</SubHeading>
            <SmallButton onClick={() => setFormType('login')} className="p-4 mt-8 bg-dark text-light" style={{ width: "max-content" }}>Go back to Login</SmallButton>
        </section>;
    }

    if (formType === "newsletter") {
        formContent = <section className='py-8 xl:flex-1 xl:pl-16 xl:pr-0 xl:block'>
            <SubHeading>Thank you! You will recieve product update every week for next 6 weeks!</SubHeading>
        </section>;
    }

    return formContent;
};

export default Form;