export const Container = ({
  props,
  className,
  children,
}: {
  props?: any;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <section className={`max-w-[1312px] mx-auto ${className}`} {...props}>
      {children}
    </section>
  );
};
