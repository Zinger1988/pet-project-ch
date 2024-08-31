import { ReactNode, TextareaHTMLAttributes } from "react";

interface TextareaProps {
  label?: string | ReactNode;
  id?: string;
  className?: string;
}

const Textarea: React.FC<TextareaProps & TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  label,
  id,
  className = "",
  ...props
}) => {
  const textareaBaseStyles = `bg-transparent block w-full border-2 border-black dark:border-gray-600 rounded-xl py-2.5 px-4 focus:border-primary-400 dark:focus:border-primary-400  transition-colors outline-none min-h-[8rem] mb-3`;
  const textareaPlaceholderStyles =
    "placeholder:transition-opacity focus:placeholder:opacity-0";
  const textareaStyles = `${textareaBaseStyles} ${textareaPlaceholderStyles}`;
  const hasLabel = label && id;

  return (
    <div className={className}>
      {hasLabel && (
        <label htmlFor={id} className="text-body-sm font-bold mb-1.5 block">
          {label}
        </label>
      )}
      <textarea {...props} className={textareaStyles}></textarea>
    </div>
  );
};

export default Textarea;
