import { FieldProps } from "formik";
import { ReactNode } from "react";
import { Checkbox, InfoTooltip, TextInput, Textarea } from "..";

type inputTypes = "text" | "password" | "email" | "number" | "checkbox";
type controlTypes = inputTypes | "textarea";

interface FormControlProps {
  className?: string;
  type: controlTypes;
  id?: string;
  label?: string | ReactNode;
}

const FormControl: React.FC<FormControlProps & FieldProps> = (props) => {
  const { field, form, className = "", ...restProps } = props;
  const { touched, errors } = form;
  const hasErrors = touched[field.name] && errors[field.name];

  let ControlComponent = null;

  switch (props.type) {
    case "text":
    case "password":
    case "email":
    case "number": {
      ControlComponent = TextInput;
      break;
    }
    case "checkbox": {
      ControlComponent = Checkbox;
      break;
    }
    case "textarea": {
      ControlComponent = Textarea;
      break;
    }
    default: {
      ControlComponent = TextInput;
    }
  }

  return (
    <div className={className}>
      <ControlComponent {...field} {...restProps} className="mb-3" />
      {hasErrors && <InfoTooltip type="danger" message={errors[field.name] as string} />}
    </div>
  );
};

export default FormControl;
