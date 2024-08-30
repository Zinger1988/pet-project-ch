import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import { Button, TextInput } from "../../components";
import { IconId } from "../../types/enums";

import coworkingImg from "../../assets/images/coworking_space.svg";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid e-mail").required("This field is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/,
        "Minimum 8 characters, at least 1 letter and 1 number"
      )
      .required("This field is required"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form data", values);
  };

  return (
    <section className="grid lg:grid-cols-2 items-center min-h-[calc(100dvh_-_theme(spacing.16))] lg:min-h-[calc(100dvh_-_theme(spacing.20))]">
      <div className="col-span-1 max-w-[calc(500px_+_theme(spacing.16))] mx-auto w-full p-6 sm:p-16">
        <h1 className="text-h2 mt-0">Welcome on a board!</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field
              component={TextInput}
              type="email"
              name="email"
              label="E-mail"
              id="email"
              className="mb-3"
            />
            <Field
              component={TextInput}
              type="password"
              name="password"
              label="Your password"
              id="password"
              className="mb-8 relative"
            />
            <div className="grid grid-cols-[1fr,_auto] grid-rows-2 gap-x-4 items-center">
              <Link
                to="/password-recovery"
                className="decoration-transparent text-body-sm decoration-dotted underline-offset-4 font-bold transition-colors hover:decoration-black col-span-1 col-start-1"
              >
                Forgot password?
              </Link>
              <Link
                to="/registration"
                className="decoration-transparent text-body-sm decoration-dotted underline-offset-4 font-bold transition-colors hover:decoration-black col-span-1 col-start-1"
              >
                Don't have an account yet?
              </Link>
              <Button
                type="submit"
                className="w-full sm:w-auto col-span-1 row-span-2 row-start-1 col-start-2"
                icon={IconId.ArrowRight}
                iconPosition="right"
              >
                Continue
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
