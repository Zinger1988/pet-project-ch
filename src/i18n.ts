import i18n from "i18next";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    ns: [
      "common",
      "errors",
      "forms",
      "pageAbout",
      "pageContacts",
      "pageLogin",
      "pagePolicy",
      "pageRegistration",
      "pageInvestors",
      "pagePartnership",
      "validations",
      "pageSystemStatus",
    ],
    defaultNS: "common",
    fallbackLng: "en",
    debug: true,
    keySeparator: ".",
    interpolation: {
      escapeValue: false,
    },
    react: {
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: [
        "ul",
        "strong",
        "b",
        "span",
        "i",
        "em",
        "ol",
        "li",
        "a",
        "p",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "table",
        "tr",
        "th",
        "td",
        "br",
      ],
    },
  });

export default i18n;
