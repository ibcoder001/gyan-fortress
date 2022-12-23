export const LargeButton = ({ props, className, children }: { props?: any, className?: string, children?: React.ReactNode; }) => {
    return <button className={`font-body text-btn-lg bg-gray-100 px-8 py-6 mr-4 hover:shadow-xl ${className}`} {...props}>{children}</button>;
};

export const MiddleButton = ({ props, className, children }: { props?: any, className?: string, children?: React.ReactNode; }) => {
    return <button className={`font-body text-btn-md bg-gray-100 px-6 py-4 mr-4 hover:shadow-lg ${className}`} {...props}>{children}</button>;
};

export const SmallButton = ({ props, className, children }: { props?: any, className?: string, children?: React.ReactNode; }) => {
    return <button className={`font-body text-btn-sm bg-gray-100 px-6 py-3 hover:shadow-lg rounded-sm ${className}`} {...props}>{children}</button>;
};