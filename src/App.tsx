import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { RootState } from "./store/index";
import { useTranslation } from "react-i18next";

import AppLayout from "./layout/AppLayout";
import {
  Search,
  Login,
  Profile,
  Home,
  About,
  Support,
  Contact,
  FAQ,
  Terms,
  Policy,
  Error,
  Registration,
} from "../src/pages";

import { AppDispatch, fetchData } from "../src/store/actions/dataActions";
import "./App.css";
import DarkThemeContextProvider from "./context/DarkThemeContext";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const data = useSelector((state: RootState) => state.yourStateSlice.data);
  const loading = useSelector((state: RootState) => state.yourStateSlice.loading);
  const error = useSelector((state: RootState) => state.yourStateSlice.error);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log(data, "data");

  return (
    <div className="App min-h-[100dvh] flex flex-col">
      {/* Define routes */}
      <DarkThemeContextProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="login" element={<Login />} />
            <Route path="registration" element={<Registration />} />
            <Route path="profile" element={<Profile />} />
            <Route path="about" element={<About />} />
            <Route path="support" element={<Support />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="terms" element={<Terms />} />
            <Route path="policy" element={<Policy />} />
            <Route path="error" element={<Error />} />
            <Route
              path="*"
              element={
                <Error
                  statusCode="404"
                  title={t("This page doesn't exists (404)", { ns: "errors" })}
                />
              }
            />
          </Route>
        </Routes>
      </DarkThemeContextProvider>
    </div>
  );
}

export default App;
