import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { RegistrationForm } from "../../components";

import { authUserAction, clearUserError } from "../../store/actions/userActions";
import { RootState } from "../../store";
import { RegistrationFormValues } from "../../types/global";
import { AppDispatch } from "../../store/types";
import workingImg from "../../assets/images/working_in_airport.svg";

const Registration = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, user, error } = useSelector((state: RootState) => state.authSlice);
  const { t } = useTranslation();

  useEffect(() => {
    error && toast.error(t(error, { ns: "errors" }));
    dispatch(clearUserError());
  }, [error, dispatch, t]);

  if (user) {
    return <Navigate to="/profile" />;
  }

  const handleSubmit = (credentails: RegistrationFormValues) => {
    const { email, password } = credentails;
    dispatch(authUserAction({ email, password, mode: "register" }));
  };

  const wrapperStyles =
    "grid lg:grid-cols-2 items-center min-h-[calc(100dvh_-_theme(spacing.16))] lg:min-h-[calc(100dvh_-_theme(spacing.20))]";
  const formContainerStyles =
    "col-span-1 max-w-[calc(500px_+_theme(spacing.16))] mx-auto w-full p-6 sm:p-16";
  const imgContainerStyles =
    "lg:col-span-1 lg:relative lg:bg-primary-400 lg:h-full hidden lg:block";
  const headingStyles = "text-h2 mt-0";
  const imgStyles = "absolute w-full h-full object-cover";

  return (
    <section className={wrapperStyles}>
      <div className={formContainerStyles}>
        <h1 className={headingStyles}>
          {t("Join the sound side!", { ns: "pageRegistration" })}
        </h1>
        <RegistrationForm onSubmit={handleSubmit} loading={loading} />
      </div>
      <div className={imgContainerStyles}>
        <img className={imgStyles} src={workingImg} alt="Communication space" />
      </div>
    </section>
  );
};

export default Registration;
