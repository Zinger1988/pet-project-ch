import i18n from "i18next";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    ns: [
      "common",
      "validations",
      "forms",
      "pageRegistration",
      "pageLogin",
      "pageContacts",
      "errors",
      "pagePolicy",
    ],
    defaultNS: "common",
    fallbackLng: "en",
    debug: true,
    keySeparator: ".",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
