import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import { Button, Container, FormControl } from "../../components";

import { IconId } from "../../types/enums";
import serviceTeamImg from "../../assets/images/сustomer_service_support.svg";

const Contact = () => {
  const { t } = useTranslation();

  const initialValues = {
    email: "",
    name: "",
    message: "",
  };

  // prettier-ignore
  const validationSchema = Yup.object({
    email: Yup.string()
      .required(t("required", { ns: "validations" }))
      .email(t("email", { ns: "validations" })),
    name: Yup.string()
      .required(t("required", { ns: "validations" }))
      .min(3, t("validations:minLength", { count: 3 })),
    message: Yup.string()
      .required(t("required", { ns: "validations" }))
      .min(20, t("validations:minLength", { count: 20 })),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form data", values);
  };

  return (
    <Container className="max-w-screen-md mb-24">
      <section className="mt-12">
        <h1 className="text-center mt-0">{t("Our contacts", { ns: "pageContacts" })}</h1>
        <div className="mb-8">
          <img
            className="w-9/12 max-w-[360px] mx-auto"
            src={serviceTeamImg}
            alt="Customer service team"
          />
        </div>
        <div className="flex justify-center gap-6 mb-8 self-center">
          <Button
            variant="secondary"
            as="link"
            className="w-full sm:w-[12rem]"
            to="tel:+1987654321"
            icon={IconId.CallSolid}
          >
            {t("Call us", { ns: "pageContacts" })}
          </Button>
          <Button
            variant="secondary"
            as="link"
            className="w-full sm:w-[12rem]"
            to="mailto:support@talktube.com"
            icon={IconId.MessageSolid}
          >
            {t("Write us", { ns: "pageContacts" })}
          </Button>
        </div>
        <p className="text-center my-4 relative before:absolute before:w-full before:h-px before:left-0 before:top-1/2 before:border-b-[1px] before:border-gray-600">
          <span className="bg-white dark:bg-black font-bold relative z-10 px-4">
            {t("or", { ns: "pageContacts" })}
          </span>
        </p>
        <h2 className="text-center mt-0">
          {t("Leave a message", { ns: "pageContacts" })}
        </h2>
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
              placeholder={t("How we can call you?", { ns: "pageContacts" })}
              id="name"
              className="mb-3"
            />
            <Field
              component={FormControl}
              type="email"
              name="email"
              label={t("email.label", { ns: "forms" })}
              placeholder={t("We will send the response to it", { ns: "pageContacts" })}
              id="email"
              className="mb-3"
            />
            <Field
              component={FormControl}
              type="textarea"
              name="message"
              label={t("message.label", { ns: "forms" })}
              placeholder={t("What exactly do you want to tell us?", {
                ns: "pageContacts",
              })}
              id="message"
              className="mb-6"
            />
            <div className="flex justify-center">
              <Button type="submit" className="w-full sm:w-auto">
                {t("buttons.submit")}
              </Button>
            </div>
          </Form>
        </Formik>
      </section>
    </Container>
  );
};

export default Contact;
