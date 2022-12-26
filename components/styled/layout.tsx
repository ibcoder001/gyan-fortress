export const Container = ({ props, className, children }: { props?: any, className?: string, children?: React.ReactNode; }) => {
    return <section className={`max-w-[1312px] mx-auto px-4 ${className}`} {...props}>{children}</section>;
};