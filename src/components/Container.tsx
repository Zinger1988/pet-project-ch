interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  const containerStyles = `px-4 md:px-6 xl:px-12 mx-auto ${className}`;

  return <div className={containerStyles}>{children}</div>;
};

export default Container;
