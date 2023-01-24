import React from "react";
import Link from "next/link";

// type TTextProps = Heading

export const Title = ({
  props,
  className,
  children,
}: {
  props?: any;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <h1 className={` text-title font-semibold ${className}`} {...props}>
      {children}
    </h1>
  );
};

export const Subtitle = ({
  props,
  className,
  children,
}: {
  props?: any;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <h3 className={` text-subtitle ${className}`} {...props}>
      {children}
    </h3>
  );
};

export const Heading = ({
  props,
  className,
  children,
}: {
  props?: any;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <h2 className={` text-heading font-semibold ${className}`} {...props}>
      {children}
    </h2>
  );
};

export const SubHeading = ({
  props,
  className,
  children,
}: {
  props?: any;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <h4 className={` text-subheading ${className}`} {...props}>
      {children}
    </h4>
  );
};

export const Logo = ({
  props,
  className,
  children,
}: {
  props?: any;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <Link
      href="/"
      className={`font-logo text-xl font-bold ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export const Paragraph = ({
  props,
  className,
  children,
}: {
  props?: any;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <p className={` text-paragraph ${className}`} {...props}>
      {children}
    </p>
  );
};

export const Code = ({
  props,
  className,
  children,
}: {
  props?: any;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <span className={`font-code text-code ${className}`} {...props}>
      {children}
    </span>
  );
};

export const Menu = ({
  props,
  url,
  className,
  children,
}: {
  props?: any;
  url: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <Link href={url} className={` text-menu ${className}`} {...props}>
      {children}
    </Link>
  );
};

export const MobileMenu = ({
  props,
  url,
  className,
  children,
}: {
  props?: any;
  url: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <Link href={url} className={` text-mobile-menu ${className}`} {...props}>
      {children}
    </Link>
  );
};
