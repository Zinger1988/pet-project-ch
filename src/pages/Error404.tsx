import React from 'react';
import Error from './Error';
import { useTranslation } from 'react-i18next';

interface ErrorProps {
  statusCode?: string;
  title?: string;
  message?: string;
  className?: string;
}

const Error404: React.FC<ErrorProps> = (props) => {
  const { t } = useTranslation();

  return <Error statusCode='404' title={t("This page doesn't exists (404)", { ns: 'errors' })} />;
};

export default Error404;
