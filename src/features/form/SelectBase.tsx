import React, { FocusEventHandler, ReactNode } from 'react';
import ReactSelect from 'react-select';

interface OptionType {
  value: string;
  label: string;
}

interface SelectBaseProps {
  id?: string;
  label?: string | ReactNode;
  className?: string;
  name?: string;
  value?: string;
  options: OptionType[];
  onChange: (neWValue: any) => void;
  onBlur: FocusEventHandler<HTMLInputElement>;
}

const SelectBase: React.FC<SelectBaseProps> = ({
  name = '',
  value = '',
  id = '',
  label = '',
  options,
  className = '',
  onChange,
  onBlur,
  ...props
}) => {
  const labelStyles = `text-body-sm font-bold block`;
  const containerStyles = 'flex flex-col gap-1.5';
  const hasLabel = label && id;

  return (
    <div className={`${containerStyles} ${className}`}>
      {hasLabel && (
        <label htmlFor={id} className={labelStyles}>
          {label}
        </label>
      )}
      <ReactSelect
        name={name}
        value={options ? options.find((option) => option.value === value) : ''}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
        id={id}
        options={options}
      />
    </div>
  );
};

export default SelectBase;
