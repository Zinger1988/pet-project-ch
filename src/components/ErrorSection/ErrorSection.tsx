import image404 from "../../assets/images/searching.svg";
import image500 from "../../assets/images/interface_fatal_error.svg";
import React from "react";
import { Link } from "react-router-dom";
import { Container } from "..";

interface ErrorSectionProps {
  statusCode?: string;
  title?: string;
  message?: string;
  className?: string;
}

const ErrorSection: React.FC<ErrorSectionProps> = ({
  statusCode = "default",
  title = "Something went wrong",
  message,
  className = "",
}) => {
  let statusImage = null;

  switch (statusCode) {
    case "404":
      statusImage = image404;
      break;
    case "500":
      statusImage = image500;
      break;
    default:
      statusImage = image500;
  }

  return (
    <Container className={`flex flex-col items-center ${className}`}>
      <img className=" mb-6 block w-80" src={statusImage} alt={title} />
      <h1 className="text-h2 mb-5 text-center">{title}</h1>
      {message && <p className="mb-5 text-slate-400">{message}</p>}
    </Container>
  );
};

export default ErrorSection;
