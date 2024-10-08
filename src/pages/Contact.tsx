import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { Button, Container } from '../components';

import { IconId } from '../types/enums';
import serviceTeamImg from '../assets/images/сustomer_service_support.svg';
import { FormControl } from '../features/form';

const Contact = () => {
  const { t } = useTranslation();

  const initialValues = {
    email: '',
    name: '',
    message: '',
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
    console.log('Form data', values);
  };

  return (
    <Container className='mb-24 max-w-screen-md'>
      <section className='mt-12'>
        <h1 className='mt-0 text-center'>{t('Our contacts', { ns: 'pageContacts' })}</h1>
        <div className='mb-8'>
          <img className='mx-auto w-9/12 max-w-[360px]' src={serviceTeamImg} alt='Customer service team' />
        </div>
        <div className='mb-8 flex justify-center gap-6 self-center'>
          <Button
            variant='secondary'
            as='link'
            className='w-full sm:w-[12rem]'
            to='tel:+1987654321'
            icon={IconId.CallSolid}
          >
            {t('Call us', { ns: 'pageContacts' })}
          </Button>
          <Button
            variant='secondary'
            as='link'
            className='w-full sm:w-[12rem]'
            to='mailto:support@talktube.com'
            icon={IconId.MessageSolid}
          >
            {t('Write us', { ns: 'pageContacts' })}
          </Button>
        </div>
        <p className='relative my-4 text-center before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:border-b-[1px] before:border-gray-600'>
          <span className='relative z-10 bg-white px-4 font-bold dark:bg-black'>{t('or', { ns: 'pageContacts' })}</span>
        </p>
        <h2 className='mt-0 text-center'>{t('Leave a message', { ns: 'pageContacts' })}</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <Field
              component={FormControl}
              type='text'
              name='name'
              label={t('name.label', { ns: 'forms' })}
              placeholder={t('How we can call you?', { ns: 'pageContacts' })}
              id='name'
              className='mb-3'
            />
            <Field
              component={FormControl}
              type='email'
              name='email'
              label={t('email.label', { ns: 'forms' })}
              placeholder={t('We will send the response to it', { ns: 'pageContacts' })}
              id='email'
              className='mb-3'
            />
            <Field
              component={FormControl}
              type='textarea'
              name='message'
              label={t('message.label', { ns: 'forms' })}
              placeholder={t('What exactly do you want to tell us?', {
                ns: 'pageContacts',
              })}
              id='message'
              className='mb-6'
            />
            <div className='flex justify-center'>
              <Button type='submit' className='w-full sm:w-auto'>
                {t('buttons.submit')}
              </Button>
            </div>
          </Form>
        </Formik>
      </section>
    </Container>
  );
};

export default Contact;
