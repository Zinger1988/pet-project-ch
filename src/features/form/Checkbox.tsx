import { InputHTMLAttributes, ReactNode } from 'react';

import Icon from '../../components/Icon';

import { IconId } from '../../types/enums';

interface CheckboxInputProps {
  label?: string | ReactNode;
  className?: string;
}

const Checkbox: React.FC<CheckboxInputProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'form'>> = ({
  label,
  className = '',
  ...props
}) => {
  const labelStyles = 'flex gap-4 items-center';
  const InputStyles = 'peer hidden';
  const fakeInputStyles =
    'bg-white dark:bg-gray-700 block w-5 h-5 border-[1px] border-gray-500 rounded-md peer-checked:bg-black dark:peer-checked:bg-gray-800 peer-checked:border-black dark:peer-checked:border-gray-800 peer-checked:[&>svg]:-translate-y-1/2 cursor-pointer relative transition-colors duration-300 overflow-hidden';
  const IconStyles = 'absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[100%] transition-transform delay-100';

  return (
    <label className={`${labelStyles} ${className}`}>
      <input {...props} type='checkbox' className={InputStyles} />
      <span className={fakeInputStyles}>
        <Icon id={IconId.Check} fill='white' width='20' className={IconStyles} />
      </span>
      {label && <span className='labelStyles'>{label}</span>}
    </label>
  );
};

export default Checkbox;
