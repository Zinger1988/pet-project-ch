import { Link } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import colors from 'tailwindcss/colors';

import { FormControl } from '../form';
import { Button, Spinner } from '../../components';

import { IconId } from '../../types/enums';

interface PasswordRecoveryFormProps {
  loading: boolean;
  onSubmit: ({ email }: { email: string }) => void;
  className?: string;
}

const PasswordRecoveryForm: React.FC<PasswordRecoveryFormProps> = ({ loading, onSubmit, className = '' }) => {
  const { t } = useTranslation();
  const initialValues = {
    email: '',
  };

  // prettier-ignore
  const validationSchema = Yup.object({
    email: Yup
      .string()
      .required(t("required", { ns: "validations" }))
      .email(t("email", { ns: "validations" })),
  });

  const LinkStyles = `text-body-sm font-bold decoration-transparent decoration-dotted underline-offset-4 transition-colors hover:decoration-black dark:hover:decoration-white`;
  const formFooterStyles = 'grid grid-cols-[1fr,_auto] items-center gap-x-4';
  const submitBtnStyles = 'w-full sm:w-auto';

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form className={className}>
        <Field
          className='mb-9'
          component={FormControl}
          id='email'
          label={t('email.label', { ns: 'forms' })}
          name='email'
          type='email'
        />
        <div className={formFooterStyles}>
          <Link to='/login' className={LinkStyles}>
            {t('Back to login page', { ns: 'pagePasswordRecovery' })}
          </Link>
          <Button
            type='submit'
            className={submitBtnStyles}
            icon={loading ? undefined : IconId.ArrowRight}
            iconPosition='right'
            disabled={loading}
          >
            {loading ? <Spinner fill={colors.gray[100]} /> : t('buttons.continue')}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default PasswordRecoveryForm;
