interface LoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Loader: React.FC<LoaderProps> = ({ className = "", size = "md" }) => {
  const sizeMap = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={`${sizeMap[size]} rounded-full border-2 border-gray-900 border-b-transparent inline-block animate-spin ${className}`}
    ></div>
  );
};

export default Loader;
