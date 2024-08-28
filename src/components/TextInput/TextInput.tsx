import { FieldHookConfig, useField } from "formik";
import { ComponentProps } from "react";

interface TextInputProps extends ComponentProps<"input"> {
  label: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props as FieldHookConfig<"input">);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
};

export default TextInput;
