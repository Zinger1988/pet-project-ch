import React from "react";
import { ErrorSection } from "../../components";

interface ErrorProps {
  statusCode?: string;
  title?: string;
  message?: string;
  className?: string;
}

const Error: React.FC<ErrorProps> = (props) => {
  return (
    <div className="mt-12 mb-24">
      <ErrorSection {...props} />
    </div>
  );
};

export default Error;
