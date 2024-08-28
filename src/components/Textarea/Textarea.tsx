import { FieldHookConfig, useField } from "formik";
import { ComponentProps } from "react";

interface TextareaProps extends ComponentProps<"textarea"> {
  label: string;
}

const TextInput: React.FC<TextareaProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props as FieldHookConfig<"textarea">);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className="text-input" {...field} {...props}></textarea>
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
};

export default TextInput;
