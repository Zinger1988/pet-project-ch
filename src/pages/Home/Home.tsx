import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../store";

const Home = () => {
  const { loading, user, error } = useSelector((state: RootState) => state.authSlice);

  if (loading) {
    return <>Loading...</>;
  }

  if (user) {
    return <Navigate to="/rooms" replace />;
  }
  return <h1>Home</h1>;
};

export default Home;
