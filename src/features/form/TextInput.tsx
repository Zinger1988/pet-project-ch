import { InputHTMLAttributes, ReactNode } from 'react';

interface TextInputProps {
  label?: string | ReactNode;
  id?: string;
  className?: string;
  type?: string;
}

const TextInput: React.FC<TextInputProps & InputHTMLAttributes<HTMLInputElement>> = ({
  id,
  label,
  className = '',
  type = 'text',
  ...props
}) => {
  const containerStyles = 'flex flex-col gap-1.5';
  const labelStyles = `text-body-sm font-bold block`;
  const inputStyles = `bg-white dark:bg-gray-700 block w-full border-2 border-black dark:border-gray-500 rounded-xl py-2.5 px-4 focus:border-primary-400 dark:focus:border-primary-400 transition-colors outline-none placeholder:transition-opacity focus:placeholder:opacity-0`;
  const hasLabel = label && id;

  return (
    <div className={`${containerStyles} ${className}`}>
      {hasLabel && (
        <label htmlFor={id} className={labelStyles}>
          {label}
        </label>
      )}
      <input {...props} id={id} type={type} className={inputStyles} />
    </div>
  );
};

export default TextInput;
