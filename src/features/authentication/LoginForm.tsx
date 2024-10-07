import { Field, Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import colors from 'tailwindcss/colors';

import { FormControl } from '../form';
import Button from '../../components/Button';

import { IconId } from '../../types/enums';
import { LoginFormValues } from '../../types/global';
import { Spinner } from '../../components';

interface LoginFormProps {
  loading: boolean;
  onSubmit: (values: LoginFormValues) => void;
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ loading, onSubmit, className = '' }) => {
  const { t } = useTranslation();

  const initialValues = {
    email: '',
    password: '',
  };

  // prettier-ignore
  const validationSchema = Yup.object({
    email: Yup.string()
      .required(t("required", { ns: "validations" }))
      .email(t("email", { ns: "validations" })),
    password: Yup.string()
      .required(t("required", { ns: "validations" }))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        t("password", { ns: "validations" })
      ),
  });

  const formControlsStyles = 'grid grid-cols-[1fr,_auto] grid-rows-2 gap-x-4 items-center';
  const LinkStyles =
    'decoration-transparent text-body-sm decoration-dotted underline-offset-4 font-bold transition-colors hover:decoration-black dark:hover:decoration-white col-span-1 col-start-1';

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form className={className}>
        <Field
          className='mb-3'
          component={FormControl}
          id='email'
          label={t('email.label', { ns: 'forms' })}
          name='email'
          type='email'
        />
        <Field
          className='relative mb-9'
          component={FormControl}
          id='password'
          label={t('password.label', { ns: 'forms' })}
          name='password'
          type='password'
        />
        <div className={formControlsStyles}>
          <Link className={LinkStyles} to='/password-recovery'>
            {t('Forgot password', { ns: 'pageLogin' })}
          </Link>
          <Link className={LinkStyles} to='/registration'>
            {t("Don't have an account yet?", { ns: 'pageLogin' })}
          </Link>
          <Button
            className='relative col-span-1 col-start-2 row-span-2 row-start-1 w-full sm:w-auto'
            icon={loading ? undefined : IconId.ArrowRight}
            iconPosition='right'
            type='submit'
            disabled={loading}
          >
            {loading ? <Spinner fill={colors.gray[100]} /> : t('buttons.continue')}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default LoginForm;
