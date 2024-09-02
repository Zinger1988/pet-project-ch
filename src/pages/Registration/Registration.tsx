import { Formik, Form, Field } from "formik";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import { Button, FormControl } from "../../components";
import { IconId } from "../../types/enums";

import workingImg from "../../assets/images/working_in_airport.svg";

const Registration = () => {
  const { t } = useTranslation();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
    agreement: false,
  };

  // prettier-ignore
  const validationSchema = Yup.object({
    name: Yup.string()
      .required(t("required", { ns: "validations" }))
      .min(3, t("validations:minLength", { count: 3 })),
    email: Yup.string()
      .required(t("required", { ns: "validations" }))
      .email(t("email", { ns: "validations" })),
    password: Yup.string()
      .required(t("required", { ns: "validations" }))
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, t("password", { ns: "validations" })),
    passwordRepeat: Yup.string()
      .required(t("required", { ns: "validations" }))
      .oneOf([Yup.ref("password")], t("passwordRepeat", { ns: "validations" })),
    agreement: Yup.boolean()
      .required(t("required", { ns: "validations" }))
      .oneOf([true], t("agreement", { ns: "validations" })),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form data", values);
  };

  return (
    <section className="grid lg:grid-cols-2 items-center min-h-[calc(100dvh_-_theme(spacing.16))] lg:min-h-[calc(100dvh_-_theme(spacing.20))]">
      <div className="col-span-1 max-w-[calc(500px_+_theme(spacing.16))] mx-auto w-full p-6 sm:p-16">
        <h1 className="text-h2 mt-0">
          {t("Join the sound side!", { ns: "pageRegistration" })}
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field
              component={FormControl}
              type="text"
              name="name"
              label={t("name.label", { ns: "forms" })}
              id="name"
              className="mb-3"
            />

            <Field
              component={FormControl}
              type="email"
              name="email"
              label={t("email.label", { ns: "forms" })}
              id="email"
              className="mb-3"
            />
            <Field
              component={FormControl}
              type="password"
              name="password"
              label={t("password.label", { ns: "forms" })}
              id="password"
              className="mb-3"
            />
            <Field
              component={FormControl}
              type="password"
              name="passwordRepeat"
              label={t("passwordRepeat.label", { ns: "forms" })}
              id="passwordRepeat"
              className="mb-5"
            />
            <Field
              component={FormControl}
              type="checkbox"
              name="agreement"
              label={
                <>
                  <Trans
                    i18nKey="agreement"
                    ns="pageRegistration"
                    components={{
                      termsLink: <Link to="/terms" />,
                      policyLink: <Link to="/policy" />,
                    }}
                  />
                </>
              }
              id="agreement"
              className="mb-9"
            />
            <div className="grid grid-cols-[1fr,_auto] gap-x-4 items-center">
              <Link
                to="/login"
                className="decoration-transparent text-body-sm decoration-dotted underline-offset-4 font-bold transition-colors hover:decoration-black dark:hover:decoration-white"
              >
                {t("Already have an account?", { ns: "pageRegistration" })}
              </Link>
              <Button
                type="submit"
                className="w-full sm:w-auto"
                icon={IconId.ArrowRight}
                iconPosition="right"
              >
                {t("buttons.continue")}
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
      <div className="lg:col-span-1 lg:relative lg:bg-primary-400 lg:h-full hidden lg:block">
        <img
          className="absolute w-full h-full object-cover"
          src={workingImg}
          alt="Communication space"
        />
      </div>
    </section>
  );
};

export default Registration;
