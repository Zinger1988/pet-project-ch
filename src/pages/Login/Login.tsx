import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import LoginForm from "../../components/LoginForm/LoginForm";

import { authUserAction, clearUserError } from "../../store/actions/userActions";
import { RootState } from "../../store";
import { LoginFormValues } from "../../types/global";
import { AppDispatch } from "../../store/types";
import coworkingImg from "../../assets/images/coworking_space.svg";

const Login = () => {
  const navigate = useNavigate();
  const { loading, user, error } = useSelector((state: RootState) => state.authSlice);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  useEffect(() => {
    error && toast.error(t(error, { ns: "errors" }));
    dispatch(clearUserError());
  }, [error, dispatch, t]);

  useEffect(() => {
    if (user) {
      navigate("/profile", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = (credentials: LoginFormValues) => {
    dispatch(authUserAction({ ...credentials, mode: "login" }));
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
        <h1 className={headingStyles}>{t("Welcome on a board!", { ns: "pageLogin" })}</h1>
        <LoginForm loading={loading} onSubmit={handleSubmit} />
      </div>
      <div className={imgContainerStyles}>
        <img className={imgStyles} src={coworkingImg} alt="Communication space" />
      </div>
    </section>
  );
};

export default Login;
