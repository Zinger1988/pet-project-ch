import image404 from '../assets/images/searching.svg';
import image500 from '../assets/images/interface_fatal_error.svg';

import { Container } from '.';

interface ErrorSectionProps {
  statusCode?: string;
  title?: string;
  message?: string;
  className?: string;
}

const ErrorSection: React.FC<ErrorSectionProps> = ({
  statusCode = 'default',
  title = 'Something went wrong',
  message,
  className = '',
}) => {
  let statusImage = null;

  switch (statusCode) {
    case '404':
      statusImage = image404;
      break;
    case '500':
      statusImage = image500;
      break;
    default:
      statusImage = image500;
  }

  const containerStyles = `flex flex-col items-center ${className}`;
  const imageStyles = 'mb-6 block w-80';
  const headingStyles = 'text-h2 mb-5 text-center';
  const messageStyles = 'mb-5 text-slate-400';

  return (
    <Container className={containerStyles}>
      <img className={imageStyles} src={statusImage} alt={title} />
      <h1 className={headingStyles}>{title}</h1>
      {message && <p className={messageStyles}>{message}</p>}
    </Container>
  );
};

export default ErrorSection;
