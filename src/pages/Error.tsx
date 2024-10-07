import React from 'react';
import { ErrorSection } from '../components';

interface ErrorProps {
  statusCode?: string;
  title?: string;
  message?: string;
  className?: string;
}

const Error: React.FC<ErrorProps> = (props) => {
  return (
    <div className='mb-24 mt-12'>
      <ErrorSection {...props} />
    </div>
  );
};

export default Error;
