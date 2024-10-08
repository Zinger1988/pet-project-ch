import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

import LoginForm from '../features/authentication/LoginForm';

import { userClearError, userLookup } from '../store/actions/userActions';
import { RootState } from '../store';
import { AppDispatch } from '../store/types';
import { LoginFormValues } from '../types/global';
import coworkingImg from '../assets/images/coworking_space.svg';
import { Spinner } from '../components';

const Login = () => {
  const [formLoading, setFormLoading] = useState(false);
  const { loading, user, error } = useSelector((state: RootState) => state.userSlice);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  useEffect(() => {
    if (error) {
      toast.error(t(error, { ns: 'errors' }));
      dispatch(userClearError());
    }
  }, [error, dispatch, t]);

  if (loading && !formLoading) {
    return <Spinner className='fixed left-0 top-0 z-[10000] h-full w-full bg-black/70' size='lg' />;
  }

  if (user) {
    return <Navigate to='/rooms' replace />;
  }

  const handleSubmit = async (credentials: LoginFormValues) => {
    setFormLoading(true);
    await dispatch(userLookup({ ...credentials, mode: 'login' }));
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
        <h1 className={headingStyles}>{t('Welcome on a board!', { ns: 'pageLogin' })}</h1>
        <LoginForm loading={formLoading} onSubmit={handleSubmit} />
      </div>
      <div className={imgContainerStyles}>
        <img className={imgStyles} src={coworkingImg} alt='Communication space' />
      </div>
    </section>
  );
};

export default Login;
