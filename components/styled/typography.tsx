import React from 'react';
import Link from 'next/link';

export const Title = ({ props, className, children }: { props?: any, className?: string, children?: React.ReactNode; }) => {
    return <h1 className={`font-heading text-title font-semibold ${className}`} {...props}>{children}</h1>;
};

export const Subtitle = ({ props, className, children }: { props?: any, className?: string, children?: React.ReactNode; }) => {
    return <h3 className={`font-body text-subtitle ${className}`} {...props}>{children}</h3>;
};

export const Heading = ({ props, className, children }: { props?: any, className?: string, children?: React.ReactNode; }) => {
    return <h2 className={`font-heading text-heading font-semibold ${className}`} {...props}>{children}</h2>;
};

export const SubHeading = ({ props, className, children }: { props?: any, className?: string, children?: React.ReactNode; }) => {
    return <h4 className={`font-heading text-subheading ${className}`} {...props}>{children}</h4>;
};

export const Logo = ({ props, className, children }: { props?: any, className?: string, children?: React.ReactNode; }) => {
    return <Link href="/" className={`font-logo text-logo font-semibold ${className}`} {...props}>{children}</Link>;
};

export const Paragraph = ({ props, className, children }: { props?: any, className?: string, children?: React.ReactNode; }) => {
    return <p className={`font-body text-paragraph ${className}`} {...props}>{children}</p>;
};

export const Code = ({ props, className, children }: { props?: any, className?: string, children?: React.ReactNode; }) => {
    return <span className={`font-code text-code ${className}`} {...props}>{children}</span>;
};

export const Menu = ({ props, url, className, children }: { props?: any, url: string, className?: string, children?: React.ReactNode; }) => {
    return <Link href={url} className={`font-body text-menu ${className}`} {...props}>{children}</Link>;
};

export const MobileMenu = ({ props, url, className, children }: { props?: any, url: string, className?: string, children?: React.ReactNode; }) => {
    return <Link href={url} className={`font-body text-mobile-menu ${className}`} {...props}>{children}</Link>;
};