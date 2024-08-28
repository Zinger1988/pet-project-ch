import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Container, Textarea, TextInput } from "../../components";
import serviceTeamImg from "../../assets/images/сustomer_service_support.svg";

const Contact = () => {
  return (
    <Container className="max-w-screen-xl">
      <section className="grid sm:grid-cols-2 sm:gap-16 items-center">
        <div className="col-span-1">
          <h1>Contacts</h1>
          <p>
            Far far away, behind the word mountains, far from the countries Vokalia and
            Consonantia, there live the blind texts. Separated they live in Bookmarksgrove
            right at the coast of the Semantics, a large language ocean.
          </p>
          <Formik
            initialValues={{
              email: "",
              message: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid e-mail")
                .required("This field is required"),
              message: Yup.string()
                .min(20, "Must be 20 characters or more")
                .required("This field is required"),
            })}
            onSubmit={(values) => {
              console.log("Form data", values);
            }}
          >
            <Form>
              <TextInput
                label="E-mail"
                type="email"
                name="email"
                placeholder="Your e-mail"
              />
              <Textarea label="Message" name="message" placeholder="Your message" />
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
        <div className="col-span-1">
          <img
            className="w-full max-w-md"
            src={serviceTeamImg}
            alt="Customer service team"
          />
        </div>
      </section>
    </Container>
  );
};

export default Contact;
