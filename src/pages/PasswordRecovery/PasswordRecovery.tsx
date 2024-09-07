import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useTranslation } from "react-i18next";

import { Button, FormControl } from "../../components";
import { IconId } from "../../types/enums";

import coworkingImg from "../../assets/images/coworking_space.svg";

const PasswordRecovery = () => {
  const { t } = useTranslation();

  const initialValues = {
    email: "",
    password: "",
  };

  // prettier-ignore
  const validationSchema = Yup.object({
    email: Yup.string()
      .required(t("required", { ns: "validations" }))
      .email(t("email", { ns: "validations" })),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form data", values);
  };

  return (
    <section className="grid lg:grid-cols-2 items-center min-h-[calc(100dvh_-_theme(spacing.16))] lg:min-h-[calc(100dvh_-_theme(spacing.20))]">
      <div className="col-span-1 max-w-[calc(500px_+_theme(spacing.16))] mx-auto w-full p-6 sm:p-16">
        <h1 className="text-h2 mt-0">
          {t("Forgot password?", { ns: "pagePasswordRecovery" })}
        </h1>
        <p className="text-gray-500 text-body-sm">
          {t("description", { ns: "pagePasswordRecovery" })}
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field
              className="mb-9"
              component={FormControl}
              id="email"
              label={t("email.label", { ns: "forms" })}
              name="email"
              type="email"
            />
            <Button
              className="w-full sm:w-auto col-span-1 row-span-2 row-start-1 col-start-2"
              icon={IconId.ArrowRight}
              iconPosition="right"
              type="submit"
            >
              {t("buttons.continue")}
            </Button>
          </Form>
        </Formik>
      </div>
      <div className="lg:col-span-1 lg:relative lg:bg-primary-400 lg:h-full hidden lg:block">
        <img
          className="absolute w-full h-full object-cover"
          src={coworkingImg}
          alt="Communication space"
        />
      </div>
    </section>
  );
};

export default PasswordRecovery;
