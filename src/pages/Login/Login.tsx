import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Button, FormControl } from "../../components";
import { IconId } from "../../types/enums";

import coworkingImg from "../../assets/images/coworking_space.svg";

const Login = () => {
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
    password: Yup.string()
      .required(t("required", { ns: "validations" }))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, t("password", { ns: "validations" })),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form data", values);
  };

  return (
    <section className="grid lg:grid-cols-2 items-center min-h-[calc(100dvh_-_theme(spacing.16))] lg:min-h-[calc(100dvh_-_theme(spacing.20))]">
      <div className="col-span-1 max-w-[calc(500px_+_theme(spacing.16))] mx-auto w-full p-6 sm:p-16">
        <h1 className="text-h2 mt-0">{t("Welcome on a board!", { ns: "pageLogin" })}</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field
              className="mb-3"
              component={FormControl}
              id="email"
              label={t("email.label", { ns: "forms" })}
              name="email"
              type="email"
            />
            <Field
              className="mb-9 relative"
              component={FormControl}
              id="password"
              label={t("password.label", { ns: "forms" })}
              name="password"
              type="password"
            />
            <div className="grid grid-cols-[1fr,_auto] grid-rows-2 gap-x-4 items-center">
              <Link
                className="decoration-transparent text-body-sm decoration-dotted underline-offset-4 font-bold transition-colors hover:decoration-black dark:hover:decoration-white col-span-1 col-start-1"
                to="/password-recovery"
              >
                {t("Forgot password", { ns: "pageLogin" })}
              </Link>
              <Link
                className="decoration-transparent text-body-sm decoration-dotted underline-offset-4 font-bold transition-colors hover:decoration-black dark:hover:decoration-white col-span-1 col-start-1"
                to="/registration"
              >
                {t("Don't have an account yet?", { ns: "pageLogin" })}
              </Link>
              <Button
                className="w-full sm:w-auto col-span-1 row-span-2 row-start-1 col-start-2"
                icon={IconId.ArrowRight}
                iconPosition="right"
                type="submit"
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
          src={coworkingImg}
          alt="Communication space"
        />
      </div>
    </section>
  );
};

export default Login;
