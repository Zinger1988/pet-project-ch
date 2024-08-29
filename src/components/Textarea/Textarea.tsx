import { FieldProps } from "formik";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

interface TextareaProps {
  label?: string;
  id: string;
  className?: string;
}

const Textarea: React.FC<TextareaProps & FieldProps> = ({
  field,
  form,
  className = "",
  ...props
}) => {
  const { name } = field;
  const { touched, errors } = form;
  const { label, id, ...restProps } = props;
  const hasErrors = touched[name] && errors[name];

  const textareaBaseStyles = `block w-full border-2 border-black rounded-xl py-2.5 px-4 focus:border-primary-400 transition-colors outline-none min-h-[8rem] mb-3`;
  const textareaPlaceholderStyles =
    "placeholder:transition-opacity focus:placeholder:opacity-0";
  const textareaStyles = `${textareaBaseStyles} ${textareaPlaceholderStyles} ${
    hasErrors ? "border-red-400" : ""
  }`;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="text-body-sm font-bold mb-1.5 block">
          {label}
        </label>
      )}
      <textarea className={textareaStyles} {...field} {...restProps} id={id}></textarea>
      {hasErrors && <InfoTooltip type="danger" message={errors[name] as string} />}
    </div>
  );
};

export default Textarea;
