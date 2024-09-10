import { Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Toaster } from "react-hot-toast";

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
  InvestorRaltions,
  Partnership,
  PasswordRecovery,
} from "../src/pages";
import { AuthStatus, CookieBanner, ProtectedRoute } from "./components";
import DarkThemeContextProvider from "./context/DarkThemeContext";
import "./App.css";

function App() {
  const { t } = useTranslation();

  return (
    <div className="App min-h-[100dvh] flex flex-col">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          success: {
            className: "bg-green-600 text-white",
          },
          error: {
            className: "bg-red-600 text-white",
          },
          duration: 6000,
        }}
      />
      <AuthStatus />
      <DarkThemeContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="login" element={<Login />} />
            <Route path="registration" element={<Registration />} />
            <Route path="about" element={<About />} />
            <Route path="support" element={<Support />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="terms" element={<Terms />} />
            <Route path="policy" element={<Policy />} />
            <Route path="error" element={<Error />} />
            <Route path="investor-relations" element={<InvestorRaltions />} />
            <Route path="partnership" element={<Partnership />} />
            <Route path="password-recovery" element={<PasswordRecovery />} />
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
      <CookieBanner />
    </div>
  );
}

export default App;
