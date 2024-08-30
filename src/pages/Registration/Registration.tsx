import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import { Button, FormControl, TextInput } from "../../components";
import { IconId } from "../../types/enums";

import workingImg from "../../assets/images/working_in_airport.svg";

const Registration = () => {
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
      .min(3, "Must be 3 characters or more")
      .required("This field is required"),
    email: Yup.string().email("Invalid e-mail").required("This field is required"),
    password: Yup.string().matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Minimum 8 characters, at least 1 letter and 1 number"
    ),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords should match")
      .required("This field is required"),
    agreement: Yup.boolean()
      .oneOf([true], "Your consent is required")
      .required("This field is required"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form data", values);
  };

  return (
    <section className="grid lg:grid-cols-2 items-center min-h-[calc(100dvh_-_theme(spacing.16))] lg:min-h-[calc(100dvh_-_theme(spacing.20))]">
      <div className="col-span-1 max-w-[calc(500px_+_theme(spacing.16))] mx-auto w-full p-6 sm:p-16">
        <h1 className="text-h2 mt-0">Join the sound side!</h1>
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
              label="Your name"
              id="name"
              className="mb-3"
            />

            <Field
              component={FormControl}
              type="email"
              name="email"
              label="E-mail"
              id="email"
              className="mb-3"
            />
            <Field
              component={FormControl}
              type="password"
              name="password"
              label="Your password"
              id="password"
              className="mb-3"
            />
            <Field
              component={FormControl}
              type="password"
              name="passwordRepeat"
              label="Repeat your password"
              id="password"
              className="mb-5"
            />
            <Field
              component={FormControl}
              type="checkbox"
              name="agreement"
              label={
                <>
                  I am agree with <Link to="/terms">terms of service</Link> and{" "}
                  <Link to="/policy">privacy policy</Link>
                </>
              }
              id="agreement"
              className="mb-9"
            />
            <div className="grid grid-cols-[1fr,_auto] gap-x-4 items-center">
              <Link
                to="/login"
                className="decoration-transparent text-body-sm decoration-dotted underline-offset-4 font-bold transition-colors hover:decoration-black"
              >
                Already have an account?
              </Link>
              <Button
                type="submit"
                className="w-full sm:w-auto"
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
          src={workingImg}
          alt="Communication space"
        />
      </div>
    </section>
  );
};

export default Registration;
