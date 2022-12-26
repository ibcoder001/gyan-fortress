import type { ButtonHTMLAttributes } from 'react';

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const LargeButton = (props: TButtonProps) => {
    const { className, children } = props;
    return <button {...props} className={`font-body text-btn-lg w-[17rem] h-28 hover:shadow-lg rounded-sm ${className}`} >{children}</button>;
};

export const MediumButton = (props: TButtonProps) => {
    const { className, children } = props;
    return <button {...props} className={`font-body text-btn-md w-44 h-20  hover:shadow-lg rounded-sm ${className}`} >{children}</button>;
};

export const SmallButton = (props: TButtonProps) => {
    const { className, children } = props;
    return <button  {...props} className={`font-body text-btn-sm w-[7.5rem] h-14 hover:shadow-lg rounded-sm ${className} `}>{children}</button>;
};