import React from 'react';
import { Field, Formik, Form } from 'formik';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { FormControl } from '../form';
import { Button, Loader } from '../../components';

import { IconId } from '../../types/enums';
import { RegistrationFormValues } from '../../types/global';

interface RegistrationFormProps {
  loading: boolean;
  onSubmit: (values: RegistrationFormValues) => void;
  className?: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ loading, onSubmit, className = '' }) => {
  const { t } = useTranslation();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
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

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form className={className}>
        <Field
          component={FormControl}
          type='text'
          name='name'
          label={t('name.label', { ns: 'forms' })}
          id='name'
          className='mb-3'
        />

        <Field
          component={FormControl}
          type='email'
          name='email'
          label={t('email.label', { ns: 'forms' })}
          id='email'
          className='mb-3'
        />
        <Field
          component={FormControl}
          type='password'
          name='password'
          label={t('password.label', { ns: 'forms' })}
          id='password'
          className='mb-3'
        />
        <Field
          component={FormControl}
          type='password'
          name='passwordRepeat'
          label={t('passwordRepeat.label', { ns: 'forms' })}
          id='passwordRepeat'
          className='mb-5'
        />
        <Field
          component={FormControl}
          type='checkbox'
          name='agreement'
          label={
            <>
              <Trans
                i18nKey='agreement'
                ns='pageRegistration'
                components={{
                  termsLink: <Link to='/terms' />,
                  policyLink: <Link to='/policy' />,
                }}
              />
            </>
          }
          id='agreement'
          className='mb-9'
        />
        <div className='grid grid-cols-[1fr,_auto] items-center gap-x-4'>
          <Link
            to='/login'
            className='text-body-sm font-bold decoration-transparent decoration-dotted underline-offset-4 transition-colors hover:decoration-black dark:hover:decoration-white'
          >
            {t('Already have an account?', { ns: 'pageRegistration' })}
          </Link>
          <Button
            type='submit'
            className='w-full sm:w-auto'
            icon={loading ? undefined : IconId.ArrowRight}
            iconPosition='right'
            disabled={loading}
          >
            {loading ? <Loader /> : t('buttons.continue')}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
