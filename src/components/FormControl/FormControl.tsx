import { FieldProps } from "formik";
import { ReactNode, useEffect } from "react";
import { Checkbox, InfoTooltip, TextInput, Textarea } from "..";
import { useTranslation } from "react-i18next";

type inputTypes = "text" | "password" | "email" | "number" | "checkbox";
type controlTypes = inputTypes | "textarea";

interface FormControlProps {
  name: string;
  className?: string;
  type: controlTypes;
  id?: string;
  label?: string | ReactNode;
}

const FormControl: React.FC<FormControlProps & FieldProps> = (props) => {
  const { i18n } = useTranslation();
  const { field, form, className = "", ...restProps } = props;
  const { touched, errors } = form;
  const hasErrors = touched[field.name] && errors[field.name];

  let ControlComponent = null;

  useEffect(() => {
    if (field.name in errors) form.setFieldTouched(field.name);
  }, [i18n.language]);

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
