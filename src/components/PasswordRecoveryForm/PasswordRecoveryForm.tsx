import React from "react";
import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import FormControl from "../FormControl/FormControl";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";

import { IconId } from "../../types/enums";

interface PasswordRecoveryFormProps {
  loading: boolean;
  onSubmit: ({ email }: { email: string }) => void;
  className?: string;
}

const PasswordRecoveryForm: React.FC<PasswordRecoveryFormProps> = ({
  loading,
  onSubmit,
  className = "",
}) => {
  const { t } = useTranslation();
  const initialValues = {
    email: "",
  };

  // prettier-ignore
  const validationSchema = Yup.object({
    email: Yup.string()
      .required(t("required", { ns: "validations" }))
      .email(t("email", { ns: "validations" })),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className={className}>
        <Field
          className="mb-9"
          component={FormControl}
          id="email"
          label={t("email.label", { ns: "forms" })}
          name="email"
          type="email"
        />
        <div className="grid grid-cols-[1fr,_auto] gap-x-4 items-center">
          <Link
            to="/login"
            className="decoration-transparent text-body-sm decoration-dotted underline-offset-4 font-bold transition-colors hover:decoration-black dark:hover:decoration-white"
          >
            {t("Back to login page", { ns: "pagePasswordRecovery" })}
          </Link>
          <Button
            type="submit"
            className="w-full sm:w-auto"
            icon={loading ? undefined : IconId.ArrowRight}
            iconPosition="right"
            disabled={loading}
          >
            {loading ? <Loader /> : t("buttons.continue")}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default PasswordRecoveryForm;
