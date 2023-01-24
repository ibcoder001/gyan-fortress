import type { ButtonHTMLAttributes } from "react";

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const LargeButton = (props: TButtonProps) => {
  const { className, children } = props;
  let largeButtonContent = <></>;
  if (className !== "undefined") {
    largeButtonContent = (
      <button
        {...props}
        className={`max-w-fit  font-bold uppercase text-xl lg:text-xl lg:px-8 lg:py-8 md:text-2xl md:px-10 md:py-10 px-8 py-8 hover:shadow-lg rounded-sm ${className}`}
      >
        {children}
      </button>
    );
  } else {
    largeButtonContent = (
      <button
        {...props}
        className={`font-bold text-2xl  hover:shadow-lg rounded-sm`}
      >
        {children}
      </button>
    );
  }
  return largeButtonContent;
};

export const MediumButton = (props: TButtonProps) => {
  const { className, children } = props;
  let mediumButtonContent = <></>;
  if (className !== "undefined") {
    mediumButtonContent = (
      <button
        {...props}
        className={` text-btn-md w-44 h-20  hover:shadow-lg rounded-sm ${className}`}
      >
        {children}
      </button>
    );
  } else {
    mediumButtonContent = (
      <button
        {...props}
        className={` text-btn-md w-44 h-20  hover:shadow-lg rounded-sm`}
      >
        {children}
      </button>
    );
  }
  return mediumButtonContent;
};

export const SmallButton = (props: TButtonProps) => {
  const { className, children } = props;
  let smallButtonContent = <></>;
  if (className !== "undefined") {
    smallButtonContent = (
      <button
        {...props}
        className={` text-btn-sm w-[7.5rem] h-14 hover:shadow-lg rounded-sm ${className}`}
      >
        {children}
      </button>
    );
  } else {
    smallButtonContent = (
      <button
        {...props}
        className={` text-btn-sm w-[7.5rem] h-14 hover:shadow-lg rounded-sm`}
      >
        {children}
      </button>
    );
  }
  return smallButtonContent;
};
