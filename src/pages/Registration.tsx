import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

import { userClearError, userLookup } from '../store/actions/userActions';
import { RootState } from '../store';
import { AppDispatch } from '../store/types';
import { RegistrationFormValues } from '../types/global';
import workingImg from '../assets/images/working_in_airport.svg';
import { RegistrationForm } from '../features/authentication';

const Registration = () => {
  const [formLoading, setFormLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, user, error } = useSelector((state: RootState) => state.userSlice);
  const { t } = useTranslation();

  useEffect(() => {
    if (error) {
      toast.error(t(error, { ns: 'errors' }));
      dispatch(userClearError());
    }
  }, [error, dispatch, t]);

  if (loading && !formLoading) {
    return <>Loading...</>;
  }

  if (user) {
    return <Navigate to='/rooms' replace />;
  }

  const handleSubmit = async (credentials: RegistrationFormValues) => {
    setFormLoading(true);
    await dispatch(userLookup({ ...credentials, mode: 'register' }));
    setFormLoading(false);
  };

  const wrapperStyles =
    'grid lg:grid-cols-2 items-center min-h-[calc(100dvh_-_theme(spacing.16))] lg:min-h-[calc(100dvh_-_theme(spacing.20))]';
  const formContainerStyles = 'col-span-1 max-w-[calc(500px_+_theme(spacing.16))] mx-auto w-full p-6 sm:p-16';
  const imgContainerStyles = 'lg:col-span-1 lg:relative lg:bg-primary-400 lg:h-full hidden lg:block';
  const headingStyles = 'text-h2 mt-0';
  const imgStyles = 'absolute w-full h-full object-cover';

  return (
    <section className={wrapperStyles}>
      <div className={formContainerStyles}>
        <h1 className={headingStyles}>{t('Join the sound side!', { ns: 'pageRegistration' })}</h1>
        <RegistrationForm onSubmit={handleSubmit} loading={formLoading} />
      </div>
      <div className={imgContainerStyles}>
        <img className={imgStyles} src={workingImg} alt='Communication space' />
      </div>
    </section>
  );
};

export default Registration;
