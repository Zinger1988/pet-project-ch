import { FieldProps } from "formik";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

interface TextInputProps {
  label?: string;
  id: string;
  className?: string;
}

const TextInput: React.FC<TextInputProps & FieldProps> = ({
  field,
  form,
  className = "",
  ...props
}) => {
  const { name } = field;
  const { touched, errors } = form;
  const { label, id, ...restProps } = props;
  const hasErrors = touched[name] && errors[name];

  const inputBaseStyles = `block w-full border-2 border-black rounded-xl py-2.5 px-4 focus:border-primary-400 transition-colors outline-none mb-3`;
  const inputPlaceholderStyles =
    "placeholder:transition-opacity focus:placeholder:opacity-0";
  const inputStyles = `${inputBaseStyles} ${inputPlaceholderStyles} ${
    hasErrors ? "border-red-400" : ""
  }`;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="text-body-sm font-bold mb-1.5 block">
          {label}
        </label>
      )}
      <input {...field} {...restProps} className={inputStyles} />
      {hasErrors && <InfoTooltip type="danger" message={errors[name] as string} />}
    </div>
  );
};

export default TextInput;
