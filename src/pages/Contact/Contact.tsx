import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Container, Icon, Textarea, TextInput } from "../../components";
import serviceTeamImg from "../../assets/images/сustomer_service_support.svg";
import { IconId } from "../../types/enums";

const Contact = () => {
  const initialValues = {
    email: "",
    name: "",
    message: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid e-mail").required("This field is required"),
    name: Yup.string()
      .min(3, "Must be 3 characters or more")
      .required("This field is required"),
    message: Yup.string()
      .min(20, "Must be 20 characters or more")
      .required("This field is required"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form data", values);
  };

  return (
    <Container className="max-w-screen-md">
      <section className="mt-12">
        <h1 className="text-center mt-0">Our contacts</h1>
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
            Call us
          </Button>
          <Button
            variant="secondary"
            as="link"
            className="w-full sm:w-[12rem]"
            to="mailto:support@talktube.com"
            icon={IconId.MessageSolid}
          >
            Write us
          </Button>
        </div>
        <p className="text-center my-4 relative before:absolute before:w-full before:h-px before:left-0 before:top-1/2 before:border-b-[1px] before:border-gray-600">
          <span className="bg-white font-bold relative z-10 px-4">or</span>
        </p>
        <h2 className="text-center mt-0">Leave a message</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field
              component={TextInput}
              type="text"
              name="name"
              label="Your name"
              placeholder="How we can call you?"
              id="name"
              className="mb-3"
            />
            <Field
              component={TextInput}
              type="email"
              name="email"
              label="E-mail"
              placeholder="We will send the response to it"
              id="email"
              className="mb-3"
            />
            <Field
              component={Textarea}
              name="message"
              label="Message"
              placeholder="What exactly do you want to tell us?"
              id="message"
              className="mb-6"
            />
            <div className="flex justify-center">
              <Button type="submit" className="w-full sm:w-auto">
                Submit
              </Button>
            </div>
          </Form>
        </Formik>
      </section>
    </Container>
  );
};

export default Contact;
