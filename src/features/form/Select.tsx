import { FormikHandlers, FormikProps } from 'formik';
import { ReactNode } from 'react';
import SelectBase from './SelectBase';

interface OptionType {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  label?: string | ReactNode;
  className?: string;
  options?: OptionType[];
  value: string;
  name: string;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
  form: FormikProps<any>;
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  className = '',
  options = [],
  value,
  name,
  onChange,
  onBlur,
  form,
  ...props
}) => (
  <SelectBase
    id={id}
    label={label}
    className={className}
    options={options}
    onChange={(newValue: any) => form.setFieldValue(name, newValue.value)}
    onBlur={onBlur}
    value={value}
    {...props}
  />
);

export default Select;
