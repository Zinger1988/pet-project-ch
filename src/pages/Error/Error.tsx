import React from "react";
import { ErrorSection } from "../../components";

interface ErrorProps {
  statusCode?: string;
  title?: string;
  message?: string;
  className?: string;
}

const Error: React.FC<ErrorProps> = (props) => {
  return <ErrorSection {...props} />;
};

export default Error;
