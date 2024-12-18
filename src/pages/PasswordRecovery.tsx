import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import toast from 'react-hot-toast';

import { Spinner } from '../components';
import { PasswordRecoveryForm } from '../features/authentication';

import { RootState } from '../store';
import { apiResetPassword } from '../services/apiUser';

import coworkingImg from '../assets/images/coworking_space.svg';

const PasswordRecovery = () => {
  const [formLoading, setFormLoading] = useState(false);
  const { initialized, user, loading } = useSelector((state: RootState) => state.userSlice);
  const { t } = useTranslation();

  const wrapperStyles = `grid lg:grid-cols-2 items-center min-h-[calc(100dvh_-_theme(spacing.16))] lg:min-h-[calc(100dvh_-_theme(spacing.20))]`;
  const formContainerStyles = 'col-span-1 max-w-[calc(500px_+_theme(spacing.16))] mx-auto w-full p-6 sm:p-16';
  const imgContainerStyles = 'lg:col-span-1 lg:relative lg:bg-primary-400 lg:h-full hidden lg:block';
  const headingStyles = 'text-h2 mt-0';
  const descriptionStyles = 'text-gray-500 text-body-sm';
  const imgStyles = 'absolute w-full h-full object-cover';
  const spinnerStyles = 'fixed left-0 top-0 z-[10000] h-full w-full bg-black/70';

  if (!initialized) {
    return null;
  }

  if (loading && !formLoading) {
    return <Spinner className={spinnerStyles} size='lg' />;
  }

  if (user) {
    return <Navigate to='/rooms' replace />;
  }

  const handleSubmit = async (values: { email: string }) => {
    try {
      setFormLoading(true);
      await apiResetPassword(values.email);
      toast.success('A link to the password recovery page has been sent to the specified email');
    } catch (error) {
      let errorMessage = 'An error occured during password reset';
      if (error instanceof FirebaseError) {
        errorMessage = error.code;
      }
      toast.error(t(errorMessage, { ns: 'errors' }));
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <section className={wrapperStyles}>
      <div className={formContainerStyles}>
        <h1 className={headingStyles}>{t('Forgot password?', { ns: 'pagePasswordRecovery' })}</h1>
        <p className={descriptionStyles}>{t('description', { ns: 'pagePasswordRecovery' })}</p>
        <PasswordRecoveryForm loading={formLoading} onSubmit={handleSubmit} />
      </div>
      <div className={imgContainerStyles}>
        <img className={imgStyles} src={coworkingImg} alt='Communication space' />
      </div>
    </section>
  );
};

export default PasswordRecovery;
